import { useState } from 'react'
import { Navigation } from './components/Navigation'
import { HomePage } from './components/HomePage'
import './App.css'

function App() {
  const [cartCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation cartCount={cartCount} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HomePage />
      </main>
    </div>
  )
}

export default App
