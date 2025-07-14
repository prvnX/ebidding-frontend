import React, { useState } from "react";
import CustomHeader from "../../components/custom-header";
import AppAdminHeader from "../../components/ui/appadmin/appadminheader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faClipboardCheck, 
  faUserTie, 
  faServer, 
  faEye, 
  faCheck, 
  faTimes,
  faChartLine,
  faShieldAlt,
  faCog,
  faSearch,
  faFilter,
  faUserPlus,
  faEdit,
  faTrash,
  faBan,
  faUnlock,
  faEnvelope,
  faPhone,
  faCalendar,
  faUserShield,
  faSort,
  faDownload,
  faGavel,
  faExclamationTriangle
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
      documents: ["NIC Copy", "Bank Statement", "Address Proof"]
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
      documents: ["NIC Copy", "Company Registration"]
    },
    {
      id: 3,
      name: "Nimal Fernando",
      email: "nimal.fernando@customs.gov.lk",
      phone: "+94723456789",
      nic: "198012345680",
      type: "Auction Manager",
      registeredDate: "2024-02-08",
      verificationScore: 98,
      documents: ["Employee ID", "Authorization Letter"]
    }
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
      position: "Senior Auction Manager",
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
      position: "Auction Manager",
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
      position: "Junior Auction Manager",
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
      id: 4,
      name: "Ranjan Wickramasinghe",
      email: "ranjan.wickramasinghe@customs.gov.lk",
      phone: "+94761234567",
      nic: "197812345683",
      empId: "EMP004",
      department: "Customs Administration",
      position: "Auction Manager",
      status: "On Leave",
      joinDate: "2023-11-20",
      lastLogin: "2024-02-05 02:15 PM",
      totalAuctions: 32,
      activeAuctions: 2,
      completedAuctions: 30,
      totalRevenue: "LKR 11,200,000",
      averageParticipants: 20,
      successRate: "85%",
      permissions: ["Create Auctions", "Manage Items", "View Reports"],
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
      position: "Senior Auction Manager",
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

  // System settings state for System Configuration
  const [settings, setSettings] = useState({
    registration: {
      autoApproveVerified: false,
      requireDocuments: true,
      emailVerificationRequired: true
    },
    security: {
      sessionTimeout: '30',
      maxLoginAttempts: '5',
      passwordMinLength: '8',
      lockoutDuration: '24'
    }
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // Handle saving settings logic
    console.log('Saving settings:', settings);
    alert('Configuration saved successfully!');
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
    {
      title: "System Uptime",
      value: "99.8%",
      change: "Excellent",
      icon: faServer,
      color: "bg-purple-500"
    }
  ];

  const quickStats = [
    { label: "Active Bidders", value: "2,340" },
    { label: "Today's Logins", value: "456" },
    { label: "Blocked Users", value: "15" },
    { label: "Total Revenue", value: "LKR 125,000,M" }
  ];

  const tabItems = [
    { id: 'approvals', label: 'User Approvals', count: '23' },
    { id: 'users', label: 'System Users' },
    { id: 'managers', label: 'Auction Managers' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings', label: 'System Settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomHeader />
      <AppAdminHeader />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
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

        {/* Quick Stats Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                  <button className="bg-[#1e3a5f] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1e3a5f]/90 transition-colors">
                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                    Add New User
                  </button>
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
                      <option value="Super Admin">Super Admin</option>
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
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                      <FontAwesomeIcon icon={faDownload} className="mr-2" />
                      Export
                    </button>
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
                            Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Activity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Performance
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
                                user.role === 'Super Admin' ? 'bg-purple-100 text-purple-800' :
                                user.role === 'Auction Manager' ? 'bg-green-100 text-green-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {user.role}
                              </span>
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
                                <FontAwesomeIcon icon={faCalendar} className="mr-2 text-gray-400" />
                                Joined: {user.joinDate}
                              </div>
                              <div>Last Login: {user.lastLogin}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.role === 'Bidder' ? (
                                <div>
                                  <div>Total Bids: {user.totalBids}</div>
                                  <div>Win Rate: {user.winRate}</div>
                                </div>
                              ) : (
                                <div className="text-gray-400">N/A</div>
                              )}
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
                  <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Avg Success Rate</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {Math.round(auctionManagers.reduce((sum, m) => sum + parseFloat(m.successRate), 0) / auctionManagers.length)}%
                        </p>
                      </div>
                      <FontAwesomeIcon icon={faShieldAlt} className="h-8 w-8 text-orange-500" />
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
                      <option value="On Leave">On Leave</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                      <FontAwesomeIcon icon={faDownload} className="mr-2" />
                      Export
                    </button>
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
                              <p className="text-sm text-gray-600">{manager.position}</p>
                              <p className="text-sm text-gray-500">Employee ID: {manager.empId}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                              manager.status === 'Active' ? 'bg-green-100 text-green-800' :
                              manager.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
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
                          <div className="bg-green-50 rounded-lg p-3">
                            <div className="text-sm text-green-600 font-medium">Success Rate</div>
                            <div className="text-2xl font-bold text-green-900">{manager.successRate}</div>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-3">
                            <div className="text-sm text-purple-600 font-medium">Active Auctions</div>
                            <div className="text-2xl font-bold text-purple-900">{manager.activeAuctions}</div>
                          </div>
                          <div className="bg-orange-50 rounded-lg p-3">
                            <div className="text-sm text-orange-600 font-medium">Avg Participants</div>
                            <div className="text-2xl font-bold text-orange-900">{manager.averageParticipants}</div>
                          </div>
                        </div>

                        {/* Revenue Information */}
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-600 font-medium">Total Revenue Generated</div>
                          <div className="text-xl font-bold text-gray-900">{manager.totalRevenue}</div>
                        </div>

                        {/* Permissions */}
                        <div className="mb-4">
                          <div className="text-sm text-gray-600 font-medium mb-2">Permissions</div>
                          <div className="flex flex-wrap gap-2">
                            {manager.permissions.map((permission, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {permission}
                              </span>
                            ))}
                          </div>
                        </div>

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
                          <button
                            onClick={() => handlePermissionChange(manager.id, manager.permissions)}
                            className="flex items-center px-3 py-1 bg-purple-50 text-purple-600 rounded-md text-sm font-medium hover:bg-purple-100 transition-colors"
                          >
                            <FontAwesomeIcon icon={faShieldAlt} className="mr-1" />
                            Permissions
                          </button>
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
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faChartLine} className="h-6 w-6 text-[#1e3a5f]" />
                    <h3 className="text-xl font-semibold text-gray-900">System Analytics</h3>
                  </div>
                  <p className="text-sm text-gray-600">View detailed analytics and system performance metrics</p>
                </div>

                {/* User Growth and System Health Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  
                  {/* User Growth Card */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <FontAwesomeIcon icon={faChartLine} className="h-5 w-5 text-[#1e3a5f]" />
                      <h4 className="text-lg font-semibold text-gray-900">User Growth</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">This Month:</span>
                        <span className="text-sm font-semibold text-green-600">+342 users</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Last Month:</span>
                        <span className="text-sm font-semibold text-green-600">+298 users</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Growth Rate:</span>
                        <span className="text-sm font-semibold text-green-600">+14.8%</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md text-sm text-gray-700 transition-colors">
                        <FontAwesomeIcon icon={faEye} className="h-4 w-4" />
                        <span>View Detailed Report</span>
                      </button>
                    </div>
                  </div>
                   <div className="grid grid-cols-1 gap-6">
                  
                  
                
                  {/* User Activity */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">User Activity</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Daily Active Users</span>
                        <span className="text-sm font-semibold text-gray-900">2,340</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">New Registrations</span>
                        <span className="text-sm font-semibold text-gray-900">156</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Session Duration</span>
                        <span className="text-sm font-semibold text-gray-900">24.5 min</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Bounce Rate</span>
                        <span className="text-sm font-semibold text-gray-900">15.2%</span>
                      </div>
                    </div>
                  </div>
                </div>
                 </div>

                {/* Additional Analytics Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-green-600">LKR 125.5M</p>
                        <p className="text-xs text-green-500 mt-1">+18.2% from last month</p>
                      </div>
                      <div className="bg-green-100 rounded-full p-3">
                        <FontAwesomeIcon icon={faChartLine} className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Auctions</p>
                        <p className="text-2xl font-bold text-blue-600">142</p>
                        <p className="text-xs text-blue-500 mt-1">+12 from yesterday</p>
                      </div>
                      <div className="bg-blue-100 rounded-full p-3">
                        <FontAwesomeIcon icon={faGavel} className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Bids</p>
                        <p className="text-2xl font-bold text-purple-600">8,947</p>
                        <p className="text-xs text-purple-500 mt-1">+234 today</p>
                      </div>
                      <div className="bg-purple-100 rounded-full p-3">
                        <FontAwesomeIcon icon={faUsers} className="h-5 w-5 text-purple-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Success Rate</p>
                        <p className="text-2xl font-bold text-orange-600">89.2%</p>
                        <p className="text-xs text-orange-500 mt-1">+2.1% improvement</p>
                      </div>
                      <div className="bg-orange-100 rounded-full p-3">
                        <FontAwesomeIcon icon={faShieldAlt} className="h-5 w-5 text-orange-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 gap-6">
                  
                  
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faCog} className="h-6 w-6 text-[#1e3a5f]" />
                    <h3 className="text-xl font-semibold text-gray-900">System Configuration</h3>
                  </div>
                  <p className="text-sm text-gray-600">Configure system-wide settings and parameters</p>
                </div>

                {/* Settings Container */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  
                  {/* User Registration Settings Section */}
                  <div className="p-6 border-b border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">User Registration Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Auto-approve verified users</span>
                        </div>
                        <button
                          onClick={() => handleSettingChange('registration', 'autoApproveVerified', !settings.registration?.autoApproveVerified)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.registration?.autoApproveVerified ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.registration?.autoApproveVerified ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Require document verification</span>
                        </div>
                        <button
                          onClick={() => handleSettingChange('registration', 'requireDocuments', !settings.registration?.requireDocuments)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.registration?.requireDocuments ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.registration?.requireDocuments ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Email verification required</span>
                        </div>
                        <button
                          onClick={() => handleSettingChange('registration', 'emailVerificationRequired', !settings.registration?.emailVerificationRequired)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.registration?.emailVerificationRequired ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.registration?.emailVerificationRequired ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Security Settings Section */}
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h4>
                    <div className="space-y-6">
                      
                      {/* Session timeout and Max login attempts in grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Session timeout (minutes)</label>
                          <input
                            type="number"
                            value={settings.security?.sessionTimeout || '30'}
                            onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            placeholder="30"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Max login attempts</label>
                          <input
                            type="number"
                            value={settings.security?.maxLoginAttempts || '5'}
                            onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            placeholder="5"
                          />
                        </div>
                      </div>

                      {/* Password minimum length and Account lockout duration in grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Password minimum length</label>
                          <input
                            type="number"
                            value={settings.security?.passwordMinLength || '8'}
                            onChange={(e) => handleSettingChange('security', 'passwordMinLength', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            placeholder="8"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Account lockout duration (hours)</label>
                          <input
                            type="number"
                            value={settings.security?.lockoutDuration || '24'}
                            onChange={(e) => handleSettingChange('security', 'lockoutDuration', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            placeholder="24"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Warning Message */}
                  <div className="p-4 bg-orange-50 border-t border-orange-200 rounded-b-lg">
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon icon={faExclamationTriangle} className="h-4 w-4 text-orange-600" />
                      <span className="text-sm text-orange-800">
                        Changes to system settings will affect all users. Please review carefully before applying.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Save Configuration Button */}
                <div className="mt-6 flex justify-start">
                  <button 
                    onClick={handleSaveSettings}
                    className="bg-[#1e3a5f] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#1e3a5f]/90 transition-colors"
                  >
                    Save Configuration
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
