import React, { useState, useEffect } from "react";
import CustomHeader from "../../components/custom-header";
import AppAdminHeader from "../../components/ui/appadmin/appadminheader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as userService from "../../services/userService";
import useAuthStore from "../../components/useAuthStore";
import { 
  faUsers, 
  faClipboardCheck, 
  faUserTie, 
  faEye,
  faCheck, 
  faTimes,
  faSearch,
  faUserPlus,
  faTrash,
  faBan,
  faUnlock,
  faEnvelope,
  faPhone,
  faCalendar,
  faGavel
} from '@fortawesome/free-solid-svg-icons';

export default function AppAdminHome() {
  const [activeTab, setActiveTab] = useState('approvals');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // State for backend data
  const [allUsers, setAllUsers] = useState([]);
  const [bidders, setBidders] = useState([]);
  const [auctionManagers, setAuctionManagers] = useState([]);
  const [yardManagers, setYardManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get JWT token from auth store
  const { jwtToken, role, _hasHydrated } = useAuthStore();

  // Fetch all data on component mount
  useEffect(() => {
    // Wait for hydration to complete
    // if (!_hasHydrated) {
    //   console.log('[App Admin] Waiting for store hydration...');
    //   return;
    // }

    // Check authentication after hydration
    if (!jwtToken) {
      console.error('[App Admin] ❌ No JWT token found. You are NOT logged in.');
      console.error('[App Admin] 👉 Please go to /login and login again to save your JWT token.');
      setError('You are not logged in. Please login to access the App Admin dashboard.');
      setLoading(false);
      return;
    }

    console.log('[App Admin] JWT token found, proceeding to fetch data...');
    console.log('[App Admin] User role:', role);

    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Starting to fetch data from User Service...');
        
        // Fetch all users
        console.log('Fetching all users...');
        const usersData = await userService.getAllUsers();
        console.log('Users data received:', usersData);
        setAllUsers(usersData || []);

        // Fetch bidders
        console.log('Fetching bidders...');
        const biddersData = await userService.getAllBidders();
        console.log('Bidders data received:', biddersData);
        setBidders(biddersData || []);

        // Fetch auction managers
        console.log('Fetching auction managers...');
        const auctionManagersData = await userService.getAllAuctionManagers();
        console.log('Auction managers data received:', auctionManagersData);
        setAuctionManagers(auctionManagersData || []);

        // Fetch yard managers
        console.log('Fetching yard managers...');
        const yardManagersData = await userService.getAllYardManagers();
        console.log('Yard managers data received:', yardManagersData);
        setYardManagers(yardManagersData || []);

        console.log('✅ All data fetched successfully!');
        console.log('📊 Summary:', {
          totalUsers: usersData?.length || 0,
          bidders: biddersData?.length || 0,
          auctionManagers: auctionManagersData?.length || 0,
          yardManagers: yardManagersData?.length || 0,
          pendingApprovals: usersData?.filter(u => u.status === 'PENDING' || u.status === 'INACTIVE').length || 0
        });
      } catch (err) {
        console.error('Error fetching data:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        setError(`Failed to load data: ${err.message || 'Please check if User Service is running on port 8083'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [jwtToken, role, _hasHydrated]);

  // Get pending users from all users (filter by PENDING status)
  const pendingUsers = allUsers.filter(user => user.status === 'PENDING' || user.status === 'INACTIVE');

  // Filter auction managers based on search and filters
  const filteredAuctionManagers = auctionManagers.filter(manager => {
    const matchesSearch = manager.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manager.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manager.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manager.nic?.includes(searchTerm) ||
                         manager.employeeId?.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || manager.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Filter yard managers based on search and filters
  const filteredYardManagers = yardManagers.filter(manager => {
    const matchesSearch = manager.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manager.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manager.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manager.nic?.includes(searchTerm) ||
                         manager.employeeId?.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || manager.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Filter users based on search and filters
  const filteredUsers = bidders.filter(user => {
    const matchesSearch = user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.nic?.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Pagination for auction managers
  const indexOfLastAuctionManager = currentPage * itemsPerPage;
  const indexOfFirstAuctionManager = indexOfLastAuctionManager - itemsPerPage;
  const currentAuctionManagers = filteredAuctionManagers.slice(indexOfFirstAuctionManager, indexOfLastAuctionManager);
  const totalAuctionManagerPages = Math.ceil(filteredAuctionManagers.length / itemsPerPage);

  // Pagination for yard managers
  const indexOfLastYardManager = currentPage * itemsPerPage;
  const indexOfFirstYardManager = indexOfLastYardManager - itemsPerPage;
  const currentYardManagers = filteredYardManagers.slice(indexOfFirstYardManager, indexOfLastYardManager);
  const totalYardManagerPages = Math.ceil(filteredYardManagers.length / itemsPerPage);

  const handleStatusChange = (userId, newStatus) => {
    // Handle status change logic here
    console.log(`Changing status for user ${userId} to ${newStatus}`);
  };

  const handleUserEdit = (userId) => {
    // Handle user edit logic here
    console.log(`Editing user ${userId}`);
  };

  const handleUserDelete = (userId) => {
    // Handle user delete logic here
    console.log(`Deleting user ${userId}`);
  };

  const handleManagerStatusChange = (managerId, newStatus) => {
    // Handle manager status change logic here
    console.log(`Changing status for manager ${managerId} to ${newStatus}`);
  };

  // Analytics data with real counts
  const stats = [
    {
      title: "Total Users",
      value: allUsers.length.toString(),
      change: "All registered users",
      icon: faUsers,
      color: "bg-blue-500"
    },
    {
      title: "Total Bidders",
      value: bidders.length.toString(),
      change: "Active bidders",
      icon: faClipboardCheck,
      color: "bg-orange-500"
    },
    {
      title: "Auction Managers",
      value: auctionManagers.length.toString(),
      change: `Active: ${auctionManagers.filter(m => m.status === 'ACTIVE').length}`,
      icon: faUserTie,
      color: "bg-green-500"
    },
    {
      title: "Yard Managers",
      value: yardManagers.length.toString(),
      change: `Active: ${yardManagers.filter(m => m.status === 'ACTIVE').length}`,
      icon: faGavel,
      color: "bg-purple-500"
    },
  ];

  const tabItems = [
    {/* id: 'approvals', label: 'User Approvals', count: pendingUsers.length */},
    { id: 'users', label: 'Bidders', count: bidders.length },
    { id: 'auctionManagers', label: 'Auction Managers', count: auctionManagers.length },
    { id: 'yardManagers', label: 'Inventory Managers', count: yardManagers.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomHeader />
      <AppAdminHeader />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Global Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-red-800">{error}</p>
                <p className="text-xs text-red-600 mt-1">Please login to access this page</p>
              </div>
              <div className="ml-4">
                <button
                  onClick={() => window.location.href = '/login'}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Go to Login
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Global Loading Display */}
        {loading && (
          <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-800">Loading data from User Service (port 8083)...</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#1e3a5f]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} rounded-full p-3`}>
                  <FontAwesomeIcon icon={stat.icon} className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabItems.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-[#1e3a5f] text-[#1e3a5f]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className={`ml-2 text-xs font-medium px-2 py-1 rounded-full ${
                      tab.id === 'approvals' 
                        ? 'bg-red-100 text-red-600' 
                        : tab.id === 'users'
                        ? 'bg-orange-100 text-orange-600'
                        : tab.id === 'auctionManagers'
                        ? 'bg-green-100 text-green-600'
                        : tab.id === 'yardManagers'
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'approvals' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Pending User Approvals
                  </h3>
                  <p className="text-sm text-gray-600">
                    Review and approve new user registrations
                  </p>
                </div>

                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-8 text-gray-500">
                      Loading pending approvals...
                    </div>
                  ) : error ? (
                    <div className="text-center py-8 text-red-500">
                      {error}
                    </div>
                  ) : pendingUsers.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No pending approvals at this time
                    </div>
                  ) : (
                    pendingUsers.map((user) => (
                    <div key={user.userId} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {`${user.firstName || ''} ${user.lastName || ''}`}
                          </h4>
                          <p className="text-sm text-gray-600">{user.email || 'N/A'} • {user.phoneNumber || 'N/A'}</p>
                          <p className="text-sm text-gray-600">NIC: {user.nic || 'N/A'}</p>
                          <div className="flex items-center mt-2 space-x-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.role === 'Bidder' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {user.role || 'User'}
                            </span>
                            <span className="text-xs text-gray-500">
                              Registered: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                            </span>
                            <span className={`text-xs font-semibold ${
                              user.status === 'PENDING' ? 'text-orange-600' : 'text-gray-600'
                            }`}>
                              Status: {user.status || 'N/A'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleUserEdit(user.userId)}
                            className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors"
                          >
                            <FontAwesomeIcon icon={faEye} className="mr-1" />
                            Review
                          </button>
                          <button 
                            onClick={() => handleStatusChange(user.userId, 'ACTIVE')}
                            className="bg-green-50 text-green-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-green-100 transition-colors"
                          >
                            <FontAwesomeIcon icon={faCheck} className="mr-1" />
                            Approve
                          </button>
                          <button 
                            onClick={() => handleStatusChange(user.userId, 'SUSPENDED')}
                            className="bg-red-50 text-red-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-100 transition-colors"
                          >
                            <FontAwesomeIcon icon={faTimes} className="mr-1" />
                            Reject
                          </button>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-2">User Information:</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="bg-gray-50 p-2 rounded">
                            <span className="font-medium text-gray-700">Email:</span> {user.email || 'N/A'}
                          </div>
                          <div className="bg-gray-50 p-2 rounded">
                            <span className="font-medium text-gray-700">Phone:</span> {user.phoneNumber || 'N/A'}
                          </div>
                          <div className="bg-gray-50 p-2 rounded">
                            <span className="font-medium text-gray-700">NIC:</span> {user.nic || 'N/A'}
                          </div>
                          <div className="bg-gray-50 p-2 rounded">
                            <span className="font-medium text-gray-700">Role:</span> {user.role || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )))}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Bidders Management
                  </h3>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search bidders by name, email, or NIC..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                      <option value="SUSPENDED">Suspended</option>
                    </select>

                  </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Activity
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                              Loading data...
                            </td>
                          </tr>
                        ) : error ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-4 text-center text-red-500">
                              {error}
                            </td>
                          </tr>
                        ) : currentUsers.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                              No users found
                            </td>
                          </tr>
                        ) : (
                          currentUsers.map((user) => (
                          <tr key={user.userId} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-[#1e3a5f] flex items-center justify-center">
                                  <span className="text-white font-medium text-sm">
                                    {`${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {`${user.firstName || ''} ${user.lastName || ''}`}
                                  </div>
                                  <div className="text-sm text-gray-500">NIC: {user.nic || 'N/A'}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                <div className="flex items-center mb-1">
                                  <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-400" />
                                  {user.email || 'N/A'}
                                </div>
                                <div className="flex items-center">
                                  <FontAwesomeIcon icon={faPhone} className="mr-2 text-gray-400" />
                                  {user.phoneNumber || 'N/A'}
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                user.status === 'SUSPENDED' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {user.status || 'N/A'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center mb-1">
                                Registered: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                              </div>
                              <div>Role: {user.role || 'Bidder'}</div>
                            </td>
                          </tr>
                        )))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing{' '}
                          <span className="font-medium">{indexOfFirstUser + 1}</span>
                          {' '}to{' '}
                          <span className="font-medium">
                            {Math.min(indexOfLastUser, filteredUsers.length)}
                          </span>
                          {' '}of{' '}
                          <span className="font-medium">{filteredUsers.length}</span>
                          {' '}results
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                          >
                            Previous
                          </button>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                page === currentPage
                                  ? 'z-10 bg-[#1e3a5f] border-[#1e3a5f] text-white'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                          <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                          >
                            Next
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'auctionManagers' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Auction Managers Management
                  </h3>
                  {/*<button className="bg-[#1e3a5f] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1e3a5f]/90 transition-colors">
                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                    Add New Auction Manager
                  </button>*/}
                </div>

                {/* Search and Filter Section */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search auction managers by name, email, or Employee ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="ACTIVE">Active</option>
                      <option value="SUSPENDED">Suspended</option>
                    </select>

                  </div>
                </div>

                {/* Auction Managers Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {loading ? (
                    <div className="col-span-2 text-center py-8 text-gray-500">
                      Loading auction managers...
                    </div>
                  ) : error ? (
                    <div className="col-span-2 text-center py-8 text-red-500">
                      {error}
                    </div>
                  ) : currentAuctionManagers.length === 0 ? (
                    <div className="col-span-2 text-center py-8 text-gray-500">
                      No auction managers found
                    </div>
                  ) : (
                    currentAuctionManagers.map((manager) => (
                    <div key={manager.userId || manager.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
                      <div className="p-6">
                        {/* Manager Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="h-16 w-16 rounded-full bg-[#1e3a5f] flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {`${manager.firstName?.[0] || ''}${manager.lastName?.[0] || ''}`}
                              </span>
                            </div>
                            <div className="ml-4">
                              <h4 className="text-lg font-semibold text-gray-900">
                                {`${manager.firstName || ''} ${manager.lastName || ''}`}
                              </h4>
                              <p className="text-sm text-blue-700 bg-blue-100 rounded-lg py-1/2 px-1 center my-1">
                                {manager.role || 'Auction Manager'}
                              </p>
                              <p className="text-sm text-gray-500">
                                Employee ID: {manager.employeeId || manager.userId || 'N/A'}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                              manager.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {manager.status || 'N/A'}
                            </span>
                          </div>
                        </div>

                        {/* Contact Information */}
                        <div className="mb-4 space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-400" />
                            {manager.email || 'N/A'}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <FontAwesomeIcon icon={faPhone} className="mr-2 text-gray-400" />
                            {manager.phoneNumber || 'N/A'}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <FontAwesomeIcon icon={faCalendar} className="mr-2 text-gray-400" />
                            Registered: {manager.createdAt ? new Date(manager.createdAt).toLocaleDateString() : 'N/A'}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            NIC: {manager.nic || 'N/A'}
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="text-sm text-blue-600 font-medium">Role</div>
                            <div className="text-lg font-bold text-blue-900">{manager.role || 'N/A'}</div>
                          </div>
     
                          <div className="bg-purple-50 rounded-lg p-3">
                            <div className="text-sm text-purple-600 font-medium">Department</div>
                            <div className="text-lg font-bold text-purple-900">{manager.department || 'N/A'}</div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                          {manager.status === 'ACTIVE' ? (
                            <button
                              onClick={() => handleManagerStatusChange(manager.userId || manager.id, 'SUSPENDED')}
                              className="flex items-center px-3 py-1 bg-red-50 text-red-600 rounded-md text-sm font-medium hover:bg-red-100 transition-colors"
                            >
                              <FontAwesomeIcon icon={faBan} className="mr-1" />
                              Suspend
                            </button>
                          ) : manager.status === 'SUSPENDED' ? (
                            <button
                              onClick={() => handleManagerStatusChange(manager.userId || manager.id, 'ACTIVE')}
                              className="flex items-center px-3 py-1 bg-green-50 text-green-600 rounded-md text-sm font-medium hover:bg-green-100 transition-colors"
                            >
                              <FontAwesomeIcon icon={faUnlock} className="mr-1" />
                              Activate
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  )))}
                </div>

                {/* Pagination */}
                {filteredAuctionManagers.length > itemsPerPage && (
                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalAuctionManagerPages))}
                        disabled={currentPage === totalAuctionManagerPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing{' '}
                          <span className="font-medium">{indexOfFirstAuctionManager + 1}</span>
                          {' '}to{' '}
                          <span className="font-medium">
                            {Math.min(indexOfLastAuctionManager, filteredAuctionManagers.length)}
                          </span>
                          {' '}of{' '}
                          <span className="font-medium">{filteredAuctionManagers.length}</span>
                          {' '}results
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                          >
                            Previous
                          </button>
                          {Array.from({ length: totalAuctionManagerPages }, (_, i) => i + 1).map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                page === currentPage
                                  ? 'z-10 bg-[#1e3a5f] border-[#1e3a5f] text-white'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                          <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalAuctionManagerPages))}
                            disabled={currentPage === totalAuctionManagerPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                          >
                            Next
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'yardManagers' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Inventory Managers Management
                  </h3>
                  {/*<button className="bg-[#1e3a5f] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1e3a5f]/90 transition-colors">
                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                    Add New Yard Manager
                  </button>*/}
                </div>

                {/* Search and Filter Section */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search Inventory managers by name, email, or Employee ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="ACTIVE">Active</option>
                      <option value="SUSPENDED">Suspended</option>
                    </select>

                  </div>
                </div>

                {/* Yard Managers Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {loading ? (
                    <div className="col-span-2 text-center py-8 text-gray-500">
                      Loading Inventory managers...
                    </div>
                  ) : error ? (
                    <div className="col-span-2 text-center py-8 text-red-500">
                      {error}
                    </div>
                  ) : currentYardManagers.length === 0 ? (
                    <div className="col-span-2 text-center py-8 text-gray-500">
                      No Inventory managers found
                    </div>
                  ) : (
                    currentYardManagers.map((manager) => (
                    <div key={manager.userId || manager.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
                      <div className="p-6">
                        {/* Manager Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="h-16 w-16 rounded-full bg-purple-600 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {`${manager.firstName?.[0] || ''}${manager.lastName?.[0] || ''}`}
                              </span>
                            </div>
                            <div className="ml-4">
                              <h4 className="text-lg font-semibold text-gray-900">
                                {`${manager.firstName || ''} ${manager.lastName || ''}`}
                              </h4>
                              <p className="text-sm text-purple-700 bg-purple-100 rounded-lg py-1/2 px-1 center my-1">
                                {manager.role || 'Yard Manager'}
                              </p>
                              <p className="text-sm text-gray-500">
                                Employee ID: {manager.employeeId || manager.userId || 'N/A'}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                              manager.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {manager.status || 'N/A'}
                            </span>
                          </div>
                        </div>

                        {/* Contact Information */}
                        <div className="mb-4 space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-400" />
                            {manager.email || 'N/A'}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <FontAwesomeIcon icon={faPhone} className="mr-2 text-gray-400" />
                            {manager.phoneNumber || 'N/A'}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <FontAwesomeIcon icon={faCalendar} className="mr-2 text-gray-400" />
                            Registered: {manager.createdAt ? new Date(manager.createdAt).toLocaleDateString() : 'N/A'}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            NIC: {manager.nic || 'N/A'}
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="text-sm text-blue-600 font-medium">Role</div>
                            <div className="text-lg font-bold text-blue-900">{manager.role || 'N/A'}</div>
                          </div>
     
                          <div className="bg-purple-50 rounded-lg p-3">
                            <div className="text-sm text-purple-600 font-medium">Department</div>
                            <div className="text-lg font-bold text-purple-900">{manager.department || 'N/A'}</div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                          {manager.status === 'ACTIVE' ? (
                            <button
                              onClick={() => handleManagerStatusChange(manager.userId || manager.id, 'SUSPENDED')}
                              className="flex items-center px-3 py-1 bg-red-50 text-red-600 rounded-md text-sm font-medium hover:bg-red-100 transition-colors"
                            >
                              <FontAwesomeIcon icon={faBan} className="mr-1" />
                              Suspend
                            </button>
                          ) : manager.status === 'SUSPENDED' ? (
                            <button
                              onClick={() => handleManagerStatusChange(manager.userId || manager.id, 'ACTIVE')}
                              className="flex items-center px-3 py-1 bg-green-50 text-green-600 rounded-md text-sm font-medium hover:bg-green-100 transition-colors"
                            >
                              <FontAwesomeIcon icon={faUnlock} className="mr-1" />
                              Activate
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  )))}
                </div>

                {/* Pagination */}
                {filteredYardManagers.length > itemsPerPage && (
                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalYardManagerPages))}
                        disabled={currentPage === totalYardManagerPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing{' '}
                          <span className="font-medium">{indexOfFirstYardManager + 1}</span>
                          {' '}to{' '}
                          <span className="font-medium">
                            {Math.min(indexOfLastYardManager, filteredYardManagers.length)}
                          </span>
                          {' '}of{' '}
                          <span className="font-medium">{filteredYardManagers.length}</span>
                          {' '}results
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                          >
                            Previous
                          </button>
                          {Array.from({ length: totalYardManagerPages }, (_, i) => i + 1).map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                page === currentPage
                                  ? 'z-10 bg-[#1e3a5f] border-[#1e3a5f] text-white'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                          <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalYardManagerPages))}
                            disabled={currentPage === totalYardManagerPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                          >
                            Next
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
