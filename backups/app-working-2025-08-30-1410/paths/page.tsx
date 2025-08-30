export default function PathsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Learning Paths
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Structured learning paths to guide your programming journey
        </p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-2">Web Development</h3>
          <p className="text-sm text-gray-600 mb-4">Learn HTML, CSS, JavaScript, and modern frameworks</p>
          <div className="text-xs text-gray-500">HTML • CSS • JavaScript • React • Node.js</div>
        </div>
        
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-2">Mobile Development</h3>
          <p className="text-sm text-gray-600 mb-4">Build iOS and Android apps with modern tools</p>
          <div className="text-xs text-gray-500">React Native • Flutter • Swift • Kotlin</div>
        </div>
        
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-2">Backend Development</h3>
          <p className="text-sm text-gray-600 mb-4">Server-side programming and database management</p>
          <div className="text-xs text-gray-500">Python • Java • C# • SQL • MongoDB</div>
        </div>
      </div>
    </div>
  )
}
