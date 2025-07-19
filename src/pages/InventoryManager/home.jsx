import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSearch, 
  faFilter, 
  faSync, 
  faEye, 
  faCheckCircle, 
  faClock, 
  faExclamationTriangle,
  faUser,
  faCalendarAlt,
  faTrophy,
  faEdit,
  faBoxes,
  faClipboardList,
  faChartBar,
  faTruck,
  faQrcode,
  faPrint,
  faFileExport,
  faPhone,
  faIdCard
} from "@fortawesome/free-solid-svg-icons";

import CustomHeader from "../../components/custom-header";
import BidderHeader from "../../components/bidder-header";
import Footer from "../../components/footer";
import custombanner from "../../assets/custom-banner.png";

// Sample data for demonstration
const inspectionData = [
  {
    id: "IM/2024/001234",
    itemName: "Luxury Watch Collection",
    value: "LKR 250,000",
    itemImage: "/src/assets/royal.jpg",
    winner: {
      name: "Kamal Perera",
      phone: "+94771234567",
      nic: "199012345678",
      image: "/src/assets/profile.jpg"
    },
    paymentStatus: "Paid",
    paidDate: "2024-02-12",
    storageCharge: "LKR 2,500",
    status: "Ready for Release",
    location: "A-15-B",
    daysRemaining: 5,
    dueDate: "2024-02-25",
    inspection: {
      inspector: "Inspector Rajith",
      date: "2024-02-10",
      time: "10:30 AM",
      status: "Approved",
      notes: "All items verified and in good condition"
    }
  },
  {
    id: "IM/2024/001235",
    itemName: "Electronics Bundle",
    value: "LKR 180,000",
    itemImage: "/src/assets/LEAD-Cat.-1.webp",
    winner: {
      name: "Saman Silva",
      phone: "+94712345678",
      nic: "198512345679",
      image: "/src/assets/profile.jpg"
    },
    paymentStatus: "Pending",
    storageCharge: "LKR 3,500",
    status: "Awaiting Payment",
    location: "B-22-A",
    daysRemaining: 7,
    dueDate: "2024-02-23",
    inspection: {
      inspector: "Inspector Kumari",
      date: "2024-02-08",
      time: "2:15 PM",
      status: "Pending",
      notes: "Awaiting technical verification"
    }
  },
  {
    id: "IM/2024/001236",
    itemName: "Vehicle - Toyota Prius",
    value: "LKR 3,200,000",
    itemImage: "/src/assets/mustang.jpg",
    winner: {
      name: "Nimal Fernando",
      phone: "+94723456789",
      nic: "198012345680",
      image: "/src/assets/profile.jpg"
    },
    paymentStatus: "Paid",
    paidDate: "2024-02-07",
    status: "Released",
    location: "C-05-A",
    daysRemaining: 0,
    dueDate: "2024-02-20",
    inspection: {
      inspector: "Inspector Bandara",
      date: "2024-02-05",
      time: "9:00 AM",
      status: "Approved",
      notes: "Vehicle inspection completed successfully"
    }
  },
  {
    id: "IM/2024/001237",
    itemName: "Designer Clothing Lot",
    value: "LKR 85,000",
    itemImage: "/src/assets/bronze.jpg",
    winner: {
      name: "Priya Rajapaksa",
      phone: "+94734567890",
      nic: "199512345681",
      image: "/src/assets/profile.jpg"
    },
    paymentStatus: "Paid",
    paidDate: "2024-02-14",
    storageCharge: "LKR 5,000",
    status: "Overdue Collection",
    location: "A-08-C",
    daysRemaining: -10,
    dueDate: "2024-02-20",
    inspection: {
      inspector: "Inspector Wijesinghe",
      date: "2024-02-12",
      time: "11:45 AM",
      status: "Approved",
      notes: "Quality check completed"
    }
  }
];

export default function InventoryManagerHome() {
  const [activeTab, setActiveTab] = useState("yard-items");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showInspectionModal, setShowInspectionModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const stats = [
    {
      title: "Ready for Release",
      value: "23",
      subtitle: "Action required",
      color: "bg-green-100 text-green-800",
      icon: faCheckCircle
    },
    {
      title: "Pending Payment",
      value: "12",
      subtitle: "Awaiting payment",
      color: "bg-yellow-100 text-yellow-800",
      icon: faClock
    },
    {
      title: "Overdue Collection",
      value: "5",
      subtitle: "Urgent attention",
      color: "bg-red-100 text-red-800",
      icon: faExclamationTriangle
    },
    {
      title: "Released Today",
      value: "15",
      subtitle: "Completed",
      color: "bg-blue-100 text-blue-800",
      icon: faTrophy
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Ready for Release":
        return "bg-green-100 text-green-800";
      case "Awaiting Payment":
        return "bg-yellow-100 text-yellow-800";
      case "Overdue Collection":
        return "bg-red-100 text-red-800";
      case "Released":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInspectionStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredData = inspectionData.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.winner.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleInspectionView = (item) => {
    setSelectedItem(item);
    setShowInspectionModal(true);
  };

  return (
    <>
      <CustomHeader />
      {/* Custom Header for Inventory Manager - without login/register buttons */}
      <header className="bg-[#1e3a5f] shadow-sm py-1">  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <img 
                src={custombanner} 
                alt="Sri Lanka Customs" 
                className="hidden md:block h-16 w-auto rounded-lg" 
              />              
              <div className="md:border-l md:border-[#2d4a6b] pl-4">
                <h1 className="text-lg  md:text-2xl font-bold text-white">E-Bidding Platform</h1>
                <p className="text-xs md:text-sm text-white/80">Official Auction Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* No login/register buttons for Inventory Manager */}
            </div>
          </div>
        </div>
      </header>
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2c4a6b] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                <FontAwesomeIcon icon={faQrcode} className="text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">Yard Management</h1>
                <p className="text-blue-100 text-sm">Item Release & Inventory Control</p>
                <div className="flex items-center mt-2 space-x-3">
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                    <FontAwesomeIcon icon={faQrcode} className="mr-1" />
                    Scan QR
                  </span>
                  <span className="text-blue-100 text-xs">Colombo Port Yard Manager: Manager Silva</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-[180px]">
              <div className="text-xs text-blue-100 mb-1">Occupancy Rate</div>
              <div className="text-2xl font-bold mb-1">78%</div>
              <div className="text-xs text-blue-100">389 / 500 items</div>
              <div className="mt-2 w-full bg-white/20 rounded-full h-2">
                <div className="bg-white rounded-full h-2" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#1e3a5f]">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${stat.color}`}>
                    <FontAwesomeIcon icon={stat.icon} className="mr-2" />
                    {stat.title}
                  </div>
                  <div className="text-2xl font-bold text-[#1e3a5f] mt-2">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation - Item Details Style */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-lg shadow-sm overflow-hidden">
            <div className="flex">
              <button
                onClick={() => setActiveTab("yard-items")}
                className={`py-3 px-6 text-center min-w-[140px] transition-all ${
                  activeTab === "yard-items" 
                  ? "bg-white text-[#1e3a5f] font-semibold shadow-sm" 
                  : "text-gray-500 hover:text-gray-700 bg-gray-100"
                }`}
              >
                <FontAwesomeIcon icon={faBoxes} className="mr-2" />
                Yard Items
              </button>
              <button
                onClick={() => setActiveTab("release-queue")}
                className={`py-3 px-6 text-center min-w-[140px] transition-all ${
                  activeTab === "release-queue" 
                  ? "bg-white text-[#1e3a5f] font-semibold shadow-sm" 
                  : "text-gray-500 hover:text-gray-700 bg-gray-100"
                }`}
              >
                <FontAwesomeIcon icon={faTruck} className="mr-2" />
                Release Queue
              </button>
              <button
                onClick={() => setActiveTab("inspection")}
                className={`py-3 px-6 text-center min-w-[140px] transition-all ${
                  activeTab === "inspection" 
                  ? "bg-white text-[#1e3a5f] font-semibold shadow-sm" 
                  : "text-gray-500 hover:text-gray-700 bg-gray-100"
                }`}
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Inspection
              </button>
              <button
                onClick={() => setActiveTab("reports")}
                className={`py-3 px-6 text-center min-w-[140px] transition-all ${
                  activeTab === "reports" 
                  ? "bg-white text-[#1e3a5f] font-semibold shadow-sm" 
                  : "text-gray-500 hover:text-gray-700 bg-gray-100"
                }`}
              >
                <FontAwesomeIcon icon={faChartBar} className="mr-2" />
                Reports
              </button>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "yard-items" && (
          <>
            {/* Search and Filter Controls */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <FontAwesomeIcon 
                    icon={faSearch} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search by item name, ID, or winner..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="Ready for Release">Ready for Release</option>
                  <option value="Awaiting Payment">Awaiting Payment</option>
                  <option value="Overdue Collection">Overdue Collection</option>
                  <option value="Released">Released</option>
                </select>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <FontAwesomeIcon icon={faFilter} className="mr-2" />
                  More Filters
                </button>
                <button className="flex items-center px-4 py-2 bg-[#1e3a5f] text-white rounded-md hover:bg-[#2c4a6b]">
                  <FontAwesomeIcon icon={faSync} className="mr-2" />
                  Refresh
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === "yard-items" && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2c4a6b] px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white mb-1">Yard Items Management</h2>
                  <p className="text-blue-100 text-sm">Track and manage all items in the yard facility</p>
                </div>
                <div className="text-white text-right">
                  <div className="text-sm opacity-80">Total Items</div>
                  <div className="text-2xl font-bold">{filteredData.length}</div>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50/80 backdrop-blur-sm">
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faBoxes} className="text-[#1e3a5f]" />
                        <span>Item Details</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faTrophy} className="text-[#1e3a5f]" />
                        <span>Winner Information</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-[#1e3a5f]" />
                        <span>Payment Status</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faClock} className="text-[#1e3a5f]" />
                        <span>Current Status</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faUser} className="text-[#1e3a5f]" />
                        <span>Inspection</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group">
                      <td className="px-6 py-5">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#1e3a5f] to-[#2c4a6b] rounded-lg flex items-center justify-center shadow-md overflow-hidden">
                              {/* Item image placeholder - you can replace with actual item images */}
                              <img 
                                src={item.itemImage} 
                                alt={item.itemName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                              <FontAwesomeIcon icon={faBoxes} className="text-white text-lg" style={{display: 'none'}} />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-gray-900 group-hover:text-[#1e3a5f] transition-colors">
                              {item.itemName}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 font-mono bg-gray-100 px-2 py-1 rounded inline-block">
                              {item.id}
                            </div>
                            <div className="text-lg font-bold text-[#1e3a5f] mt-2 flex items-center">
                              <span className="text-xs text-gray-500 mr-1">LKR</span>
                              {item.value.replace('LKR ', '')}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-11 h-11 rounded-full overflow-hidden shadow-md border-2 border-gray-200">
                              <img 
                                src={item.winner.image} 
                                alt={item.winner.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                              <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center" style={{display: 'none'}}>
                                <FontAwesomeIcon icon={faUser} className="text-white" />
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-gray-900">{item.winner.name}</div>
                            <div className="text-xs text-gray-600 mt-1 flex items-center">
                              <FontAwesomeIcon icon={faPhone} className="mr-1 text-gray-400" />
                              {item.winner.phone}
                            </div>
                            <div className="mt-2">
                              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg inline-flex items-center">
                                <FontAwesomeIcon icon={faIdCard} className="text-blue-600 mr-2 text-xs" />
                                <span className="text-xs font-medium text-blue-800">NIC:</span>
                                <span className="text-xs font-mono text-blue-900 ml-1 font-semibold">{item.winner.nic}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-2">
                          <div>
                            <span className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full shadow-sm ${
                              item.paymentStatus === "Paid" 
                                ? "bg-green-100 text-green-800 border border-green-200" 
                                : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                            }`}>
                              <FontAwesomeIcon 
                                icon={item.paymentStatus === "Paid" ? faCheckCircle : faClock} 
                                className="mr-1.5" 
                              />
                              {item.paymentStatus}
                            </span>
                          </div>
                          {item.paidDate && (
                            <div className="text-xs text-gray-600 bg-green-50 px-2 py-1 rounded">
                              <FontAwesomeIcon icon={faCalendarAlt} className="mr-1 text-green-500" />
                              Paid: {item.paidDate}
                            </div>
                          )}
                          {item.storageCharge && (
                            <div className="text-xs text-gray-600 bg-blue-50 px-2 py-1 rounded">
                              Storage: <span className="font-semibold text-blue-700">{item.storageCharge}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-2">
                          <span className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full shadow-sm ${getStatusColor(item.status)} border`}>
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              item.status === "Ready for Release" ? "bg-green-500" :
                              item.status === "Awaiting Payment" ? "bg-yellow-500" :
                              item.status === "Overdue Collection" ? "bg-red-500" : "bg-blue-500"
                            }`}></div>
                            {item.status}
                          </span>
                          <div className={`text-xs px-3 py-1.5 rounded-lg flex items-center font-medium ${
                            item.daysRemaining < 0 ? 'bg-red-50 text-red-700 border border-red-200' : 
                            item.daysRemaining <= 2 ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' : 'bg-green-50 text-green-700 border border-green-200'
                          }`}>
                            <FontAwesomeIcon icon={faClock} className="mr-2" />
                            {item.daysRemaining > 0 ? `${item.daysRemaining} days remaining` : 
                             item.daysRemaining < 0 ? `${Math.abs(item.daysRemaining)} days overdue` : 'Due today'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-2">
                          <span className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full shadow-sm ${getInspectionStatusColor(item.inspection.status)} border`}>
                            <FontAwesomeIcon 
                              icon={item.inspection.status === "Approved" ? faCheckCircle : 
                                    item.inspection.status === "Pending" ? faClock : faExclamationTriangle} 
                              className="mr-1.5" 
                            />
                            {item.inspection.status}
                          </span>
                          <div className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                            <FontAwesomeIcon icon={faUser} className="mr-1 text-[#1e3a5f]" />
                            {item.inspection.inspector}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                            {item.inspection.date} at {item.inspection.time}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center space-x-2">
                          <button 
                            onClick={() => handleInspectionView(item)}
                            className="bg-[#1e3a5f] hover:bg-[#2c4a6b] text-white p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group"
                            title="View Details"
                          >
                            <FontAwesomeIcon icon={faEye} className="group-hover:scale-110 transition-transform" />
                          </button>
                          {item.status === "Ready for Release" && (
                            <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center">
                              <FontAwesomeIcon icon={faTruck} className="mr-1.5" />
                              Release
                            </button>
                          )}
                          <button 
                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                            title="More Options"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{filteredData.length}</span> items
                </div>
                <div className="flex items-center space-x-2">
                  <button className="bg-white border border-gray-300 text-gray-600 px-3 py-1.5 rounded-md text-xs hover:bg-gray-50 transition-colors">
                    <FontAwesomeIcon icon={faFileExport} className="mr-1" />
                    Export
                  </button>
                  <button className="bg-[#1e3a5f] text-white px-3 py-1.5 rounded-md text-xs hover:bg-[#2c4a6b] transition-colors">
                    <FontAwesomeIcon icon={faPrint} className="mr-1" />
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "release-queue" && (
          <>
            {/* Search and Filter Controls */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <FontAwesomeIcon 
                    icon={faSearch} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search by item name, ID, or winner..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="Ready for Release">Ready for Release</option>
                  <option value="Awaiting Payment">Awaiting Payment</option>
                  <option value="Overdue Collection">Overdue Collection</option>
                  <option value="Released">Released</option>
                </select>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <FontAwesomeIcon icon={faFilter} className="mr-2" />
                  More Filters
                </button>
                <button className="flex items-center px-4 py-2 bg-[#1e3a5f] text-white rounded-md hover:bg-[#2c4a6b]">
                  <FontAwesomeIcon icon={faSync} className="mr-2" />
                  Refresh
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Release Queue - Winners Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.filter(item => item.status === "Ready for Release" || item.status === "Released").map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 h-16 w-16">
                        <div className="h-16 w-16 rounded-full overflow-hidden shadow-md border-2 border-gray-200">
                          <img 
                            src={item.winner.image} 
                            alt={item.winner.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#1e3a5f] to-[#2c4a6b] flex items-center justify-center" style={{display: 'none'}}>
                            <FontAwesomeIcon icon={faTrophy} className="text-white text-xl" />
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{item.winner.name}</h3>
                        <p className="text-sm text-gray-600">{item.itemName}</p>
                        <p className="text-sm font-semibold text-[#1e3a5f]">{item.value}</p>
                      </div>
                      {/* Item image thumbnail */}
                      <div className="flex-shrink-0 ml-2">
                        <div className="w-12 h-12 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                          <img 
                            src={item.itemImage} 
                            alt={item.itemName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center" style={{display: 'none'}}>
                            <FontAwesomeIcon icon={faBoxes} className="text-gray-400 text-sm" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Due Date:</span>
                        <span className="text-sm font-medium">{item.dueDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Item Value:</span>
                        <span className="text-sm font-semibold text-[#1e3a5f]">{item.value}</span>
                      </div>
                    </div>
                    {item.status === "Ready for Release" && (
                      <button className="w-full mt-4 bg-[#1e3a5f] text-white py-2 rounded-md hover:bg-[#2c4a6b] transition-colors">
                        Process Release
                      </button>
                    )}
                    {item.status === "Released" && (
                      <div className="mt-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                          Successfully Released
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "inspection" && (
          <>
            {/* Search and Filter Controls */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <FontAwesomeIcon 
                    icon={faSearch} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search by item name, ID, or winner..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="Ready for Release">Ready for Release</option>
                  <option value="Awaiting Payment">Awaiting Payment</option>
                  <option value="Overdue Collection">Overdue Collection</option>
                  <option value="Released">Released</option>
                </select>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <FontAwesomeIcon icon={faFilter} className="mr-2" />
                  More Filters
                </button>
                <button className="flex items-center px-4 py-2 bg-[#1e3a5f] text-white rounded-md hover:bg-[#2c4a6b]">
                  <FontAwesomeIcon icon={faSync} className="mr-2" />
                  Refresh
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Inspection Details & Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredData.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 bg-gray-50 hover:shadow-md transition-shadow">
                    {/* Item image header */}
                    <div className="mb-3">
                      <div className="w-full h-24 rounded-lg overflow-hidden bg-gray-200 border border-gray-300">
                        <img 
                          src={item.itemImage} 
                          alt={item.itemName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center" style={{display: 'none'}}>
                          <FontAwesomeIcon icon={faBoxes} className="text-gray-400 text-2xl" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1 flex items-center space-x-2">
                        {/* Winner avatar */}
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300">
                          <img 
                            src={item.winner.image} 
                            alt={item.winner.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center" style={{display: 'none'}}>
                            <FontAwesomeIcon icon={faUser} className="text-white text-xs" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">{item.itemName}</h3>
                          <p className="text-xs text-gray-500 font-mono">{item.id}</p>
                        </div>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getInspectionStatusColor(item.inspection.status)}`}>
                        {item.inspection.status}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Inspector</div>
                        <div className="text-sm text-gray-700 font-medium flex items-center">
                          <FontAwesomeIcon icon={faUser} className="mr-2 text-[#1e3a5f] text-xs" />
                          {item.inspection.inspector}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Date</div>
                          <div className="text-xs text-gray-700 flex items-center">
                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1 text-[#1e3a5f]" />
                            {item.inspection.date}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Time</div>
                          <div className="text-xs text-gray-700 flex items-center">
                            <FontAwesomeIcon icon={faClock} className="mr-1 text-[#1e3a5f]" />
                            {item.inspection.time}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Item Value</div>
                        <div className="text-sm font-bold text-[#1e3a5f]">{item.value}</div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Notes</div>
                        <div className="text-xs text-gray-700 bg-white rounded p-2 line-clamp-2">{item.inspection.notes}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
                      <button 
                        onClick={() => handleInspectionView(item)}
                        className="flex items-center px-2 py-1 text-xs border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-1" />
                        View
                      </button>
                      <button className="flex items-center px-2 py-1 text-xs bg-[#1e3a5f] text-white rounded hover:bg-[#2c4a6b] transition-colors">
                        <FontAwesomeIcon icon={faEdit} className="mr-1" />
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "reports" && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5 border-b">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Reports & Analytics</h2>
              <p className="text-gray-600">Comprehensive reporting and data analysis for inventory management</p>
            </div>
            
            <div className="p-6">
              {/* Quick Report Generation */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <button className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 text-left hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <FontAwesomeIcon icon={faFileExport} className="text-2xl text-blue-600" />
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">Daily</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Daily Report</h3>
                  <p className="text-xs text-gray-600">Generate today's activity summary</p>
                </button>

                <button className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4 text-left hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <FontAwesomeIcon icon={faChartBar} className="text-2xl text-green-600" />
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">Weekly</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Weekly Summary</h3>
                  <p className="text-xs text-gray-600">7-day performance overview</p>
                </button>

                <button className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 text-left hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <FontAwesomeIcon icon={faPrint} className="text-2xl text-purple-600" />
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">Monthly</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Monthly Report</h3>
                  <p className="text-xs text-gray-600">Complete monthly analysis</p>
                </button>

                <button className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4 text-left hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <FontAwesomeIcon icon={faSync} className="text-2xl text-orange-600" />
                    <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full">Custom</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Custom Report</h3>
                  <p className="text-xs text-gray-600">Build custom date range</p>
                </button>
              </div>

              {/* Report Categories */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FontAwesomeIcon icon={faBoxes} className="mr-3 text-[#1e3a5f]" />
                    Inventory Reports
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: "Stock Level Report", desc: "Current inventory levels by category", icon: faClipboardList },
                      { name: "Item Movement Report", desc: "Track items in/out of yard", icon: faTruck },
                      { name: "Storage Utilization", desc: "Space usage and capacity analysis", icon: faChartBar },
                      { name: "Overdue Items Report", desc: "Items pending collection", icon: faExclamationTriangle }
                    ].map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={report.icon} className="text-[#1e3a5f] mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{report.name}</div>
                            <div className="text-xs text-gray-600">{report.desc}</div>
                          </div>
                        </div>
                        <button className="bg-[#1e3a5f] text-white px-3 py-1 rounded text-xs hover:bg-[#2c4a6b] transition-colors">
                          Generate
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FontAwesomeIcon icon={faTrophy} className="mr-3 text-[#1e3a5f]" />
                    Financial Reports
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: "Revenue Report", desc: "Total revenue from releases", icon: faCheckCircle },
                      { name: "Storage Charges", desc: "Storage fee collection summary", icon: faClock },
                      { name: "Payment Status", desc: "Outstanding payments analysis", icon: faExclamationTriangle },
                      { name: "Auction Summary", desc: "Completed auction financial data", icon: faTrophy }
                    ].map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={report.icon} className="text-[#1e3a5f] mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{report.name}</div>
                            <div className="text-xs text-gray-600">{report.desc}</div>
                          </div>
                        </div>
                        <button className="bg-[#1e3a5f] text-white px-3 py-1 rounded text-xs hover:bg-[#2c4a6b] transition-colors">
                          Generate
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Analytics */}
              <div className="border rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FontAwesomeIcon icon={faChartBar} className="mr-3 text-[#1e3a5f]" />
                  Performance Analytics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">85%</div>
                    <div className="text-sm text-gray-600">Release Efficiency</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <FontAwesomeIcon icon={faTruck} className="text-2xl text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">92%</div>
                    <div className="text-sm text-gray-600">Payment Collection</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <FontAwesomeIcon icon={faUser} className="text-2xl text-yellow-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">78%</div>
                    <div className="text-sm text-gray-600">Inspection Rate</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Export Options */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FontAwesomeIcon icon={faFileExport} className="mr-3 text-[#1e3a5f]" />
                  Export & Print Options
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-white hover:shadow-sm transition-all">
                    <FontAwesomeIcon icon={faFileExport} className="text-2xl text-[#1e3a5f] mb-2" />
                    <span className="text-sm font-medium">Export Excel</span>
                  </button>
                  <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-white hover:shadow-sm transition-all">
                    <FontAwesomeIcon icon={faPrint} className="text-2xl text-[#1e3a5f] mb-2" />
                    <span className="text-sm font-medium">Print PDF</span>
                  </button>
                  <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-white hover:shadow-sm transition-all">
                    <FontAwesomeIcon icon={faChartBar} className="text-2xl text-[#1e3a5f] mb-2" />
                    <span className="text-sm font-medium">Charts View</span>
                  </button>
                  <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-white hover:shadow-sm transition-all">
                    <FontAwesomeIcon icon={faSync} className="text-2xl text-[#1e3a5f] mb-2" />
                    <span className="text-sm font-medium">Auto Schedule</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inspection Details Modal */}
      {showInspectionModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  {/* Item image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-300">
                    <img 
                      src={selectedItem.itemImage} 
                      alt={selectedItem.itemName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-[#1e3a5f] to-[#2c4a6b] flex items-center justify-center" style={{display: 'none'}}>
                      <FontAwesomeIcon icon={faBoxes} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Inspection Details</h2>
                    <p className="text-sm text-gray-600">{selectedItem.itemName}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowInspectionModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Winner information with image */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Winner Information</h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
                      <img 
                        src={selectedItem.winner.image} 
                        alt={selectedItem.winner.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center" style={{display: 'none'}}>
                        <FontAwesomeIcon icon={faUser} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{selectedItem.winner.name}</div>
                      <div className="text-xs text-gray-600">{selectedItem.winner.phone}</div>
                      <div className="text-xs text-gray-500">NIC: {selectedItem.winner.nic}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Item Name</label>
                    <p className="text-sm text-gray-600 mt-1">{selectedItem.itemName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Item ID</label>
                    <p className="text-sm text-gray-600 mt-1">{selectedItem.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Inspector</label>
                    <p className="text-sm text-gray-600 mt-1">{selectedItem.inspection.inspector}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Inspection Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getInspectionStatusColor(selectedItem.inspection.status)}`}>
                      {selectedItem.inspection.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Date</label>
                    <p className="text-sm text-gray-600 mt-1">{selectedItem.inspection.date}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Time</label>
                    <p className="text-sm text-gray-600 mt-1">{selectedItem.inspection.time}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-gray-700">Inspection Notes</label>
                  <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-3 rounded-md">{selectedItem.inspection.notes}</p>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button 
                    onClick={() => setShowInspectionModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 bg-[#1e3a5f] text-white rounded-md hover:bg-[#2c4a6b]">
                    Edit Inspection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
