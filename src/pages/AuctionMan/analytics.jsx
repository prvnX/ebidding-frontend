import React, { useState } from "react";
import CountUp from "react-countup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faMoneyBillWave, 
  faGavel, 
  faUsers,
  faDownload,
  faArrowUp,
  faArrowDown,
  faChartBar,
  faFileInvoice,
  faPrint
} from '@fortawesome/free-solid-svg-icons';
import CustomHeader from "../../components/custom-header";
import AuctionManHeader from "../../components/auctionMan-header";
import Footer from "../../components/footer";
import { generatePDFReport } from "../../utils/pdfReportGenerator";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function AuctionManAnalytics() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Mock data - Replace with actual API calls
  const analyticsData = {
    totalRevenue: 1250000,
    totalProfit: 315000,
    totalAuctions: 45,
    totalBids: 1250,
    totalItems: 180,
    successRate: 87.5,
    averageBidPerItem: 6.94,
    topCategory: "Vehicles",
    
    monthlyComparison: {
      revenueChange: 12.5,
      profitChange: 8.3,
      auctionsChange: -2.1,
      bidsChange: 15.7
    },

    categoryBreakdown: [
      { name: "Vehicles", revenue: 680000, profit: 170000, items: 78, percentage: 54.4 },
      { name: "Jewelry", revenue: 320000, profit: 80000, items: 45, percentage: 25.6 },
      { name: "General", revenue: 250000, profit: 65000, items: 57, percentage: 20.0 }
    ],

    weeklyPerformance: [
      { week: "Week 1", revenue: 280000, auctions: 10 },
      { week: "Week 2", revenue: 350000, auctions: 12 },
      { week: "Week 3", revenue: 295000, auctions: 11 },
      { week: "Week 4", revenue: 325000, auctions: 12 }
    ],

    topItems: [
      { name: "Toyota Prado 2020", finalBid: 8500000, bids: 45, category: "Vehicles" },
      { name: "Gold Necklace Set", finalBid: 450000, bids: 28, category: "Jewelry" },
      { name: "Samsung LED TV 65\"", finalBid: 180000, bids: 15, category: "General" },
      { name: "Honda Civic 2019", finalBid: 6200000, bids: 38, category: "Vehicles" },
      { name: "Diamond Ring", finalBid: 385000, bids: 22, category: "Jewelry" }
    ]
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const downloadPDFReport = () => {
    generatePDFReport(analyticsData, selectedMonth, selectedYear);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <>
      <CustomHeader />
      <AuctionManHeader>
        <div className="flex gap-2">
          <Link
            to="/AuctionMan"
            className="bg-white/10 text-white hover:bg-white/20 rounded-lg py-2 px-4 flex items-center border border-white/20 cursor-pointer transition-colors"
          >
            <Home size={15} className="mr-2" />
            Dashboard
          </Link>
          <button
            onClick={downloadPDFReport}
            className="bg-white text-[#1e3a5f] hover:bg-gray-100 rounded-lg py-2 px-4 flex items-center cursor-pointer transition-colors"
          >
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Download Report
          </button>
          <button
            onClick={printReport}
            className="bg-white/10 text-white hover:bg-white/20 border border-white/20 rounded-lg py-2 px-4 flex items-center cursor-pointer transition-colors"
          >
            <FontAwesomeIcon icon={faPrint} className="mr-2" />
            Print
          </button>
        </div>
      </AuctionManHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Month/Year Selector */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#1e3a5f] mb-2">Monthly Analytics Report</h1>
              <p className="text-gray-600">Comprehensive overview of auction performance and profitability</p>
            </div>
            <div className="flex gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                >
                  {months.map((month, index) => (
                    <option key={index} value={index}>{month}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Revenue */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg p-6 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Revenue</p>
                <h2 className="text-3xl font-bold mt-2">
                  <CountUp start={0} end={analyticsData.totalRevenue} duration={2} separator="," prefix="Rs. " />
                </h2>
              </div>
              <div className="bg-white/20 rounded-full p-3">
                <FontAwesomeIcon icon={faMoneyBillWave} className="text-2xl" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <FontAwesomeIcon 
                icon={analyticsData.monthlyComparison.revenueChange > 0 ? faArrowUp : faArrowDown} 
                className="mr-2" 
              />
              <span className={analyticsData.monthlyComparison.revenueChange > 0 ? "text-green-200" : "text-red-200"}>
                {Math.abs(analyticsData.monthlyComparison.revenueChange)}% from last month
              </span>
            </div>
          </div>

          {/* Total Profit */}
          <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg shadow-lg p-6 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-green-100 text-sm font-medium">Total Profit</p>
                <h2 className="text-3xl font-bold mt-2">
                  <CountUp start={0} end={analyticsData.totalProfit} duration={2} separator="," prefix="Rs. " />
                </h2>
              </div>
              <div className="bg-white/20 rounded-full p-3">
                <FontAwesomeIcon icon={faChartLine} className="text-2xl" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <FontAwesomeIcon 
                icon={analyticsData.monthlyComparison.profitChange > 0 ? faArrowUp : faArrowDown} 
                className="mr-2" 
              />
              <span className={analyticsData.monthlyComparison.profitChange > 0 ? "text-green-200" : "text-red-200"}>
                {Math.abs(analyticsData.monthlyComparison.profitChange)}% from last month
              </span>
            </div>
          </div>

          {/* Total Auctions */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg shadow-lg p-6 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Auctions</p>
                <h2 className="text-3xl font-bold mt-2">
                  <CountUp start={0} end={analyticsData.totalAuctions} duration={2} />
                </h2>
              </div>
              <div className="bg-white/20 rounded-full p-3">
                <FontAwesomeIcon icon={faGavel} className="text-2xl" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <FontAwesomeIcon 
                icon={analyticsData.monthlyComparison.auctionsChange > 0 ? faArrowUp : faArrowDown} 
                className="mr-2" 
              />
              <span className={analyticsData.monthlyComparison.auctionsChange > 0 ? "text-green-200" : "text-red-200"}>
                {Math.abs(analyticsData.monthlyComparison.auctionsChange)}% from last month
              </span>
            </div>
          </div>

          {/* Total Bids */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg shadow-lg p-6 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-orange-100 text-sm font-medium">Total Bids</p>
                <h2 className="text-3xl font-bold mt-2">
                  <CountUp start={0} end={analyticsData.totalBids} duration={2} separator="," />
                </h2>
              </div>
              <div className="bg-white/20 rounded-full p-3">
                <FontAwesomeIcon icon={faUsers} className="text-2xl" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <FontAwesomeIcon 
                icon={analyticsData.monthlyComparison.bidsChange > 0 ? faArrowUp : faArrowDown} 
                className="mr-2" 
              />
              <span className={analyticsData.monthlyComparison.bidsChange > 0 ? "text-green-200" : "text-red-200"}>
                {Math.abs(analyticsData.monthlyComparison.bidsChange)}% from last month
              </span>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Items Sold</p>
                <h3 className="text-2xl font-bold text-[#1e3a5f] mt-1">
                  <CountUp start={0} end={analyticsData.totalItems} duration={2} />
                </h3>
              </div>
              <FontAwesomeIcon icon={faChartBar} className="text-3xl text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Success Rate</p>
                <h3 className="text-2xl font-bold text-[#1e3a5f] mt-1">
                  <CountUp start={0} end={analyticsData.successRate} duration={2} decimals={1} suffix="%" />
                </h3>
              </div>
              <FontAwesomeIcon icon={faArrowUp} className="text-3xl text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg Bids/Item</p>
                <h3 className="text-2xl font-bold text-[#1e3a5f] mt-1">
                  <CountUp start={0} end={analyticsData.averageBidPerItem} duration={2} decimals={2} />
                </h3>
              </div>
              <FontAwesomeIcon icon={faGavel} className="text-3xl text-purple-500" />
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-[#1e3a5f] mb-6 flex items-center">
            <FontAwesomeIcon icon={faChartBar} className="mr-3" />
            Category Performance Breakdown
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Category</th>
                  <th className="text-right py-3 px-4 text-gray-700 font-semibold">Revenue</th>
                  <th className="text-right py-3 px-4 text-gray-700 font-semibold">Profit</th>
                  <th className="text-right py-3 px-4 text-gray-700 font-semibold">Items Sold</th>
                  <th className="text-right py-3 px-4 text-gray-700 font-semibold">Share</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Performance</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.categoryBreakdown.map((category, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{category.name}</div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="text-gray-900 font-semibold">{formatCurrency(category.revenue)}</div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="text-green-600 font-semibold">{formatCurrency(category.profit)}</div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="text-gray-700">{category.items}</div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="text-blue-600 font-medium">{category.percentage}%</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Weekly Performance Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-[#1e3a5f] mb-6 flex items-center">
            <FontAwesomeIcon icon={faChartLine} className="mr-3" />
            Weekly Performance Trend
          </h2>
          <div className="space-y-4">
            {analyticsData.weeklyPerformance.map((week, index) => (
              <div key={index} className="flex items-center">
                <div className="w-24 text-sm font-medium text-gray-700">{week.week}</div>
                <div className="flex-1 mx-4">
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-8 rounded-full flex items-center justify-end pr-3 text-white text-sm font-semibold transition-all duration-500"
                        style={{ width: `${(week.revenue / 400000) * 100}%` }}
                      >
                        {formatCurrency(week.revenue)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-32 text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    <FontAwesomeIcon icon={faGavel} className="mr-2" />
                    {week.auctions} Auctions
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Items */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-[#1e3a5f] mb-6 flex items-center">
            <FontAwesomeIcon icon={faFileInvoice} className="mr-3" />
            Top Performing Items
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Rank</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Item Name</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Category</th>
                  <th className="text-right py-3 px-4 text-gray-700 font-semibold">Final Bid</th>
                  <th className="text-right py-3 px-4 text-gray-700 font-semibold">Total Bids</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.topItems.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1e3a5f] text-white font-bold">
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{item.name}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        item.category === 'Vehicles' ? 'bg-blue-100 text-blue-800' :
                        item.category === 'Jewelry' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="text-green-600 font-bold">{formatCurrency(item.finalBid)}</div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="text-gray-700 font-medium">{item.bids}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6b] rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Monthly Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-blue-200 text-sm mb-2">Report Period</p>
              <p className="text-xl font-semibold">{months[selectedMonth]} {selectedYear}</p>
            </div>
            <div>
              <p className="text-blue-200 text-sm mb-2">Top Performing Category</p>
              <p className="text-xl font-semibold">{analyticsData.topCategory}</p>
            </div>
            <div>
              <p className="text-blue-200 text-sm mb-2">Profit Margin</p>
              <p className="text-xl font-semibold">
                {((analyticsData.totalProfit / analyticsData.totalRevenue) * 100).toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-blue-200 text-sm mb-2">Report Generated</p>
              <p className="text-xl font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
