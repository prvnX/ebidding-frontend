import { useCallback, useEffect, useState } from 'react'
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
import WalletWithStripe from './pages/RegisteredUser/wallet';
import Payment from './pages/RegisteredUser/payment';
import PaymentSuccess from './pages/RegisteredUser/paymentSuccess'
import BankTransfer from './pages/RegisteredUser/bankTransfer';
import MyBiddingHistory from './pages/RegisteredUser/myBiddingHistory';
import api from './pages/authApi';

import Appadmin from './pages/AppAdmin/home'
import AddUser from './pages/AppAdmin/addUser'

import InventoryManagerHome from './pages/InventoryManager/home'

import ProfilePage from './pages/profile'
import 'leaflet/dist/leaflet.css';
import FlashMessageCenter from './flashMessageCenter'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStompSubscriptions from "./hooks/useStompSubscriptions";
import { wsCallBackManager } from './services/wsCallBackManager'
import useAuthStore from './components/useAuthStore'

function App() {
  
  const location = useLocation();
  const { role, username } = useAuthStore();

  const myBid = useCallback((bid) => {
    console.log("My Bid My bid", bid);
    wsCallBackManager.executeCallBack(bid);
  }, [wsCallBackManager]);
  useStompSubscriptions(`/topic/bidder:${username}`, myBid, (!username || role !== 'Bidder'));

  useEffect(() => {
    const silentRefresh = async () => {
      try {
        const response = await api.post('/refresh-token', {}, {
          withCredentials: true,
        });
  
        const data = response.data;
  
        if (data && data.jwtToken) {
          useAuthStore.getState().setAuthData({
            jwtToken: data.jwtToken,
            role: data.role,
            username: data.username,
          });
          console.log("🔄 Silent refresh successful on tab load");
        } else {
          console.log("⚠️ Silent refresh failed: No JWT returned");
        }
      } catch (error) {
        if (error.response) {
          console.log(`⚠️ Silent refresh failed: ${error.response.status} ${error.response.statusText}`);
        } else {
          console.log("⚠️ No valid refresh token, user remains logged out");
        }
      }
    };
  
    silentRefresh();
  }, []);

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
        <Route path="/wallet" element={<WalletWithStripe />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
        <Route path="/bankTransfer" element={<BankTransfer />} />
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
