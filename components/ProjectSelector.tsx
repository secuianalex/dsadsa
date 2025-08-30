"use client"

import { useState } from "react"
import { Project, getProjectsForLanguage } from "@/lib/projects"

interface ProjectSelectorProps {
  language: string
  level: 'beginner' | 'intermediate' | 'advanced'
  onProjectSelect: (project: Project) => void
}

export default function ProjectSelector({ language, level, onProjectSelect }: ProjectSelectorProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all')
  
  const projects = getProjectsForLanguage(language, level)
  const filteredProjects = selectedDifficulty === 'all' 
    ? projects 
    : projects.filter(project => project.difficulty === selectedDifficulty)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'hard': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '🌱'
      case 'medium': return '🚀'
      case 'hard': return '⚡'
      default: return '📚'
    }
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🚧</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Projects Available</h3>
        <p className="text-gray-600">
          Projects for {language} {level} level are coming soon!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Project</h2>
        <p className="text-gray-600">
          Complete a project to graduate from {level} level in {language}
        </p>
      </div>

      {/* Difficulty Filter */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-lg p-1">
          {(['all', 'easy', 'medium', 'hard'] as const).map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedDifficulty === difficulty
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {difficulty === 'all' ? 'All' : 
               difficulty === 'easy' ? '🌱 Easy' :
               difficulty === 'medium' ? '🚀 Medium' : '⚡ Hard'}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer"
            onClick={() => onProjectSelect(project)}
          >
            {/* Project Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-800 text-lg">{project.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(project.difficulty)}`}>
                  {getDifficultyIcon(project.difficulty)} {project.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
            </div>

            {/* Project Details */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>⏱️</span>
                  <span>{project.estimatedTime} min</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>📋</span>
                  <span>{project.requirements.length} requirements</span>
                </div>
              </div>

              {/* Requirements Preview */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Key Requirements:</h4>
                <ul className="space-y-1">
                  {project.requirements.slice(0, 3).map((req, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-start gap-1">
                      <span className="text-blue-500 mt-1">•</span>
                      <span className="line-clamp-1">{req}</span>
                    </li>
                  ))}
                  {project.requirements.length > 3 && (
                    <li className="text-xs text-gray-500">
                      +{project.requirements.length - 3} more requirements
                    </li>
                  )}
                </ul>
              </div>

              {/* Action Button */}
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                Start Project
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Projects Found</h3>
          <p className="text-gray-600">
            Try selecting a different difficulty level.
          </p>
        </div>
      )}

      {/* Project Completion Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl">🎯</div>
          <div>
            <h4 className="font-semibold text-blue-800 mb-1">Project Completion</h4>
            <p className="text-sm text-blue-700">
              Complete any project above to demonstrate your skills and graduate from the {level} level. 
              Each project includes starter code, hints, and validation to help you succeed!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
