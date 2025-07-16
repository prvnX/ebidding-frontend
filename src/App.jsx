import { useState } from 'react'
import './App.css'
import Home from './pages/home'
import About from './pages/about'
import Loginpage from './pages/login'
import RegisterPage from './pages/register'

import ItemDetails from './pages/item_details'

import AuctionHome from './pages/AuctionMan/home'
import AddItem from './pages/AuctionMan/addItem'
import Hello  from './pages/hello'
import BidderHome from './pages/RegisteredUser/dashboard'

import { Routes,Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Loginpage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/hello" element={<Hello />}/>

        <Route path="/item/:itemId" element={<ItemDetails />}/>
        <Route path="/RegisteredUser/dashboard" element={<BidderHome />}/>
        <Route path="/AuctionMan/Home" element={<AuctionHome/> }/>
        <Route path="/AuctionMan/addItem" element={<AddItem/> }/>

      </Routes>
    </>
  )
}

export default App
