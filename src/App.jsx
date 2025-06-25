import { useState } from 'react'
import './App.css'
import Home from './pages/home'
import About from './pages/about'
import Loginpage from './pages/login'
import AuctionHome from './pages/AuctionMan/home'
import AddItem from './pages/AuctionMan/addItem'
import { Routes,Route } from 'react-router-dom'
import Appadmin from './pages/AppAdmin/home'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Loginpage />}/>
        <Route path="/AuctionMan/Home" element={<AuctionHome/> }/>
        <Route path="/AuctionMan/addItem" element={<AddItem/> }/>
        <Route path="/AppAdmin" element={<Appadmin />} />

      </Routes>
    </>
  )
}

export default App
