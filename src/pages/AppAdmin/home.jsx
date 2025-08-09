import React, { useState } from "react";
import CustomHeader from "../../components/custom-header";
import AppAdminHeader from "../../components/ui/appadmin/appadminheader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faClipboardCheck, 
  faUserTie, 
  faEye, 
  faCheck, 
  faTimes,
  faChartLine,
  faCog,
  faSearch,
  faUserPlus,
  faEdit,
  faTrash,
  faBan,
  faUnlock,
  faEnvelope,
  faPhone,
  faCalendar,
  faShield,
  faGavel,
  faChartBar,
  faChartPie,
  faArrowUp,
  faArrowDown,
  faMoneyBillWave,
  faClock,
  faMapMarkerAlt,
  faFileAlt,
  faPercent,
  faSync
} from '@fortawesome/free-solid-svg-icons';

export default function AppAdminHome() {
  const [activeTab, setActiveTab] = useState('approvals');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sample data for pending approvals
  const pendingUsers = [
    {
      id: 1,
      name: "Kamal Perera",
      email: "kamal.perera@email.com",
      phone: "+94771234567",
      nic: "199012345678",
      type: "Bidder",
      registeredDate: "2024-02-10",
      verificationScore: 85,
      documents: ["NIC Copy", "User Image"]
    },
    {
      id: 2,
      name: "Saman Silva",
      email: "saman.silva@company.lk",
      phone: "+94712345678",
      nic: "198512345679",
      type: "Bidder",
      registeredDate: "2024-02-09",
      verificationScore: 92,
      documents: ["NIC Copy", "User Image"]
    },
      {
      id: 3,
      name: "Akila De Silva",
      email: "Akila.silva@gmail.com",
      phone: "+94712342378",
      nic: "198312345679",
      type: "Bidder",
      registeredDate: "2024-01-19",
      verificationScore: 92,
      documents: ["NIC Copy", "User Image"]
    },
        {
      id: 4,
      name: "Samani S Dharmawardena",
      email: "saman.dharma@slt.lk",
      phone: "+94712345678",
      nic: "198512345679",
      type: "Bidder",
      registeredDate: "2024-12-19",
      verificationScore: 92,
      documents: ["NIC Copy", "User Image"]
    },

  ];

  // Sample data for system users
  const systemUsers = [
    {
      id: 1,
      name: "Kamal Perera",
      email: "kamal.perera@email.com",
      phone: "+94771234567",
      nic: "199012345678",
      role: "Bidder",
      status: "Active",
      joinDate: "2024-01-15",
      lastLogin: "2024-02-10 10:30 AM",
      totalBids: 23,
      winRate: "68%",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      name: "Saman Silva",
      email: "saman.silva@company.lk",
      phone: "+94712345678",
      nic: "198512345679",
      role: "Bidder",
      status: "Active",
      joinDate: "2024-01-08",
      lastLogin: "2024-02-09 02:15 PM",
      totalBids: 45,
      winRate: "72%",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 3,
      name: "Nimal Fernando",
      email: "nimal.fernando@customs.gov.lk",
      phone: "+94723456789",
      nic: "198012345680",
      role: "Auction Manager",
      status: "Active",
      joinDate: "2023-12-20",
      lastLogin: "2024-02-10 09:45 AM",
      totalBids: 0,
      winRate: "N/A",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 4,
      name: "Ruwan Jayasinghe",
      email: "ruwan.jayasinghe@email.com",
      phone: "+94751234567",
      nic: "199512345681",
      role: "Bidder",
      status: "Suspended",
      joinDate: "2024-01-25",
      lastLogin: "2024-02-05 11:20 AM",
      totalBids: 12,
      winRate: "41%",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 5,
      name: "Priyanka Wickremasinghe",
      email: "priyanka.w@customs.gov.lk",
      phone: "+94771234890",
      nic: "198712345682",
      role: "Super Admin",
      status: "Active",
      joinDate: "2023-11-10",
      lastLogin: "2024-02-10 08:15 AM",
      totalBids: 0,
      winRate: "N/A",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 6,
      name: "Chaminda Perera",
      email: "chaminda.perera@email.com",
      phone: "+94762345678",
      nic: "199212345683",
      role: "Bidder",
      status: "Inactive",
      joinDate: "2024-01-30",
      lastLogin: "2024-01-31 04:30 PM",
      totalBids: 8,
      winRate: "25%",
      avatar: "/api/placeholder/40/40"
    }
  ];

  // Sample data for auction managers
  const auctionManagers = [
    {
      id: 1,
      name: "Nimal Fernando",
      email: "nimal.fernando@customs.gov.lk",
      phone: "+94723456789",
      nic: "198012345680",
      empId: "EMP001",
      department: "Customs Administration",
      position: "Auction Manager",
      status: "Active",
      joinDate: "2023-12-20",
      lastLogin: "2024-02-10 09:45 AM",
      totalAuctions: 45,
      activeAuctions: 8,
      completedAuctions: 37,
      totalRevenue: "LKR 15,500,000",
      averageParticipants: 23,
      successRate: "89%",
      permissions: ["Create Auctions", "Manage Items", "View Reports", "User Management"],
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      name: "Sunil Rajapaksha",
      email: "sunil.rajapaksha@customs.gov.lk",
      phone: "+94712345890",
      nic: "197512345681",
      empId: "EMP002",
      department: "Customs Administration",
      position: "Inventory Manager",
      status: "Active",
      joinDate: "2024-01-05",
      lastLogin: "2024-02-10 11:20 AM",
      totalAuctions: 28,
      activeAuctions: 5,
      completedAuctions: 23,
      totalRevenue: "LKR 8,750,000",
      averageParticipants: 18,
      successRate: "82%",
      permissions: ["Create Auctions", "Manage Items", "View Reports"],
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 3,
      name: "Kumari Dissanayake",
      email: "kumari.dissanayake@customs.gov.lk",
      phone: "+94751234567",
      nic: "198212345682",
      empId: "EMP003",
      department: "Customs Administration",
      position: "Auction Manager",
      status: "Active",
      joinDate: "2024-01-15",
      lastLogin: "2024-02-09 04:30 PM",
      totalAuctions: 15,
      activeAuctions: 3,
      completedAuctions: 12,
      totalRevenue: "LKR 4,200,000",
      averageParticipants: 15,
      successRate: "78%",
      permissions: ["Create Auctions", "Manage Items"],
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 5,
      name: "Chaminda Silva",
      email: "chaminda.silva@customs.gov.lk",
      phone: "+94771234890",
      nic: "199012345684",
      empId: "EMP005",
      department: "Customs Administration",
      position: "Inventory Manager",
      status: "Suspended",
      joinDate: "2023-10-10",
      lastLogin: "2024-01-28 03:45 PM",
      totalAuctions: 38,
      activeAuctions: 0,
      completedAuctions: 38,
      totalRevenue: "LKR 13,800,000",
      averageParticipants: 22,
      successRate: "91%",
      permissions: ["Create Auctions", "Manage Items", "View Reports", "User Management"],
      avatar: "/api/placeholder/40/40"
    }
  ];

  // Filter managers based on search and filters
  const filteredManagers = auctionManagers.filter(manager => {
    const matchesSearch = manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manager.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manager.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manager.nic.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || manager.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Filter users based on search and filters
  const filteredUsers = systemUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.nic.includes(searchTerm);
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Pagination for managers
  const indexOfLastManager = currentPage * itemsPerPage;
  const indexOfFirstManager = indexOfLastManager - itemsPerPage;
  const currentManagers = filteredManagers.slice(indexOfFirstManager, indexOfLastManager);
  const totalManagerPages = Math.ceil(filteredManagers.length / itemsPerPage);

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

  const handleManagerEdit = (managerId) => {
    // Handle manager edit logic here
    console.log(`Editing manager ${managerId}`);
  };

  const handleManagerDelete = (managerId) => {
    // Handle manager delete logic here
    console.log(`Deleting manager ${managerId}`);
  };

  const handlePermissionChange = (managerId, permissions) => {
    // Handle permission change logic here
    console.log(`Changing permissions for manager ${managerId}`, permissions);
  };

  // Analytics data
  const analyticsData = {
    overview: {
      totalUsers: { value: 2847, change: 12, trend: 'up' },
      totalAuctions: { value: 342, change: 8, trend: 'up' },
      totalRevenue: { value: 'LKR 125,000,000', change: 15, trend: 'up' },
      activeUsers: { value: 2340, change: -2, trend: 'down' },
      avgAuctionValue: { value: 'LKR 365,000', change: 5, trend: 'up' },
      completionRate: { value: '94.5%', change: 3, trend: 'up' }
    },
    userGrowth: [
      { month: 'Jan', users: 1200, registrations: 45 },
      { month: 'Feb', users: 1450, registrations: 52 },
      { month: 'Mar', users: 1680, registrations: 48 },
      { month: 'Apr', users: 1920, registrations: 65 },
      { month: 'May', users: 2180, registrations: 58 },
      { month: 'Jun', users: 2420, registrations: 62 },
      { month: 'Jul', users: 2847, registrations: 71 }
    ],
    auctionPerformance: [
      { month: 'Jan', auctions: 28, revenue: 8500000 },
      { month: 'Feb', auctions: 32, revenue: 9200000 },
      { month: 'Mar', auctions: 35, revenue: 10800000 },
      { month: 'Apr', auctions: 41, revenue: 12400000 },
      { month: 'May', auctions: 38, revenue: 11900000 },
      { month: 'Jun', auctions: 45, revenue: 13800000 },
      { month: 'Jul', auctions: 52, revenue: 15200000 }
    ],
    topCategories: [
      { category: 'Electronics', count: 89, percentage: 26 },
      { category: 'Vehicles', count: 76, percentage: 22 },
      { category: 'Jewelry', count: 54, percentage: 16 },
      { category: 'Art & Antiques', count: 45, percentage: 13 },
      { category: 'Industrial Equipment', count: 38, percentage: 11 },
      { category: 'Others', count: 40, percentage: 12 }
    ],
    locationStats: [
      { location: 'Colombo', users: 1245, percentage: 44 },
      { location: 'Gampaha', users: 456, percentage: 16 },
      { location: 'Kalutara', users: 298, percentage: 10 },
      { location: 'Kandy', users: 267, percentage: 9 },
      { location: 'Galle', users: 189, percentage: 7 },
      { location: 'Others', users: 392, percentage: 14 }
    ],
    recentActivity: [
      { type: 'auction_completed', title: 'Auction #A-2024-089 completed', time: '2 hours ago', value: 'LKR 2,450,000' },
      { type: 'user_registered', title: 'New user registered: Kamal Perera', time: '3 hours ago', value: 'Bidder' },
      { type: 'auction_started', title: 'Auction #A-2024-090 started', time: '4 hours ago', value: 'Electronics' },
      { type: 'payment_received', title: 'Payment received for Auction #A-2024-087', time: '5 hours ago', value: 'LKR 1,850,000' },
      { type: 'user_verified', title: 'User verification completed: Saman Silva', time: '6 hours ago', value: 'Verified' }
    ]
  };

  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12% this month",
      icon: faUsers,
      color: "bg-blue-500"
    },
    {
      title: "Pending Approvals",
      value: "23",
      change: "Requires attention",
      icon: faClipboardCheck,
      color: "bg-orange-500"
    },
    {
      title: "Active Managers",
      value: "12",
      change: "Online now: 8",
      icon: faUserTie,
      color: "bg-green-500"
    },
  ];

  const quickStats = [
    { label: "Active Bidders", value: "2,340" },
    { label: "Today's Logins", value: "456" },
    { label: "Blocked Users", value: "15" }
  ];

  const tabItems = [
    { id: 'approvals', label: 'User Approvals', count: systemUsers.length },
    { id: 'users', label: 'Biddders' },
    { id: 'managers', label: 'System Users' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomHeader />
      <AppAdminHeader />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

        {/* Quick Stats Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {quickStats.map((item, index) => (
              <div key={index} className="text-center p-4 border-r border-gray-200 last:border-r-0">
                <div className="text-2xl font-bold text-[#1e3a5f]">{item.value}</div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
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
                  {tab.count && (
                    <span className="ml-2 bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
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
                  {pendingUsers.map((user) => (
                    <div key={user.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email} • {user.phone}</p>
                          <p className="text-sm text-gray-600">NIC: {user.nic}</p>
                          <div className="flex items-center mt-2 space-x-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.type === 'Bidder' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {user.type}
                            </span>
                            <span className="text-xs text-gray-500">
                              Registered: {user.registeredDate}
                            </span>
                            <span className="text-xs text-gray-500">
                              Verification Score: {user.verificationScore}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors">
                            <FontAwesomeIcon icon={faEye} className="mr-1" />
                            Review
                          </button>
                          <button className="bg-green-50 text-green-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-green-100 transition-colors">
                            <FontAwesomeIcon icon={faCheck} className="mr-1" />
                            Approve
                          </button>
                          <button className="bg-red-50 text-red-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-100 transition-colors">
                            <FontAwesomeIcon icon={faTimes} className="mr-1" />
                            Reject
                          </button>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-2">Submitted Documents:</p>
                        <div className="flex flex-wrap gap-2">
                          {user.documents.map((doc, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    System Users Management
                  </h3>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search users by name, email, or NIC..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                      />
                    </div>
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                    >
                      <option value="all">All Roles</option>
                      <option value="Bidder">Bidder</option>
                      <option value="Auction Manager">Auction Manager</option>
                      <option value="Super Admin"> Admin</option>
                    </select>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Suspended">Suspended</option>
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
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-[#1e3a5f] flex items-center justify-center">
                                  <span className="text-white font-medium text-sm">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                  <div className="text-sm text-gray-500">NIC: {user.nic}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                <div className="flex items-center mb-1">
                                  <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-400" />
                                  {user.email}
                                </div>
                                <div className="flex items-center">
                                  <FontAwesomeIcon icon={faPhone} className="mr-2 text-gray-400" />
                                  {user.phone}
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                user.status === 'Active' ? 'bg-green-100 text-green-800' :
                                user.status === 'Suspended' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center mb-1">
                                Joined: {user.joinDate}
                              </div>
                              <div>Last Login: {user.lastLogin}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleUserEdit(user.id)}
                                  className="text-blue-600 hover:text-blue-900 transition-colors"
                                  title="Edit User"
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                  onClick={() => handleUserEdit(user.id)}
                                  className="text-green-600 hover:text-green-900 transition-colors"
                                  title="View Details"
                                >
                                  <FontAwesomeIcon icon={faEye} />
                                </button>
                                {user.status === 'Active' ? (
                                  <button
                                    onClick={() => handleStatusChange(user.id, 'Suspended')}
                                    className="text-red-600 hover:text-red-900 transition-colors"
                                    title="Suspend User"
                                  >
                                    <FontAwesomeIcon icon={faBan} />
                                  </button>
                                ) : user.status === 'Suspended' ? (
                                  <button
                                    onClick={() => handleStatusChange(user.id, 'Active')}
                                    className="text-green-600 hover:text-green-900 transition-colors"
                                    title="Activate User"
                                  >
                                    <FontAwesomeIcon icon={faUnlock} />
                                  </button>
                                ) : null}
                                <button
                                  onClick={() => handleUserDelete(user.id)}
                                  className="text-red-600 hover:text-red-900 transition-colors"
                                  title="Delete User"
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
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

            {activeTab === 'managers' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Auction Managers Management
                  </h3>
                  <button className="bg-[#1e3a5f] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1e3a5f]/90 transition-colors">
                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                    Add New Manager
                  </button>
                </div>

                {/* Manager Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Managers</p>
                        <p className="text-2xl font-bold text-gray-900">{auctionManagers.filter(m => m.status === 'Active').length}</p>
                      </div>
                      <FontAwesomeIcon icon={faUserTie} className="h-8 w-8 text-green-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Auctions</p>
                        <p className="text-2xl font-bold text-gray-900">{auctionManagers.reduce((sum, m) => sum + m.totalAuctions, 0)}</p>
                      </div>
                      <FontAwesomeIcon icon={faGavel} className="h-8 w-8 text-blue-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Auctions</p>
                        <p className="text-2xl font-bold text-gray-900">{auctionManagers.reduce((sum, m) => sum + m.activeAuctions, 0)}</p>
                      </div>
                      <FontAwesomeIcon icon={faChartLine} className="h-8 w-8 text-purple-500" />
                    </div>
                  </div>

                </div>

                {/* Search and Filter Section */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search managers by name, email, or Employee ID..."
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
                      <option value="Active">Active</option>
                      <option value="Suspended">Suspended</option>
                    </select>

                  </div>
                </div>

                {/* Managers Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {currentManagers.map((manager) => (
                    <div key={manager.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
                      <div className="p-6">
                        {/* Manager Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="h-16 w-16 rounded-full bg-[#1e3a5f] flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {manager.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="ml-4">
                              <h4 className="text-lg font-semibold text-gray-900">{manager.name}</h4>
                              <p className="text-sm text-blue-700 bg-blue-100 rounded-lg py-1/2 px-1 center my-1">{manager.position}</p>
                              <p className="text-sm text-gray-500">Employee ID: {manager.empId}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                              manager.status === 'Active' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {manager.status}
                            </span>
                          </div>
                        </div>

                        {/* Contact Information */}
                        <div className="mb-4 space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-400" />
                            {manager.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <FontAwesomeIcon icon={faPhone} className="mr-2 text-gray-400" />
                            {manager.phone}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <FontAwesomeIcon icon={faCalendar} className="mr-2 text-gray-400" />
                            Joined: {manager.joinDate}
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="text-sm text-blue-600 font-medium">Total Auctions</div>
                            <div className="text-2xl font-bold text-blue-900">{manager.totalAuctions}</div>
                          </div>
     
                          <div className="bg-purple-50 rounded-lg p-3">
                            <div className="text-sm text-purple-600 font-medium">Active Auctions</div>
                            <div className="text-2xl font-bold text-purple-900">{manager.activeAuctions}</div>
                          </div>
                        </div>

                        {/* Revenue Information */}

                        {/* Permissions
                        <div className="mb-4">
                          <div className="text-sm text-gray-600 font-medium mb-2">Permissions</div>
                          <div className="flex flex-wrap gap-2">
                            {manager.permissions.map((permission, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {permission}
                              </span>
                            ))}
                          </div>
                        </div> */}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                          <button
                            onClick={() => handleManagerEdit(manager.id)}
                            className="flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors"
                          >
                            <FontAwesomeIcon icon={faEdit} className="mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleManagerEdit(manager.id)}
                            className="flex items-center px-3 py-1 bg-green-50 text-green-600 rounded-md text-sm font-medium hover:bg-green-100 transition-colors"
                          >
                            <FontAwesomeIcon icon={faEye} className="mr-1" />
                            View Details
                          </button>
                          {manager.status === 'Active' ? (
                            <button
                              onClick={() => handleManagerStatusChange(manager.id, 'Suspended')}
                              className="flex items-center px-3 py-1 bg-red-50 text-red-600 rounded-md text-sm font-medium hover:bg-red-100 transition-colors"
                            >
                              <FontAwesomeIcon icon={faBan} className="mr-1" />
                              Suspend
                            </button>
                          ) : manager.status === 'Suspended' ? (
                            <button
                              onClick={() => handleManagerStatusChange(manager.id, 'Active')}
                              className="flex items-center px-3 py-1 bg-green-50 text-green-600 rounded-md text-sm font-medium hover:bg-green-100 transition-colors"
                            >
                              <FontAwesomeIcon icon={faUnlock} className="mr-1" />
                              Activate
                            </button>
                          ) : null}
                          {/* <button
                            onClick={() => handlePermissionChange(manager.id, manager.permissions)}
                            className="flex items-center px-3 py-1 bg-purple-50 text-purple-600 rounded-md text-sm font-medium hover:bg-purple-100 transition-colors"
                          >
                            <FontAwesomeIcon icon={faShield} className="mr-1" />
                            Permissions
                          </button> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {filteredManagers.length > itemsPerPage && (
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
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalManagerPages))}
                        disabled={currentPage === totalManagerPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing{' '}
                          <span className="font-medium">{indexOfFirstManager + 1}</span>
                          {' '}to{' '}
                          <span className="font-medium">
                            {Math.min(indexOfLastManager, filteredManagers.length)}
                          </span>
                          {' '}of{' '}
                          <span className="font-medium">{filteredManagers.length}</span>
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
                          {Array.from({ length: totalManagerPages }, (_, i) => i + 1).map((page) => (
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
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalManagerPages))}
                            disabled={currentPage === totalManagerPages}
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

            {activeTab === 'analytics' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    System Analytics & Performance
                  </h3>
                  <div className="flex space-x-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent">
                      <option>Last 30 days</option>
                      <option>Last 3 months</option>
                      <option>Last 6 months</option>
                      <option>Last year</option>
                    </select>
                    <button className="bg-[#1e3a5f] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1e3a5f]/90 transition-colors">
                      <FontAwesomeIcon icon={faSync} className="mr-2" />
                      Refresh
                    </button>
                  </div>
                </div>

                {/* Key Metrics Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Users</p>
                        <p className="text-3xl font-bold text-gray-900">{analyticsData.overview.totalUsers.value.toLocaleString()}</p>
                        <div className="flex items-center mt-2">
                          <FontAwesomeIcon 
                            icon={analyticsData.overview.totalUsers.trend === 'up' ? faArrowUp : faArrowDown} 
                            className={`mr-1 text-sm ${analyticsData.overview.totalUsers.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
                          />
                          <span className={`text-sm ${analyticsData.overview.totalUsers.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                            {analyticsData.overview.totalUsers.change}% from last month
                          </span>
                        </div>
                      </div>
                      <FontAwesomeIcon icon={faUsers} className="h-12 w-12 text-blue-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Auctions</p>
                        <p className="text-3xl font-bold text-gray-900">{analyticsData.overview.totalAuctions.value}</p>
                        <div className="flex items-center mt-2">
                          <FontAwesomeIcon 
                            icon={analyticsData.overview.totalAuctions.trend === 'up' ? faArrowUp : faArrowDown} 
                            className={`mr-1 text-sm ${analyticsData.overview.totalAuctions.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
                          />
                          <span className={`text-sm ${analyticsData.overview.totalAuctions.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                            {analyticsData.overview.totalAuctions.change}% from last month
                          </span>
                        </div>
                      </div>
                      <FontAwesomeIcon icon={faGavel} className="h-12 w-12 text-green-500" />
                    </div>
                  </div>


                  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                        <p className="text-3xl font-bold text-gray-900">{analyticsData.overview.totalRevenue.value}</p>
                        <div className="flex items-center mt-2">
                          <FontAwesomeIcon 
                            icon={analyticsData.overview.totalRevenue.trend === 'up' ? faArrowUp : faArrowDown} 
                            className={`mr-1 text-sm ${analyticsData.overview.totalRevenue.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
                          />
                          <span className={`text-sm ${analyticsData.overview.totalRevenue.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                            {analyticsData.overview.totalRevenue.change}% from last month
                          </span>
                        </div>
                      </div>
                      <FontAwesomeIcon icon={faMoneyBillWave} className="h-12 w-12 text-purple-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Users</p>
                        <p className="text-3xl font-bold text-gray-900">{analyticsData.overview.activeUsers.value.toLocaleString()}</p>
                        <div className="flex items-center mt-2">
                          <FontAwesomeIcon 
                            icon={analyticsData.overview.activeUsers.trend === 'up' ? faArrowUp : faArrowDown} 
                            className={`mr-1 text-sm ${analyticsData.overview.activeUsers.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
                          />
                          <span className={`text-sm ${analyticsData.overview.activeUsers.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                            {Math.abs(analyticsData.overview.activeUsers.change)}% from last month
                          </span>
                        </div>
                      </div>
                      <FontAwesomeIcon icon={faUserTie} className="h-12 w-12 text-orange-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Avg Auction Value</p>
                        <p className="text-3xl font-bold text-gray-900">{analyticsData.overview.avgAuctionValue.value}</p>
                        <div className="flex items-center mt-2">
                          <FontAwesomeIcon 
                            icon={analyticsData.overview.avgAuctionValue.trend === 'up' ? faArrowUp : faArrowDown} 
                            className={`mr-1 text-sm ${analyticsData.overview.avgAuctionValue.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
                          />
                          <span className={`text-sm ${analyticsData.overview.avgAuctionValue.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                            {analyticsData.overview.avgAuctionValue.change}% from last month
                          </span>
                        </div>
                      </div>
                      <FontAwesomeIcon icon={faChartBar} className="h-12 w-12 text-red-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                        <p className="text-3xl font-bold text-gray-900">{analyticsData.overview.completionRate.value}</p>
                        <div className="flex items-center mt-2">
                          <FontAwesomeIcon 
                            icon={analyticsData.overview.completionRate.trend === 'up' ? faArrowUp : faArrowDown} 
                            className={`mr-1 text-sm ${analyticsData.overview.completionRate.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
                          />
                          <span className={`text-sm ${analyticsData.overview.completionRate.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                            {analyticsData.overview.completionRate.change}% from last month
                          </span>
                        </div>
                      </div>
                      <FontAwesomeIcon icon={faPercent} className="h-12 w-12 text-indigo-500" />
                    </div>
                  </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* User Growth Chart */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">User Growth</h4>
                      <FontAwesomeIcon icon={faChartLine} className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                      {analyticsData.userGrowth.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-12 text-sm font-medium text-gray-600">{item.month}</div>
                            <div className="ml-4">
                              <div className="w-64 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full" 
                                  style={{ width: `${(item.users / 3000) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-gray-900">{item.users.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">+{item.registrations} new</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Auction Performance Chart */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">Auction Performance</h4>
                      <FontAwesomeIcon icon={faChartBar} className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                      {analyticsData.auctionPerformance.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-12 text-sm font-medium text-gray-600">{item.month}</div>
                            <div className="ml-4">
                              <div className="w-64 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full" 
                                  style={{ width: `${(item.revenue / 16000000) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-gray-900">LKR {(item.revenue / 1000000).toFixed(1)}M</div>
                            <div className="text-xs text-gray-500">{item.auctions} auctions</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Categories and Locations */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Top Categories */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">Top Categories</h4>
                      <FontAwesomeIcon icon={faChartPie} className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-3">
                      {analyticsData.topCategories.map((category, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-blue-500 mr-3" style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}></div>
                            <span className="text-sm font-medium text-gray-900">{category.category}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-gray-900">{category.count}</div>
                            <div className="text-xs text-gray-500">{category.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location Statistics */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">User Distribution</h4>
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-3">
                      {analyticsData.locationStats.map((location, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="h-4 w-4 text-gray-400 mr-3" />
                            <span className="text-sm font-medium text-gray-900">{location.location}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-gray-900">{location.users.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">{location.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Recent Activity</h4>
                    <FontAwesomeIcon icon={faClock} className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="space-y-4">
                    {analyticsData.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                            activity.type === 'auction_completed' ? 'bg-green-100' :
                            activity.type === 'user_registered' ? 'bg-blue-100' :
                            activity.type === 'auction_started' ? 'bg-purple-100' :
                            activity.type === 'payment_received' ? 'bg-yellow-100' :
                            'bg-gray-100'
                          }`}>
                            <FontAwesomeIcon 
                              icon={
                                activity.type === 'auction_completed' ? faCheck :
                                activity.type === 'user_registered' ? faUsers :
                                activity.type === 'auction_started' ? faGavel :
                                activity.type === 'payment_received' ? faMoneyBillWave :
                                faFileAlt
                              } 
                              className={`h-5 w-5 ${
                                activity.type === 'auction_completed' ? 'text-green-600' :
                                activity.type === 'user_registered' ? 'text-blue-600' :
                                activity.type === 'auction_started' ? 'text-purple-600' :
                                activity.type === 'payment_received' ? 'text-yellow-600' :
                                'text-gray-600'
                              }`} 
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">{activity.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="text-center py-12">
                <FontAwesomeIcon icon={faCog} className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">System Settings</h3>
                <p className="text-gray-600">Configure system-wide settings and preferences.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}