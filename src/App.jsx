import { useState } from 'react'
import './App.css'
import Home from './pages/home'
import About from './pages/about'
import Loginpage from './pages/login'

import ItemDetails from './pages/item_details'

import AuctionHome from './pages/AuctionMan/home'
import AddItem from './pages/AuctionMan/addItem'

import { Routes,Route } from 'react-router-dom'
import 'leaflet/dist/leaflet.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Loginpage />}/>

        <Route path="/item/:itemId" element={<ItemDetails />}/>
          
        <Route path="/AuctionMan">
          <Route index element={<AuctionHome />} />
          <Route path="addItem" element={<AddItem />} />
        </Route>
        
      </Routes>
    </>
  )
}

export default App
