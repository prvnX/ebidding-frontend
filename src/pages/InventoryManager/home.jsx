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
  faClipboardCheck,
  faDownload,
  faEdit,
  faBoxes,
  faClipboardList,
  faChartBar,
  faTruck,
  faQrcode,
  faPrint,
  faFileExport
} from "@fortawesome/free-solid-svg-icons";

import CustomHeader from "../../components/custom-header";
import BidderHeader from "../../components/bidder-header";
import Footer from "../../components/footer";

// Sample data for demonstration
const inspectionData = [
  {
    id: "IM/2024/001234",
    itemName: "Luxury Watch Collection",
    value: "LKR 250,000",
    winner: {
      name: "Kamal Perera",
      phone: "+94771234567",
      nic: "199012345678",
      image: "/src/assets/av1.png"
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
    winner: {
      name: "Saman Silva",
      phone: "+94712345678",
      nic: "198512345679",
      image: "/src/assets/av2.png"
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
    winner: {
      name: "Priya Rajapaksa",
      phone: "+94734567890",
      nic: "199512345681",
      image: "/src/assets/av1.png"
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
      <BidderHeader />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2c4a6b] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <FontAwesomeIcon icon={faQrcode} className="text-3xl" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Yard Management</h1>
                <p className="text-blue-100 text-lg">Item Release & Inventory Control</p>
                <div className="flex items-center mt-3 space-x-4">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    <FontAwesomeIcon icon={faQrcode} className="mr-2" />
                    Scan QR
                  </span>
                  <span className="text-blue-100">Colombo Port Yard Manager: Manager Silva</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center min-w-[200px]">
              <div className="text-sm text-blue-100 mb-1">Occupancy Rate</div>
              <div className="text-3xl font-bold mb-1">78%</div>
              <div className="text-sm text-blue-100">389 / 500 items</div>
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

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("yard-items")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "yard-items"
                    ? "border-[#1e3a5f] text-[#1e3a5f]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FontAwesomeIcon icon={faClipboardCheck} className="mr-2" />
                Yard Items
              </button>
              <button
                onClick={() => setActiveTab("release-queue")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "release-queue"
                    ? "border-[#1e3a5f] text-[#1e3a5f]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FontAwesomeIcon icon={faTrophy} className="mr-2" />
                Release Queue
              </button>
              <button
                onClick={() => setActiveTab("inspection")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "inspection"
                    ? "border-[#1e3a5f] text-[#1e3a5f]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Inspection
              </button>
            </nav>
          </div>
        </div>

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

        {/* Content based on active tab */}
        {activeTab === "yard-items" && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Yard Items Management</h2>
              <p className="text-gray-600 mb-6">Track and manage all items in the yard</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Winner Information
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Inspection
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.itemName}</div>
                          <div className="text-sm text-gray-500">{item.id}</div>
                          <div className="text-sm font-semibold text-[#1e3a5f]">{item.value}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <FontAwesomeIcon icon={faUser} className="text-gray-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.winner.name}</div>
                            <div className="text-sm text-gray-500">{item.winner.phone}</div>
                            <div className="text-sm text-gray-500">NIC: {item.winner.nic}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            item.paymentStatus === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {item.paymentStatus}
                          </span>
                          {item.paidDate && (
                            <div className="text-sm text-gray-500 mt-1">Paid: {item.paidDate}</div>
                          )}
                          {item.storageCharge && (
                            <div className="text-sm text-gray-500">Storage: {item.storageCharge}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                        <div className="text-sm text-gray-500 mt-1">{item.location}</div>
                        <div className="text-sm text-gray-500">
                          {item.daysRemaining > 0 ? `${item.daysRemaining} days remaining` : 
                           item.daysRemaining < 0 ? `${Math.abs(item.daysRemaining)} days overdue` : 'Due today'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getInspectionStatusColor(item.inspection.status)}`}>
                            {item.inspection.status}
                          </span>
                          <div className="text-sm text-gray-500 mt-1">{item.inspection.inspector}</div>
                          <div className="text-sm text-gray-500">{item.inspection.date} {item.inspection.time}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleInspectionView(item)}
                            className="text-[#1e3a5f] hover:text-[#2c4a6b]"
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                          {item.status === "Ready for Release" && (
                            <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700">
                              Release
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "release-queue" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Release Queue - Winners Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.filter(item => item.status === "Ready for Release" || item.status === "Released").map((item) => (
                <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 h-16 w-16">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#1e3a5f] to-[#2c4a6b] flex items-center justify-center">
                        <FontAwesomeIcon icon={faTrophy} className="text-white text-xl" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{item.winner.name}</h3>
                      <p className="text-sm text-gray-600">{item.itemName}</p>
                      <p className="text-sm font-semibold text-[#1e3a5f]">{item.value}</p>
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
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">{item.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Due Date:</span>
                      <span className="text-sm font-medium">{item.dueDate}</span>
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
        )}

        {activeTab === "inspection" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Inspection Details & Management</h2>
            <div className="space-y-6">
              {filteredData.map((item) => (
                <div key={item.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.itemName}</h3>
                      <p className="text-sm text-gray-600">{item.id}</p>
                    </div>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getInspectionStatusColor(item.inspection.status)}`}>
                      {item.inspection.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Inspector Details</h4>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          <FontAwesomeIcon icon={faUser} className="mr-2 text-[#1e3a5f]" />
                          {item.inspection.inspector}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Inspection Time</h4>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-[#1e3a5f]" />
                          {item.inspection.date}
                        </p>
                        <p className="text-sm text-gray-600">
                          <FontAwesomeIcon icon={faClock} className="mr-2 text-[#1e3a5f]" />
                          {item.inspection.time}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Item Value</h4>
                      <p className="text-lg font-semibold text-[#1e3a5f]">{item.value}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Inspection Notes</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{item.inspection.notes}</p>
                  </div>
                  
                  <div className="mt-4 flex justify-end space-x-2">
                    <button className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                      <FontAwesomeIcon icon={faDownload} className="mr-2" />
                      Download Report
                    </button>
                    <button className="flex items-center px-3 py-1 text-sm bg-[#1e3a5f] text-white rounded-md hover:bg-[#2c4a6b]">
                      <FontAwesomeIcon icon={faEdit} className="mr-2" />
                      Update Inspection
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Inspection Details Modal */}
      {showInspectionModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Inspection Details</h2>
                <button 
                  onClick={() => setShowInspectionModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
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
