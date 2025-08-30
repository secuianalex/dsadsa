"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface Project {
  id: string
  title: string
  description: string
  technologies: string
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  isPublic: boolean
  isFeatured: boolean
  createdAt: string
}

interface Skill {
  id: string
  name: string
  category: string
  proficiency: number
  yearsOfExperience?: number
}

interface UserProfile {
  bio?: string
  location?: string
  website?: string
  github?: string
  linkedin?: string
  twitter?: string
}

export default function PortfolioBuilder() {
  const { data: session } = useSession()
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [profile, setProfile] = useState<UserProfile>({})
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'profile'>('projects')
  const [isLoading, setIsLoading] = useState(true)
  const [showAddProject, setShowAddProject] = useState(false)
  const [showAddSkill, setShowAddSkill] = useState(false)

  // Form states
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
    isPublic: true
  })

  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'programming',
    proficiency: 3,
    yearsOfExperience: undefined as number | undefined
  })

  useEffect(() => {
    if (session?.user?.id) {
      loadPortfolioData()
    }
  }, [session])

  const loadPortfolioData = async () => {
    try {
      setIsLoading(true)
      const [projectsRes, skillsRes] = await Promise.all([
        fetch('/api/portfolio/projects'),
        fetch('/api/portfolio/skills')
      ])

      if (projectsRes.ok) {
        const { projects } = await projectsRes.json()
        setProjects(projects.map((p: any) => ({
          ...p,
          technologies: JSON.parse(p.technologies || '[]')
        })))
      }

      if (skillsRes.ok) {
        const { skills } = await skillsRes.json()
        setSkills(skills)
      }
    } catch (error) {
      console.error('Error loading portfolio data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/portfolio/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProject,
          technologies: newProject.technologies.split(',').map(t => t.trim())
        })
      })

      if (response.ok) {
        const { project } = await response.json()
        setProjects([{ ...project, technologies: JSON.parse(project.technologies) }, ...projects])
        setNewProject({
          title: '',
          description: '',
          technologies: '',
          githubUrl: '',
          liveUrl: '',
          imageUrl: '',
          isPublic: true
        })
        setShowAddProject(false)
      }
    } catch (error) {
      console.error('Error adding project:', error)
    }
  }

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/portfolio/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill)
      })

      if (response.ok) {
        const { skill } = await response.json()
        setSkills([...skills, skill])
        setNewSkill({
          name: '',
          category: 'programming',
          proficiency: 3,
          yearsOfExperience: undefined
        })
        setShowAddSkill(false)
      }
    } catch (error) {
      console.error('Error adding skill:', error)
    }
  }

  const getProficiencyColor = (level: number) => {
    const colors = ['bg-red-200', 'bg-orange-200', 'bg-yellow-200', 'bg-blue-200', 'bg-green-200']
    return colors[level - 1] || colors[2]
  }

  const getProficiencyText = (level: number) => {
    const levels = ['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Expert']
    return levels[level - 1] || 'Intermediate'
  }

  if (!session?.user?.id) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
        <div className="p-8 text-center">
          <div className="text-gray-400 mb-4 text-6xl">🎨</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Portfolio Builder</h2>
          <p className="text-gray-600 mb-6">Sign in to create and manage your professional portfolio</p>
          <Link
            href="/auth/signin"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Sign In to Continue
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
        <h1 className="text-3xl font-bold mb-2">Portfolio Builder</h1>
        <p className="text-blue-100">Showcase your skills and projects professionally</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'projects', label: 'Projects', icon: '🚀' },
            { id: 'skills', label: 'Skills', icon: '⚡' },
            { id: 'profile', label: 'Profile', icon: '👤' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your portfolio...</p>
          </div>
        ) : (
          <>
            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Your Projects</h2>
                  <button
                    onClick={() => setShowAddProject(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    + Add Project
                  </button>
                </div>

                {showAddProject && (
                  <div className="bg-gray-50 p-6 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-4">Add New Project</h3>
                    <form onSubmit={handleAddProject} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Project Title"
                          value={newProject.title}
                          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Technologies (comma-separated)"
                          value={newProject.technologies}
                          onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <textarea
                        placeholder="Project Description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        required
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="url"
                          placeholder="GitHub URL (optional)"
                          value={newProject.githubUrl}
                          onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="url"
                          placeholder="Live Demo URL (optional)"
                          value={newProject.liveUrl}
                          onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowAddProject(false)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          Add Project
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      {project.imageUrl && (
                        <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {Array.isArray(project.technologies) && project.technologies.map((tech, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:text-blue-700 text-sm"
                            >
                              GitHub
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-500 hover:text-green-700 text-sm"
                            >
                              Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {projects.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-4">🚀</div>
                    <p>No projects yet. Add your first project to showcase your skills!</p>
                  </div>
                )}
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Your Skills</h2>
                  <button
                    onClick={() => setShowAddSkill(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    + Add Skill
                  </button>
                </div>

                {showAddSkill && (
                  <div className="bg-gray-50 p-6 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-4">Add New Skill</h3>
                    <form onSubmit={handleAddSkill} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                          type="text"
                          placeholder="Skill Name"
                          value={newSkill.name}
                          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <select
                          value={newSkill.category}
                          onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="programming">Programming</option>
                          <option value="framework">Framework</option>
                          <option value="tool">Tool</option>
                          <option value="soft-skill">Soft Skill</option>
                        </select>
                        <select
                          value={newSkill.proficiency}
                          onChange={(e) => setNewSkill({ ...newSkill, proficiency: parseInt(e.target.value) })}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value={1}>Beginner</option>
                          <option value={2}>Novice</option>
                          <option value={3}>Intermediate</option>
                          <option value={4}>Advanced</option>
                          <option value={5}>Expert</option>
                        </select>
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowAddSkill(false)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          Add Skill
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{skill.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProficiencyColor(skill.proficiency)}`}>
                          {getProficiencyText(skill.proficiency)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2 capitalize">{skill.category.replace('-', ' ')}</p>
                      {skill.yearsOfExperience && (
                        <p className="text-gray-500 text-xs">{skill.yearsOfExperience} years experience</p>
                      )}
                      <div className="mt-3">
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`h-2 flex-1 rounded ${
                                level <= skill.proficiency ? 'bg-blue-500' : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {skills.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-4">⚡</div>
                    <p>No skills added yet. Add your skills to showcase your expertise!</p>
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                <div className="bg-gray-50 p-6 rounded-lg border">
                  <p className="text-gray-600 mb-4">
                    Profile customization features will be available in the next phase. 
                    This will include bio, location, social links, and portfolio customization.
                  </p>
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">👤</div>
                    <p className="text-gray-500">Profile customization coming soon!</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
