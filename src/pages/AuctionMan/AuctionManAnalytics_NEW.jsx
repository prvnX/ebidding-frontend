// Updated AuctionManAnalytics.jsx with real database integration
import React, { useState, useEffect } from "react";
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
import analyticsService from "../../services/analyticsService";

export default function AuctionManAnalytics() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // 1-12
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  // Fetch analytics data when month or year changes
  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedMonth, selectedYear]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getMonthlyAnalytics(selectedMonth, selectedYear);
      setAnalyticsData(data);
    } catch (err) {
      setError('Failed to fetch analytics data. Please try again.');
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const downloadPDFReport = () => {
    if (analyticsData) {
      generatePDFReport(analyticsData, selectedMonth - 1, selectedYear);
    }
  };

  const printReport = () => {
    window.print();
  };

  if (loading) {
    return (
      <>
        <CustomHeader />
        <AuctionManHeader />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#1e3a5f] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading analytics data...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <CustomHeader />
        <AuctionManHeader />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
            <button
              onClick={fetchAnalyticsData}
              className="bg-[#1e3a5f] text-white px-6 py-2 rounded-lg hover:bg-[#2d4a6b]"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!analyticsData || !analyticsData.analytics) {
    return null;
  }

  const { analytics, categoryBreakdown, weeklyPerformance, topItems } = analyticsData;

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
                    <option key={index} value={index + 1}>{month}</option>
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
                  <CountUp start={0} end={analytics.totalRevenue} duration={2} separator="," prefix="Rs. " />
                </h2>
              </div>
              <div className="bg-white/20 rounded-full p-3">
                <FontAwesomeIcon icon={faMoneyBillWave} className="text-2xl" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <FontAwesomeIcon
                icon={analytics.monthlyComparison.revenueChange > 0 ? faArrowUp : faArrowDown}
                className="mr-2"
              />
              <span className={analytics.monthlyComparison.revenueChange > 0 ? "text-green-200" : "text-red-200"}>
                {Math.abs(analytics.monthlyComparison.revenueChange).toFixed(1)}% from last month
              </span>
            </div>
          </div>

          {/* Total Profit */}
          <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg shadow-lg p-6 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-green-100 text-sm font-medium">Total Profit</p>
                <h2 className="text-3xl font-bold mt-2">
                  <CountUp start={0} end={analytics.totalProfit} duration={2} separator="," prefix="Rs. " />
                </h2>
              </div>
              <div className="bg-white/20 rounded-full p-3">
                <FontAwesomeIcon icon={faChartLine} className="text-2xl" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <FontAwesomeIcon
                icon={analytics.monthlyComparison.profitChange > 0 ? faArrowUp : faArrowDown}
                className="mr-2"
              />
              <span className={analytics.monthlyComparison.profitChange > 0 ? "text-green-200" : "text-red-200"}>
                {Math.abs(analytics.monthlyComparison.profitChange).toFixed(1)}% from last month
              </span>
            </div>
          </div>

          {/* Total Auctions */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg shadow-lg p-6 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Auctions</p>
                <h2 className="text-3xl font-bold mt-2">
                  <CountUp start={0} end={analytics.totalAuctions} duration={2} />
                </h2>
              </div>
              <div className="bg-white/20 rounded-full p-3">
                <FontAwesomeIcon icon={faGavel} className="text-2xl" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <FontAwesomeIcon
                icon={analytics.monthlyComparison.auctionsChange > 0 ? faArrowUp : faArrowDown}
                className="mr-2"
              />
              <span className={analytics.monthlyComparison.auctionsChange > 0 ? "text-green-200" : "text-red-200"}>
                {Math.abs(analytics.monthlyComparison.auctionsChange).toFixed(1)}% from last month
              </span>
            </div>
          </div>

          {/* Total Bids */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg shadow-lg p-6 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-orange-100 text-sm font-medium">Total Bids</p>
                <h2 className="text-3xl font-bold mt-2">
                  <CountUp start={0} end={analytics.totalBids} duration={2} separator="," />
                </h2>
              </div>
              <div className="bg-white/20 rounded-full p-3">
                <FontAwesomeIcon icon={faUsers} className="text-2xl" />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <FontAwesomeIcon
                icon={analytics.monthlyComparison.bidsChange > 0 ? faArrowUp : faArrowDown}
                className="mr-2"
              />
              <span className={analytics.monthlyComparison.bidsChange > 0 ? "text-green-200" : "text-red-200"}>
                {Math.abs(analytics.monthlyComparison.bidsChange).toFixed(1)}% from last month
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
                  <CountUp start={0} end={analytics.totalItems} duration={2} />
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
                  <CountUp start={0} end={analytics.successRate} duration={2} decimals={1} suffix="%" />
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
                  <CountUp start={0} end={analytics.averageBidPerItem} duration={2} decimals={2} />
                </h3>
              </div>
              <FontAwesomeIcon icon={faGavel} className="text-3xl text-purple-500" />
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        {categoryBreakdown && categoryBreakdown.length > 0 && (
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
                  {categoryBreakdown.map((category, index) => (
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
                        <div className="text-blue-600 font-medium">{category.percentage.toFixed(1)}%</div>
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
        )}

        {/* Weekly Performance Chart */}
        {weeklyPerformance && weeklyPerformance.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-[#1e3a5f] mb-6 flex items-center">
              <FontAwesomeIcon icon={faChartLine} className="mr-3" />
              Weekly Performance Trend
            </h2>
            <div className="space-y-4">
              {weeklyPerformance.map((week, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-700">{week.week}</div>
                  <div className="flex-1 mx-4">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-8 rounded-full flex items-center justify-end pr-3 text-white text-sm font-semibold transition-all duration-500"
                          style={{
                            width: `${Math.min((week.revenue / Math.max(...weeklyPerformance.map(w => w.revenue))) * 100, 100)}%`
                          }}
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
        )}

        {/* Top Performing Items */}
        {topItems && topItems.length > 0 && (
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
                  {topItems.map((item, index) => (
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
        )}

        {/* Summary Card */}
        <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6b] rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Monthly Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-blue-200 text-sm mb-2">Report Period</p>
              <p className="text-xl font-semibold">{months[selectedMonth - 1]} {selectedYear}</p>
            </div>
            <div>
              <p className="text-blue-200 text-sm mb-2">Top Performing Category</p>
              <p className="text-xl font-semibold">{analytics.topCategory}</p>
            </div>
            <div>
              <p className="text-blue-200 text-sm mb-2">Profit Margin</p>
              <p className="text-xl font-semibold">
                {analytics.totalRevenue > 0
                  ? ((analytics.totalProfit / analytics.totalRevenue) * 100).toFixed(1)
                  : 0}%
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

