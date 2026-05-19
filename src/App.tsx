import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { HomePage } from './components/HomePage'
import './App.css'

function App() {
  const [cartCount] = useState(0)

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navigation cartCount={cartCount} />
        <main>
          <HomePage />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
