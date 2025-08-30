"use client"

import { useState } from "react"
import DevChat from "@/components/DevChat"

export default function DevTestPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner')

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Meet Dev</h1>
          <p className="text-gray-600">Your AI Programming Tutor</p>
        </div>
        
        {/* Language and Level Selector */}
        <div className="mb-6 bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Choose Language:</label>
              <select 
                value={selectedLanguage} 
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Choose Level:</label>
              <select 
                value={selectedLevel} 
                onChange={(e) => setSelectedLevel(e.target.value as 'beginner' | 'intermediate' | 'advanced')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Learning <span className="font-semibold text-blue-600">{selectedLanguage}</span> at 
              <span className="font-semibold text-green-600"> {selectedLevel}</span> level
            </p>
          </div>
        </div>
        
        <div className="h-[600px]">
          <DevChat language={selectedLanguage} level={selectedLevel} />
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>This is a test version of Dev. Try asking questions about programming!</p>
          <p className="mt-2">
            <strong>Try these commands:</strong> "variables", "functions", "show progress", "run code"
          </p>
        </div>
      </div>
    </div>
  )
}
