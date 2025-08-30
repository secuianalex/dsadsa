"use client"

import { useState, useEffect } from "react"
import { 
  StudyGroup, 
  SAMPLE_STUDY_GROUPS, 
  getGroupRecommendations, 
  canJoinGroup, 
  calculateGroupActivity,
  createStudyGroup 
} from "@/lib/collaboration"

interface StudyGroupBrowserProps {
  userLanguage: string
  userLevel: 'beginner' | 'intermediate' | 'advanced'
  userInterests: string[]
  onJoinGroup?: (groupId: string) => void
  onCreateGroup?: (group: StudyGroup) => void
}

export default function StudyGroupBrowser({
  userLanguage,
  userLevel,
  userInterests,
  onJoinGroup,
  onCreateGroup
}: StudyGroupBrowserProps) {
  const [groups, setGroups] = useState<StudyGroup[]>(SAMPLE_STUDY_GROUPS)
  const [filteredGroups, setFilteredGroups] = useState<StudyGroup[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [sortBy, setSortBy] = useState<'activity' | 'members' | 'newest'>('activity')

  // Form state for creating new group
  const [newGroupForm, setNewGroupForm] = useState({
    name: '',
    description: '',
    language: userLanguage,
    level: userLevel,
    maxMembers: 30,
    isPublic: true,
    tags: [] as string[]
  })

  useEffect(() => {
    // Get recommendations and combine with all groups
    const recommendations = getGroupRecommendations(userLanguage, userLevel, userInterests)
    const allGroups = [...groups, ...recommendations.filter(r => !groups.find(g => g.id === r.id))]
    
    let filtered = allGroups

    // Apply language filter
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(group => group.language === selectedLanguage)
    }

    // Apply level filter
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(group => group.level === selectedLevel)
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(group => 
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'activity':
          const aActivity = calculateGroupActivity(a)
          const bActivity = calculateGroupActivity(b)
          return (bActivity.totalPosts + bActivity.totalProjects) - (aActivity.totalPosts + aActivity.totalProjects)
        case 'members':
          return b.currentMembers - a.currentMembers
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

    setFilteredGroups(filtered)
  }, [groups, selectedLanguage, selectedLevel, searchTerm, sortBy, userLanguage, userLevel, userInterests])

  const handleJoinGroup = (groupId: string) => {
    const group = groups.find(g => g.id === groupId)
    if (group) {
      const joinResult = canJoinGroup(group, 'current_user')
      if (joinResult.canJoin) {
        // Update group membership
        setGroups(prev => prev.map(g => 
          g.id === groupId 
            ? { ...g, currentMembers: g.currentMembers + 1 }
            : g
        ))
        onJoinGroup?.(groupId)
      } else {
        alert(joinResult.reason)
      }
    }
  }

  const handleCreateGroup = () => {
    if (!newGroupForm.name || !newGroupForm.description) {
      alert('Please fill in all required fields')
      return
    }

    const newGroup = createStudyGroup(
      newGroupForm.name,
      newGroupForm.description,
      newGroupForm.language,
      newGroupForm.level as 'beginner' | 'intermediate' | 'advanced',
      'current_user',
      newGroupForm.maxMembers,
      newGroupForm.isPublic,
      newGroupForm.tags
    )

    setGroups(prev => [...prev, newGroup])
    onCreateGroup?.(newGroup)
    setShowCreateForm(false)
    setNewGroupForm({
      name: '',
      description: '',
      language: userLanguage,
      level: userLevel,
      maxMembers: 30,
      isPublic: true,
      tags: []
    })
  }

  const getLanguageIcon = (language: string) => {
    switch (language) {
      case 'javascript': return '⚡'
      case 'python': return '🐍'
      case 'java': return '☕'
      case 'cpp': return '⚙️'
      case 'typescript': return '📘'
      case 'rust': return '🦀'
      default: return '💻'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (group: StudyGroup) => {
    const activity = calculateGroupActivity(group)
    if (activity.activeMembers > group.currentMembers * 0.7) return 'bg-green-100 text-green-800'
    if (activity.activeMembers > group.currentMembers * 0.3) return 'bg-yellow-100 text-yellow-800'
    return 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Study Groups</h2>
          <p className="text-gray-600">Join communities and learn together with peers</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create Group
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search groups..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Language Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Languages</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="typescript">TypeScript</option>
              <option value="rust">Rust</option>
            </select>
          </div>

          {/* Level Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'activity' | 'members' | 'newest')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="activity">Most Active</option>
              <option value="members">Most Members</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Create Group Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Study Group</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Group Name *</label>
              <input
                type="text"
                value={newGroupForm.name}
                onChange={(e) => setNewGroupForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter group name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select
                value={newGroupForm.language}
                onChange={(e) => setNewGroupForm(prev => ({ ...prev, language: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="typescript">TypeScript</option>
                <option value="rust">Rust</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <select
                value={newGroupForm.level}
                onChange={(e) => setNewGroupForm(prev => ({ ...prev, level: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Members</label>
              <input
                type="number"
                value={newGroupForm.maxMembers}
                onChange={(e) => setNewGroupForm(prev => ({ ...prev, maxMembers: parseInt(e.target.value) }))}
                min="5"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                value={newGroupForm.description}
                onChange={(e) => setNewGroupForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your study group..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleCreateGroup}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create Group
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Groups Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGroups.map((group) => {
          const activity = calculateGroupActivity(group)
          const joinResult = canJoinGroup(group, 'current_user')
          const isMember = group.members.some(m => m.userId === 'current_user')
          
          return (
            <div key={group.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              {/* Group Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getLanguageIcon(group.language)}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">{group.name}</h3>
                      <p className="text-sm text-gray-500">by {group.createdBy}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(group.level)}`}>
                    {group.level}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{group.description}</p>
              </div>

              {/* Group Stats */}
              <div className="p-4 border-b border-gray-100">
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="font-semibold text-gray-800">{group.currentMembers}/{group.maxMembers}</div>
                    <div className="text-gray-500">Members</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{activity.totalPosts}</div>
                    <div className="text-gray-500">Posts</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{activity.totalProjects}</div>
                    <div className="text-gray-500">Projects</div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex flex-wrap gap-1">
                  {group.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                  {group.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{group.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="p-4">
                {isMember ? (
                  <button className="w-full px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                    ✓ Member
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoinGroup(group.id)}
                    disabled={!joinResult.canJoin}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                      joinResult.canJoin
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    title={joinResult.reason}
                  >
                    {joinResult.canJoin ? 'Join Group' : joinResult.reason}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Study Groups Found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or create a new study group!
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create First Group
          </button>
        </div>
      )}
    </div>
  )
}
