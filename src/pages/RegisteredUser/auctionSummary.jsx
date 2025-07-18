import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendarAlt,
  faGavel,
  faUsers,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import CustomHeader from "../../components/custom-header";
import Footer from "../../components/footer";
import NavBar from "../../components/navbar";
import { formatCurrency, formatDate } from "../../function";

// Import sample images - replace with actual images
import furnitureImg from "../../assets/av1.png";

const AuctionSummary = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { auctionId } = useParams();

  // Sample data - replace with API call
  const [auctionData, setAuctionData] = useState({
    id: "A-2024-015",
    title: "Antique Furniture Set",
    image: furnitureImg,
    status: "AUCTION ENDED",
    startingBid: 40000,
    finalBid: 90000,
    totalBids: 12,
    endedOn: "2024-12-08",
    biddingHistory: [
      {
        bidder: "ArtLover01",
        amount: 25000,
        timestamp: "2024-12-08 10:00",
      },
      {
        bidder: "Gallery02",
        amount: 35000,
        timestamp: "2024-12-08 16:00",
      },
      {
        bidder: "Collector03",
        amount: 45000,
        timestamp: "2024-12-08 22:00",
      },
      {
        bidder: "ArtDealer",
        amount: 65000,
        timestamp: "2024-12-09 04:00",
      },
      {
        bidder: "Museum01",
        amount: 78000,
        timestamp: "2024-12-09 10:00",
      },
      {
        bidder: "PrivateCollector",
        amount: 85000,
        timestamp: "2024-12-09 18:00",
      },
    ],
    biddingProgress: [
      { time: "Start", amount: 40000 },
      { time: "6h", amount: 48000 },
      { time: "12h", amount: 62000 },
      { time: "18h", amount: 75000 },
      { time: "24h", amount: 85000 },
      { time: "End", amount: 90000 },
    ],
  });

  const totalGain = auctionData.finalBid - auctionData.startingBid;
  const gainPercentage = ((totalGain / auctionData.startingBid) * 100).toFixed(
    0
  );

  // Chart component for bidding progress
  const BiddingChart = ({ data }) => {
    const maxAmount = Math.max(...data.map((item) => item.amount));
    const minAmount = Math.min(...data.map((item) => item.amount));
    const range = maxAmount - minAmount;

    return (
      <div className="relative h-48 bg-gray-50 rounded-lg p-4">
        <div className="relative h-full">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
            <span>{Math.round(maxAmount / 1000)}K</span>
            <span>
              {Math.round((maxAmount * 0.75 + minAmount * 0.25) / 1000)}K
            </span>
            <span>
              {Math.round((maxAmount * 0.5 + minAmount * 0.5) / 1000)}K
            </span>
            <span>
              {Math.round((maxAmount * 0.25 + minAmount * 0.75) / 1000)}K
            </span>
            <span>{Math.round(minAmount / 1000)}K</span>
          </div>

          {/* Chart area */}
          <div className="ml-12 h-full relative">
            <svg className="w-full h-full" viewBox="0 0 300 160">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={i * 40}
                  x2="300"
                  y2={i * 40}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              ))}

              {/* Chart line */}
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                points={data
                  .map((point, index) => {
                    const x = (index / (data.length - 1)) * 300;
                    const y = 160 - ((point.amount - minAmount) / range) * 160;
                    return `${x},${y}`;
                  })
                  .join(" ")}
              />

              {/* Data points */}
              {data.map((point, index) => {
                const x = (index / (data.length - 1)) * 300;
                const y = 160 - ((point.amount - minAmount) / range) * 160;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#3b82f6"
                    stroke="white"
                    strokeWidth="2"
                  />
                );
              })}

              {/* Shaded area under curve */}
              <polygon
                fill="rgba(59, 130, 246, 0.1)"
                points={`0,160 ${data
                  .map((point, index) => {
                    const x = (index / (data.length - 1)) * 300;
                    const y = 160 - ((point.amount - minAmount) / range) * 160;
                    return `${x},${y}`;
                  })
                  .join(" ")} 300,160`}
              />
            </svg>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
              {data.map((point, index) => (
                <span key={index}>{point.time}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomHeader />
      <NavBar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Item Details and Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Item Details Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Auction Item</h2>
              <div className="flex items-start space-x-4">
                <img
                  src={auctionData.image}
                  alt={auctionData.title}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {auctionData.title}
                    </h3>
                    <span className="inline-block bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full">
                      {auctionData.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">
                    Auction ID: {auctionData.id}
                  </p>
                </div>
              </div>
            </div>

            {/* Auction Results Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FontAwesomeIcon icon={faGavel} className="mr-2" />
                Auction Results
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-gray-400 pl-4">
                    <p className="text-sm text-gray-500 uppercase tracking-wide">
                      Starting Bid
                    </p>
                    <p className="text-2xl font-bold text-gray-700">
                      {formatCurrency(auctionData.startingBid)}
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-400 pl-4">
                    <p className="text-sm text-gray-500 uppercase tracking-wide">
                      Total Bids
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {auctionData.totalBids}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="text-sm text-gray-500 uppercase tracking-wide">
                      Final Bid
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(auctionData.finalBid)}
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-400 pl-4">
                    <p className="text-sm text-gray-500 uppercase tracking-wide">
                      Ended On
                    </p>
                    <p className="text-2xl font-bold text-purple-600">
                      {auctionData.endedOn}
                    </p>
                  </div>
                </div>
              </div>

              {/* Total Gain Highlight */}
              <div className="mt-6 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faTrophy}
                      className="text-green-600 mr-3 text-xl"
                    />
                    <div>
                      <p className="text-sm text-green-700 font-medium">
                        Total Gain
                      </p>
                      <p className="text-3xl font-bold text-green-600">
                        +{formatCurrency(totalGain)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-700">Return</p>
                    <p className="text-2xl font-bold text-green-600">
                      {gainPercentage}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bidding Progress Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Bidding Progress</h2>
              <BiddingChart data={auctionData.biddingProgress} />
            </div>
          </div>

          {/* Right Column - Bidding History */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Bidding History</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {auctionData.biddingHistory.map((bid, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-blue-200 pl-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {bid.bidder}
                        </p>
                        <p className="text-sm text-gray-500">{bid.timestamp}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 text-lg">
                          {formatCurrency(bid.amount)}
                        </p>
                        {index === auctionData.biddingHistory.length - 1 && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Winning Bid
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AuctionSummary;
