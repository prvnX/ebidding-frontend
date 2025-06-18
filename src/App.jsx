import { useState } from 'react'
import './App.css'
import Home from './pages/home'
import About from './pages/about'
import Loginpage from './pages/login'
import AuctionHome from './pages/AuctionMan/home'
import AddItem from './pages/AuctionMan/addItem'
import { Routes,Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Loginpage />}/>

        <Route path="/AuctionMan">
          <Route index element={<AuctionHome />} />         {/* this means /AuctionMan */}
          <Route path="addItem" element={<AddItem />} />     {/* this means /AuctionMan/addItem */}
        </Route>

      </Routes>
    </>
  )
}

export default App
