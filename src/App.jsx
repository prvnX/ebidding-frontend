import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import About from './pages/about'
import Loginpage from './pages/login'

import ItemDetails from './pages/item_details'

import AuctionHome from './pages/AuctionMan/home'
import AddItem from './pages/AuctionMan/addItem'
import ScheduleAuctions from './pages/AuctionMan/scheduleAuctions'

import Dashboard from './pages/RegisteredUser/dashboard';

import Appadmin from './pages/AppAdmin/home'

import ProfilePage from './pages/profile'
import 'leaflet/dist/leaflet.css';

import FlashMessage from './components/ui/flashMessage'

function App() {

  const location = useLocation();

  return (
    <>
      <FlashMessage locationState={location.state} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Loginpage />}/>

        <Route path="/AppAdmin" element={<Appadmin />} />

        <Route path="/item/:itemId" element={<ItemDetails />}/>

        <Route path="/profile" element={<ProfilePage />} />
        
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/AuctionMan">
          <Route index element={<AuctionHome />} />
          <Route path="addItem" element={<AddItem />} />
          <Route path="scheduleAuctions" element={<ScheduleAuctions />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
