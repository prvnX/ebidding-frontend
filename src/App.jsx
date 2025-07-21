import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
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
import ScheduleAuctions from './pages/AuctionMan/scheduleAuctions'
import AuctionManItemDetails from './pages/AuctionMan/item_details'

import Dashboard from './pages/RegisteredUser/dashboard';
import AuctionHistory from './pages/RegisteredUser/auctionHistory';
import AuctionSummary from './pages/RegisteredUser/auctionSummary';
import MyBiddingHistory from './pages/RegisteredUser/myBiddingHistory';

import Appadmin from './pages/AppAdmin/home'
import AddUser from './pages/AppAdmin/addUser'

import InventoryManagerHome from './pages/InventoryManager/home'

import ProfilePage from './pages/profile'
import 'leaflet/dist/leaflet.css';
import FlashMessageCenter from './flashMessageCenter'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import MessageToast from './components/ui/messageToast.jsx';

function App() {

  const location = useLocation();

  return (
    <>
      {/* <MessageToast locationState={location.state} /> */}
      <FlashMessageCenter />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Loginpage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/hello" element={<Hello />}/>

        <Route path="/AppAdmin">
          <Route index element={<Appadmin />} />
          <Route path="addUser" element={<AddUser />} />
        </Route>

        <Route path="/item/:itemId" element={<ItemDetails />}/>
        <Route path="/RegisteredUser/dashboard" element={<BidderHome />}/>

        <Route path="/profile" element={<ProfilePage />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/auctionHistory' element={<AuctionHistory />} />
        <Route path="/auctionSummary" element={<AuctionSummary />}/>
        <Route path="/myBiddingHistory" element={<MyBiddingHistory />} />

        <Route path="/AuctionMan">
          <Route index element={<AuctionHome />} />
          <Route path="addItem" element={<AddItem />} />
          <Route path="scheduleAuctions" element={<ScheduleAuctions />} />
          <Route path="item/:itemId" element={<AuctionManItemDetails />} />
        </Route>

        <Route path="/InventoryManager" element={<InventoryManagerHome />} />

      </Routes>
    </>
  )
}

export default App
