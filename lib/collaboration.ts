// Collaborative Learning System for Dev AI Tutor

export interface StudyGroup {
  id: string
  name: string
  description: string
  language: string
  level: 'beginner' | 'intermediate' | 'advanced'
  maxMembers: number
  currentMembers: number
  createdBy: string
  createdAt: Date
  isPublic: boolean
  tags: string[]
  members: GroupMember[]
  projects: SharedProject[]
  discussions: Discussion[]
}

export interface GroupMember {
  userId: string
  username: string
  avatar?: string
  joinedAt: Date
  role: 'admin' | 'moderator' | 'member'
  contribution: {
    posts: number
    reviews: number
    projects: number
    helpfulVotes: number
  }
}

export interface SharedProject {
  id: string
  title: string
  description: string
  language: string
  level: 'beginner' | 'intermediate' | 'advanced'
  createdBy: string
  createdAt: Date
  collaborators: string[]
  code: string
  status: 'draft' | 'in-progress' | 'completed' | 'review'
  reviews: ProjectReview[]
  tags: string[]
}

export interface ProjectReview {
  id: string
  projectId: string
  reviewerId: string
  reviewerName: string
  rating: number // 1-5 stars
  feedback: string
  suggestions: string[]
  createdAt: Date
  helpful: number
}

export interface Discussion {
  id: string
  groupId: string
  title: string
  content: string
  authorId: string
  authorName: string
  createdAt: Date
  replies: DiscussionReply[]
  tags: string[]
  isPinned: boolean
  isResolved: boolean
}

export interface DiscussionReply {
  id: string
  discussionId: string
  content: string
  authorId: string
  authorName: string
  createdAt: Date
  isAccepted: boolean
  helpful: number
}

export interface PeerReview {
  id: string
  reviewerId: string
  revieweeId: string
  projectId: string
  language: string
  level: 'beginner' | 'intermediate' | 'advanced'
  reviewCriteria: {
    codeQuality: number // 1-5
    functionality: number // 1-5
    documentation: number // 1-5
    bestPractices: number // 1-5
  }
  feedback: string
  suggestions: string[]
  status: 'pending' | 'completed' | 'disputed'
  createdAt: Date
  completedAt?: Date
}

// Sample data
export const SAMPLE_STUDY_GROUPS: StudyGroup[] = [
  {
    id: 'js-beginners-2024',
    name: 'JavaScript Beginners 2024',
    description: 'A supportive community for JavaScript beginners. Share your progress, ask questions, and learn together!',
    language: 'javascript',
    level: 'beginner',
    maxMembers: 50,
    currentMembers: 23,
    createdBy: 'dev_mentor',
    createdAt: new Date('2024-01-15'),
    isPublic: true,
    tags: ['javascript', 'beginner', 'web-development', 'community'],
    members: [],
    projects: [],
    discussions: []
  },
  {
    id: 'python-data-science',
    name: 'Python Data Science Enthusiasts',
    description: 'Learn Python for data science, machine learning, and analytics. Share projects and insights!',
    language: 'python',
    level: 'intermediate',
    maxMembers: 30,
    currentMembers: 18,
    createdBy: 'data_scientist',
    createdAt: new Date('2024-01-10'),
    isPublic: true,
    tags: ['python', 'data-science', 'machine-learning', 'analytics'],
    members: [],
    projects: [],
    discussions: []
  },
  {
    id: 'rust-systems-programming',
    name: 'Rust Systems Programming',
    description: 'Advanced Rust programming for systems development, performance optimization, and memory safety.',
    language: 'rust',
    level: 'advanced',
    maxMembers: 25,
    currentMembers: 12,
    createdBy: 'rust_expert',
    createdAt: new Date('2024-01-05'),
    isPublic: true,
    tags: ['rust', 'systems-programming', 'performance', 'memory-safety'],
    members: [],
    projects: [],
    discussions: []
  }
]

export const SAMPLE_SHARED_PROJECTS: SharedProject[] = [
  {
    id: 'weather-app-js',
    title: 'Weather Dashboard',
    description: 'A collaborative weather dashboard using JavaScript, HTML, and CSS. Features real-time weather data and responsive design.',
    language: 'javascript',
    level: 'intermediate',
    createdBy: 'weather_dev',
    createdAt: new Date('2024-01-20'),
    collaborators: ['weather_dev', 'ui_designer', 'api_expert'],
    code: `// Weather Dashboard - Collaborative Project
const weatherApp = {
  init() {
    this.setupEventListeners();
    this.loadWeatherData();
  },
  
  setupEventListeners() {
    document.getElementById('searchBtn').addEventListener('click', () => {
      this.searchWeather();
    });
  },
  
  async loadWeatherData() {
    // Implementation here
  }
};`,
    status: 'in-progress',
    reviews: [],
    tags: ['weather', 'api', 'dashboard', 'responsive']
  },
  {
    id: 'todo-app-python',
    title: 'Advanced Todo Application',
    description: 'A feature-rich todo application with user authentication, database storage, and REST API.',
    language: 'python',
    level: 'intermediate',
    createdBy: 'python_dev',
    createdAt: new Date('2024-01-18'),
    collaborators: ['python_dev', 'backend_expert'],
    code: `# Advanced Todo Application
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todos.db'
db = SQLAlchemy(app)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)`,
    status: 'completed',
    reviews: [],
    tags: ['todo', 'flask', 'database', 'api']
  }
]

// Helper functions
export function createStudyGroup(
  name: string,
  description: string,
  language: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  createdBy: string,
  maxMembers: number = 30,
  isPublic: boolean = true,
  tags: string[] = []
): StudyGroup {
  return {
    id: `${language}-${level}-${Date.now()}`,
    name,
    description,
    language,
    level,
    maxMembers,
    currentMembers: 1,
    createdBy,
    createdAt: new Date(),
    isPublic,
    tags: [language, level, ...tags],
    members: [{
      userId: createdBy,
      username: createdBy,
      joinedAt: new Date(),
      role: 'admin',
      contribution: { posts: 0, reviews: 0, projects: 0, helpfulVotes: 0 }
    }],
    projects: [],
    discussions: []
  }
}

export function createSharedProject(
  title: string,
  description: string,
  language: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  createdBy: string,
  code: string,
  tags: string[] = []
): SharedProject {
  return {
    id: `project-${Date.now()}`,
    title,
    description,
    language,
    level,
    createdBy,
    createdAt: new Date(),
    collaborators: [createdBy],
    code,
    status: 'draft',
    reviews: [],
    tags: [language, level, ...tags]
  }
}

export function createProjectReview(
  projectId: string,
  reviewerId: string,
  reviewerName: string,
  rating: number,
  feedback: string,
  suggestions: string[] = []
): ProjectReview {
  return {
    id: `review-${Date.now()}`,
    projectId,
    reviewerId,
    reviewerName,
    rating: Math.max(1, Math.min(5, rating)), // Ensure 1-5 range
    feedback,
    suggestions,
    createdAt: new Date(),
    helpful: 0
  }
}

export function createDiscussion(
  groupId: string,
  title: string,
  content: string,
  authorId: string,
  authorName: string,
  tags: string[] = []
): Discussion {
  return {
    id: `discussion-${Date.now()}`,
    groupId,
    title,
    content,
    authorId,
    authorName,
    createdAt: new Date(),
    replies: [],
    tags,
    isPinned: false,
    isResolved: false
  }
}

export function calculateGroupActivity(group: StudyGroup): {
  totalPosts: number
  totalProjects: number
  totalReviews: number
  activeMembers: number
} {
  const totalPosts = group.discussions.length + group.discussions.reduce((sum, d) => sum + d.replies.length, 0)
  const totalProjects = group.projects.length
  const totalReviews = group.projects.reduce((sum, p) => sum + p.reviews.length, 0)
  const activeMembers = group.members.filter(m => {
    const lastActivity = new Date(Math.max(
      m.contribution.posts > 0 ? Date.now() - 7 * 24 * 60 * 60 * 1000 : 0, // 7 days
      m.contribution.reviews > 0 ? Date.now() - 14 * 24 * 60 * 60 * 1000 : 0, // 14 days
      m.contribution.projects > 0 ? Date.now() - 30 * 24 * 60 * 60 * 1000 : 0 // 30 days
    ))
    return new Date(m.joinedAt) > lastActivity
  }).length

  return { totalPosts, totalProjects, totalReviews, activeMembers }
}

export function getGroupRecommendations(
  userLanguage: string,
  userLevel: 'beginner' | 'intermediate' | 'advanced',
  userInterests: string[] = []
): StudyGroup[] {
  return SAMPLE_STUDY_GROUPS.filter(group => {
    // Match language and level
    const languageMatch = group.language === userLanguage
    const levelMatch = group.level === userLevel
    
    // Check for interest overlap
    const interestMatch = userInterests.length === 0 || 
      userInterests.some(interest => group.tags.includes(interest))
    
    // Prefer groups with available spots
    const hasSpace = group.currentMembers < group.maxMembers
    
    return (languageMatch && levelMatch) || (interestMatch && hasSpace)
  }).sort((a, b) => {
    // Sort by activity and available space
    const aActivity = calculateGroupActivity(a)
    const bActivity = calculateGroupActivity(b)
    
    const aScore = aActivity.activeMembers + (a.maxMembers - a.currentMembers)
    const bScore = bActivity.activeMembers + (b.maxMembers - b.currentMembers)
    
    return bScore - aScore
  })
}

export function canJoinGroup(group: StudyGroup, userId: string): {
  canJoin: boolean
  reason?: string
} {
  if (group.members.some(m => m.userId === userId)) {
    return { canJoin: false, reason: 'Already a member' }
  }
  
  if (group.currentMembers >= group.maxMembers) {
    return { canJoin: false, reason: 'Group is full' }
  }
  
  return { canJoin: true }
}

export function getCollaborationStats(userId: string, groups: StudyGroup[]): {
  totalGroups: number
  totalProjects: number
  totalReviews: number
  totalPosts: number
  averageRating: number
} {
  const userGroups = groups.filter(g => g.members.some(m => m.userId === userId))
  const userProjects = userGroups.flatMap(g => g.projects.filter(p => p.collaborators.includes(userId)))
  const userReviews = userProjects.flatMap(p => p.reviews.filter(r => r.reviewerId === userId))
  const userPosts = userGroups.flatMap(g => 
    g.discussions.filter(d => d.authorId === userId).length +
    g.discussions.flatMap(d => d.replies.filter(r => r.authorId === userId)).length
  )
  
  const averageRating = userReviews.length > 0 
    ? userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length 
    : 0

  return {
    totalGroups: userGroups.length,
    totalProjects: userProjects.length,
    totalReviews: userReviews.length,
    totalPosts: userPosts,
    averageRating: Math.round(averageRating * 10) / 10
  }
}
