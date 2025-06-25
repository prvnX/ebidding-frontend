import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faUser,
  faEnvelope,
  faIdCard,
  faCircleCheck,
  faBirthdayCake,
  faCalendarAlt,
  faLock,
  faHistory,
  faHeart,
  faCog,
  faClipboardList,
  faBell, // Added this missing import
  faTimes, // Added for delete icon
  faCamera,
  faInfoCircle,
  faFilter,
  faChevronDown,
  faList,
  faThLarge,
  faEye,
  faEllipsisV,
  faChevronLeft,
  faChevronRight,
  faGavel,
  faTrophy,
  faBolt
} from "@fortawesome/free-solid-svg-icons";

// Import your header and footer components
import CustomHeader from "../components/custom-header";
import BidderHeader from "../components/bidder-header";
import Footer from "../components/footer";

// Sample profile picture - replace with actual path
import profilePic from "../assets/profile.jpg";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import BredCrumb from "../components/ui/breadCrumb";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("bids"); // Start with bids tab active for testing
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  
  // Mock user data - replace with actual data from your API/backend
  const userData = {
    fullName: "John D. Smith",
    username: "johnsmith",
    email: "john.smith@example.com",
    nic: "992345678V",
    status: "Active",
    dob: "1992-05-15",
    registeredDate: "2023-10-24",
    profileImage: profilePic,
    phone: "+94 77 123 4567",
    address: "123 Main Street, Colombo 07, Sri Lanka",
    bidStats: {
    totalBids: 47,
    wonBids: 12,
    activeBids: 5
    }
  };

  // State to control modal visibility
  const [isEditing, setIsEditing] = useState(false);
  // State to store form data
  const [editFormData, setEditFormData] = useState({});

  // Initialize form data when modal opens
  useEffect(() => {
    if (isEditing) {
      setEditFormData({
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        dob: userData.dob
      });
    }
  }, [isEditing, userData]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would update the user data with API call
    console.log("Form submitted:", editFormData);
    setIsEditing(false);
  };

  // Fixed Settings Tab Content
  const renderSettingsTab = () => {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">Account Settings</h2>
        
        <div className="space-y-6">
          {/* Change Password */}
          <div className="border rounded-md p-5 hover:shadow-sm transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faLock} className="text-[#1e3a5f]" />
                </div>
                <div>
                  <h3 className="font-medium">Password</h3>
                  <p className="text-sm text-gray-500">Update your password</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">
                Change
              </button>
            </div>
          </div>
          
          {/* Notification Preferences */}
          <div className="border rounded-md p-5 hover:shadow-sm transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faBell} className="text-[#1e3a5f]" />
                </div>
                <div>
                  <h3 className="font-medium">Notifications</h3>
                  <p className="text-sm text-gray-500">Manage your notification preferences</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">
                Configure
              </button>
            </div>
          </div>
          
          {/* Account Privacy */}
          <div className="border rounded-md p-5 hover:shadow-sm transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faUser} className="text-[#1e3a5f]" />
                </div>
                <div>
                  <h3 className="font-medium">Privacy Settings</h3>
                  <p className="text-sm text-gray-500">Control your profile visibility</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">
                Configure
              </button>
            </div>
          </div>
          
          {/* Delete Account */}
          <div className="border border-red-200 rounded-md p-5 bg-red-50 hover:shadow-sm transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faTimes} className="text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium text-red-700">Delete Account</h3>
                  <p className="text-sm text-red-500">Permanently delete your account and all data</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-red-300 text-red-600 rounded-md text-sm font-medium hover:bg-red-100">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Define this at the component level if it's not already defined
  const [bidHistoryData, setBidHistoryData] = useState([
    {
      id: 1,
      itemName: "Luxury Watch Collection",
      auctionId: "A-2024-001",
      image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=150",
      bidAmount: 650000,
      date: "2024-04-12",
      status: "winning",
      endsIn: "2 days"
    },
    {
      id: 2,
      itemName: "Antique Wooden Furniture",
      auctionId: "A-2024-042",
      image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?q=80&w=150",
      bidAmount: 125000,
      date: "2024-04-10",
      status: "outbid",
      endsIn: "5 days"
    }
    // Add more items as needed
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getBidStatusColor = (status) => {
    switch (status) {
      case 'winning': return 'bg-green-100 text-green-800';
      case 'outbid': return 'bg-yellow-100 text-yellow-800';
      case 'ended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <>
      <CustomHeader />
      <BidderHeader />
      
      <div className="bg-gray-50 min-h-screen pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <BredCrumb page="Profile" breadCrumbs={[
            { title: "Home", link: "/" },
          ]} />

          {/* Profile Header - IMPROVED */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            {/* Thinner blue header bar - reduced height from 24 to 16 */}
            <div className="bg-[#1e3a5f] h-16 relative">
              {/* Edit button removed from here */}
            </div>
            
            <div className="flex flex-col md:flex-row px-6 pb-6 relative">
              {/* Profile image - adjusted top position for thinner header */}
              <div className="absolute -top-10 left-6 z-10">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                  <img 
                    src={userData.profileImage} 
                    alt={userData.fullName} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150?text=Profile";
                    }}
                  />
                </div>
              </div>
              
              {/* Add placeholder space where profile image would be */}
              <div className="w-24 h-12 md:h-12"></div>
              
              {/* Profile info */}
              <div className="md:ml-4 pt-4 flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <h1 className="text-2xl font-bold text-gray-900">{userData.fullName}</h1>
                      {userData.verificationLevel === "Verified" && (
                        <FontAwesomeIcon icon={faCheckCircle} className="text-[#1e3a5f] ml-2" />
                      )}
                    </div>
                    <p className="text-gray-600">@{userData.username}</p>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      userData.status === "Active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {userData.status}
                    </span>
                    
                    {/* Edit button moved here for better UX */}
                    <button 
                      onClick={() => setIsEditing(true)} 
                      className="px-4 py-1 border border-[#1e3a5f] text-[#1e3a5f] rounded-md hover:bg-[#1e3a5f] hover:text-white transition-colors font-medium text-sm"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-1" />
                      Edit Profile
                    </button>
                  </div>
                </div>
                
                {/* Professional Bid Statistics Cards - Neutral Color Scheme */}
                <div className="flex justify-center my-5">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 w-full max-w-3xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-700 font-semibold">Bid Statistics</h3>
                      <span className="text-xs text-gray-500">Last updated: Today</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6">
                      {/* Total Bids */}
                      <div className="p-3 border border-gray-100 rounded-lg bg-gray-50 hover:shadow-sm transition-shadow">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                            <FontAwesomeIcon icon={faGavel} className="text-gray-700" />
                          </div>
                          <span className="text-sm text-gray-600 font-medium">Total Bids</span>
                        </div>
                        <div className="mt-2">
                          <span className="text-2xl font-bold text-gray-800">{userData.bidStats.totalBids}</span>
                          <div className="mt-1 text-xs text-gray-500">Across all auctions</div>
                        </div>
                      </div>
                      
                      {/* Won Bids */}
                      <div className="p-3 border border-gray-100 rounded-lg bg-gray-50 hover:shadow-sm transition-shadow">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                            <FontAwesomeIcon icon={faTrophy} className="text-green-600" />
                          </div>
                          <span className="text-sm text-gray-600 font-medium">Won Bids</span>
                        </div>
                        <div className="mt-2">
                          <span className="text-2xl font-bold text-gray-800">{userData.bidStats.wonBids}</span>
                          <div className="mt-1 text-xs text-green-600 font-medium">
                            {Math.round((userData.bidStats.wonBids / userData.bidStats.totalBids) * 100)}% success rate
                          </div>
                        </div>
                      </div>
                      
                      {/* Active Bids */}
                      <div className="p-3 border border-gray-100 rounded-lg bg-gray-50 hover:shadow-sm transition-shadow">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                            <FontAwesomeIcon icon={faBolt} className="text-amber-600" />
                          </div>
                          <span className="text-sm text-gray-600 font-medium">Active Bids</span>
                        </div>
                        <div className="mt-2">
                          <span className="text-2xl font-bold text-gray-800">{userData.bidStats.activeBids}</span>
                          <div className="mt-1 text-xs text-amber-600 font-medium">Currently in progress</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content with tabs */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Tab navigation */}
            <div className="flex border-b border-gray-200 overflow-x-auto">
              <button
                onClick={() => setActiveTab("profile")}
                className={`py-4 px-6 text-center whitespace-nowrap ${
                  activeTab === "profile" 
                  ? "border-b-2 border-[#1e3a5f] text-[#1e3a5f] font-medium" 
                  : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab("bids")}
                className={`py-4 px-6 text-center whitespace-nowrap ${
                  activeTab === "bids" 
                  ? "border-b-2 border-[#1e3a5f] text-[#1e3a5f] font-medium" 
                  : "text-gray-500 hover:text-gray-700"
                }`}
              >
                My Bids
              </button>
              <button
                onClick={() => setActiveTab("favorites")}
                className={`py-4 px-6 text-center whitespace-nowrap ${
                  activeTab === "favorites" 
                  ? "border-b-2 border-[#1e3a5f] text-[#1e3a5f] font-medium" 
                  : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Favorites
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`py-4 px-6 text-center whitespace-nowrap ${
                  activeTab === "settings" 
                  ? "border-b-2 border-[#1e3a5f] text-[#1e3a5f] font-medium" 
                  : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Settings
              </button>
            </div>
            
            {/* Profile Information Tab */}
            {activeTab === "profile" && (
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <div className="flex items-center text-sm text-gray-500">
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      Full Name
                    </div>
                    <div className="font-medium">{userData.fullName}</div>
                  </div>
                  
                  {/* Username */}
                  <div className="space-y-1.5">
                    <div className="flex items-center text-sm text-gray-500">
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      Username
                    </div>
                    <div className="font-medium">@{userData.username}</div>
                  </div>
                  
                  {/* Email */}
                  <div className="space-y-1.5">
                    <div className="flex items-center text-sm text-gray-500">
                      <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                      Email Address
                    </div>
                    <div className="font-medium">{userData.email}</div>
                  </div>
                  
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <div className="flex items-center text-sm text-gray-500">
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      Phone Number
                    </div>
                    <div className="font-medium">{userData.phone}</div>
                  </div>
                  
                  {/* NIC */}
                  <div className="space-y-1.5">
                    <div className="flex items-center text-sm text-gray-500">
                      <FontAwesomeIcon icon={faIdCard} className="mr-2" />
                      National ID
                    </div>
                    <div className="font-medium">{userData.nic}</div>
                  </div>
                  
                  {/* Status */}
                  <div className="space-y-1.5">
                    <div className="flex items-center text-sm text-gray-500">
                      <FontAwesomeIcon icon={faCircleCheck} className="mr-2" />
                      Account Status
                    </div>
                    <div>
                      <span className={`px-2.5 py-0.5 rounded-full text-sm ${
                        userData.status === "Active" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {userData.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* DOB */}
                  <div className="space-y-1.5">
                    <div className="flex items-center text-sm text-gray-500">
                      <FontAwesomeIcon icon={faBirthdayCake} className="mr-2" />
                      Date of Birth
                    </div>
                    <div className="font-medium">{new Date(userData.dob).toLocaleDateString()}</div>
                  </div>
                  
                  {/* Registration Date */}
                  <div className="space-y-1.5">
                    <div className="flex items-center text-sm text-gray-500">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                      Registered On
                    </div>
                    <div className="font-medium">{new Date(userData.registeredDate).toLocaleDateString()}</div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="flex items-center text-sm text-gray-500">
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      Address
                    </div>
                    <div className="font-medium">{userData.address}</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* My Bids Tab - ENHANCED */}
            {activeTab === "bids" && (
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">My Bidding History</h2>
                  
                  {/* Quick stats summary */}
                  <div className="flex gap-3 text-sm">
                    <span className="px-3 py-1 bg-blue-50 text-[#1e3a5f] rounded-full font-medium">
                      Active: {userData.bidStats.activeBids}
                    </span>
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium">
                      Won: {userData.bidStats.wonBids}
                    </span>
                  </div>
                </div>
                
                <div className="bg-[#f0f4f9] border border-[#d0dce9] p-4 rounded-md mb-6 flex items-center">
                  <FontAwesomeIcon icon={faInfoCircle} className="text-[#1e3a5f] mr-3" size="lg" />
                  <p className="text-[#1e3a5f]">You have {userData.bidStats.activeBids} active bids. Stay tuned for auction results!</p>
                </div>
                
                {/* Simplified Professional Filter Section */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-5 bg-white p-3 rounded-lg border shadow-sm">
                  {/* Status filter - styled as tabs */}
                  <div className="flex rounded-md overflow-hidden border border-gray-200 shadow-sm">
                    <button className="px-3 py-1.5 bg-[#1e3a5f] text-white text-sm font-medium">
                      All Bids
                    </button>
                    <button className="px-3 py-1.5 bg-white text-gray-700 hover:bg-gray-50 text-sm border-l transition">
                      Active
                    </button>
                    <button className="px-3 py-1.5 bg-white text-gray-700 hover:bg-gray-50 text-sm border-l transition">
                      Won
                    </button>
                    <button className="px-3 py-1.5 bg-white text-gray-700 hover:bg-gray-50 text-sm border-l transition">
                      Lost
                    </button>
                  </div>
                  
                  {/* Divider */}
                  <div className="h-8 border-l border-gray-300 hidden md:block"></div>
                  
                  {/* Dropdown filters in a cleaner layout */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Date filter */}
                    <div className="relative">
                      <select className="pl-3 pr-8 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-[#1e3a5f] focus:border-[#1e3a5f] bg-white appearance-none">
                        <option value="">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <FontAwesomeIcon icon={faChevronDown} className="text-gray-400" size="xs" />
                      </div>
                    </div>
                    
                    {/* Category filter */}
                    <div className="relative">
                      <select className="pl-3 pr-8 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-[#1e3a5f] focus:border-[#1e3a5f] bg-white appearance-none">
                        <option value="">All Categories</option>
                        <option value="vehicles">Vehicles</option>
                        <option value="jewelry">Jewelry</option>
                        <option value="art">Art & Collectibles</option>
                        <option value="electronics">Electronics</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <FontAwesomeIcon icon={faChevronDown} className="text-gray-400" size="xs" />
                      </div>
                    </div>
                    
                    {/* Sort options */}
                    <div className="relative">
                      <select className="pl-3 pr-8 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-[#1e3a5f] focus:border-[#1e3a5f] bg-white appearance-none">
                        <option>Recent first</option>
                        <option>Oldest first</option>
                        <option>Highest bid</option>
                        <option>Lowest bid</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <FontAwesomeIcon icon={faChevronDown} className="text-gray-400" size="xs" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Search box - pushed to the right */}
                  <div className="relative ml-auto">
                    <input 
                      type="text" 
                      placeholder="Search bids..." 
                      className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-md text-sm w-full focus:ring-[#1e3a5f] focus:border-[#1e3a5f]"
                    />
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-sm" />
                    </div>
                  </div>
                </div>

                {/* View toggle - separate from filters */}
                <div className="flex justify-end mb-4">
                  <div className="flex border rounded-md overflow-hidden shadow-sm">
                    <button 
                      onClick={() => setViewMode('list')}
                      className={`px-3 py-1.5 ${viewMode === 'list' ? 'bg-[#1e3a5f] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} transition`}
                      aria-label="List view"
                    >
                      <FontAwesomeIcon icon={faList} />
                    </button>
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`px-3 py-1.5 ${viewMode === 'grid' ? 'bg-[#1e3a5f] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} transition`}
                      aria-label="Grid view"
                    >
                      <FontAwesomeIcon icon={faThLarge} />
                    </button>
                  </div>
                </div>
                
                {/* Conditional rendering based on view mode */}
                {viewMode === 'list' ? (
                  // List view (table) - your existing table code
                  <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 shadow-sm border rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bid Amount</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ends In</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {bidHistoryData.map(bid => (
                          <tr key={bid.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-12 w-12 rounded-md bg-gray-200 flex-shrink-0 overflow-hidden">
                                  <img src={bid.image} alt={bid.itemName} className="w-full h-full object-cover" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{bid.itemName}</div>
                                  <div className="text-sm text-gray-500">Auction #{bid.auctionId}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {formatCurrency(bid.bidAmount)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {bid.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getBidStatusColor(bid.status)}`}>
                                {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {bid.endsIn}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button className="text-[#1e3a5f] hover:text-[#294b78] hover:bg-blue-50 rounded p-1 transition">
                                  <FontAwesomeIcon icon={faEye} />
                                </button>
                                <button className="text-gray-400 hover:text-gray-500 hover:bg-gray-50 rounded p-1 transition">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  // Grid view (cards)
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {bidHistoryData.map(bid => (
                      <div key={bid.id} className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                        <div className="h-48 bg-gray-100 relative">
                          <img 
                            src={bid.image} 
                            alt={bid.itemName} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                            }}
                          />
                          <div className="absolute top-2 right-2">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full shadow-sm ${getBidStatusColor(bid.status)}`}>
                              {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-gray-900 mb-1">{bid.itemName}</h3>
                          <p className="text-sm text-gray-500 mb-3">Auction #{bid.auctionId}</p>
                          
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Your bid:</span>
                            <span className="font-semibold text-[#1e3a5f]">{formatCurrency(bid.bidAmount)}</span>
                          </div>
                          
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Date:</span>
                            <span className="text-sm">{bid.date}</span>
                          </div>
                          
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-gray-600">Ends in:</span>
                            <span className="text-sm font-medium">{bid.endsIn}</span>
                          </div>
                          
                          <button className="w-full py-2 bg-[#1e3a5f] text-white rounded-md text-sm hover:bg-[#294b78] transition shadow-sm flex items-center justify-center">
                            <FontAwesomeIcon icon={faEye} className="mr-2" />
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Mobile cards are now also conditional based on view mode - used only for list view */}
                {viewMode === 'list' && (
                  <div className="md:hidden space-y-4">
                    {bidHistoryData.map(bid => (
                      <div key={bid.id} className="border rounded-md overflow-hidden hover:shadow-md transition">
                        <div className="flex items-center p-3 border-b bg-gray-50">
                          <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                            <img src={bid.image} alt={bid.itemName} className="w-full h-full object-cover" />
                          </div>
                          <div className="ml-3 flex-grow">
                            <h3 className="font-medium text-gray-900">{bid.itemName}</h3>
                            <p className="text-xs text-gray-500">Auction #{bid.auctionId}</p>
                          </div>
                          <div className={`px-2 py-0.5 text-xs rounded-full ${getBidStatusColor(bid.status)}`}>
                            {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                          </div>
                        </div>
                        <div className="p-3 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500 text-sm">Bid Amount:</span>
                            <span className="font-medium">{formatCurrency(bid.bidAmount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 text-sm">Date:</span>
                            <span>{bid.date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 text-sm">Ends in:</span>
                            <span className="font-medium text-[#1e3a5f]">{bid.endsIn}</span>
                          </div>
                          <div className="mt-3 flex space-x-2">
                            <button className="flex-1 py-1.5 bg-[#1e3a5f] text-white rounded text-sm hover:bg-[#294b78] transition">
                              View Details
                            </button>
                            <button className="py-1.5 px-2 border border-gray-300 text-gray-600 rounded text-sm hover:bg-gray-50 transition">
                              <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Favorites Tab */}
            {activeTab === "favorites" && (
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Saved Items</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Sample saved item card - you would map through actual favorites */}
                  <div className="border rounded-md overflow-hidden hover:shadow-md transition">
                    <div className="h-40 bg-gray-100 relative">
                      <div className="absolute top-2 right-2">
                        <button className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
                          <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">Antique Jewelry Collection</h3>
                      <p className="text-sm text-gray-500 mb-3">Current bid: LKR 250,000.00</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Ends in 2 days</span>
                        <span>5 bids</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden hover:shadow-md transition">
                    <div className="h-40 bg-gray-100 relative">
                      <div className="absolute top-2 right-2">
                        <button className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
                          <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">Rare Stamp Collection</h3>
                      <p className="text-sm text-gray-500 mb-3">Current bid: LKR 75,000.00</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Ends in 5 days</span>
                        <span>12 bids</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden hover:shadow-md transition">
                    <div className="h-40 bg-gray-100 relative">
                      <div className="absolute top-2 right-2">
                        <button className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
                          <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">Bronze Statue</h3>
                      <p className="text-sm text-gray-500 mb-3">Current bid: LKR 420,000.00</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Ends in 1 day</span>
                        <span>8 bids</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === "settings" && renderSettingsTab()}
          </div>
        </div>
      </div>
      
      {/* This is the modal component that should be placed at the end of your return statement, just before the closing tag */}
      {isEditing && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          {/* Overlay with ONLY blur effect - removed background color */}
          <div 
            className="fixed inset-0 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
            onClick={() => setIsEditing(false)}
          ></div>
          
          {/* Modal panel - rest remains the same */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <div 
              className="relative bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-[#1e3a5f] text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
                <h3 className="text-lg font-semibold">Edit Profile</h3>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4">
                  {/* Profile Image */}
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-200 mb-2">
                      <img 
                        src={userData.profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button type="button" className="text-[#1e3a5f] text-sm font-medium hover:underline flex items-center">
                      <FontAwesomeIcon icon={faCamera} className="mr-1" />
                      Change Photo
                    </button>
                  </div>
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={editFormData.fullName || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f]"
                    />
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f]"
                    />
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={editFormData.phone || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f]"
                    />
                  </div>
                  
                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={editFormData.dob || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f]"
                    />
                  </div>
                  
                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      name="address"
                      rows={3}
                      value={editFormData.address || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f]"
                    />
                  </div>
                </div>
                
                {/* Form actions */}
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1e3a5f] border border-transparent rounded-md shadow-sm text-white hover:bg-[#294b78] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e3a5f] font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </>
  );
}