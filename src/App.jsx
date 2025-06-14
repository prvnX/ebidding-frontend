import { useState } from 'react'
import './App.css'
import Home from './pages/home'
import About from './pages/about'
import Loginpage from './pages/login'
import { Routes,Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Loginpage />}/>
      </Routes>
    </>
  )
}

export default App
