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
  faCog
} from '@fortawesome/free-solid-svg-icons';

export default function AppAdminHome() {
  const [activeTab, setActiveTab] = useState('approvals');

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
              <div className="text-center py-12">
                <FontAwesomeIcon icon={faUsers} className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">System Users Management</h3>
                <p className="text-gray-600">Manage all system users, roles, and permissions.</p>
              </div>
            )}

            {activeTab === 'managers' && (
              <div className="text-center py-12">
                <FontAwesomeIcon icon={faUserTie} className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Auction Managers</h3>
                <p className="text-gray-600">Oversee auction managers and their activities.</p>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="text-center py-12">
                <FontAwesomeIcon icon={faChartLine} className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">System Analytics</h3>
                <p className="text-gray-600">View detailed analytics and system performance metrics.</p>
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
