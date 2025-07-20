import CustomHeader from "../../components/custom-header";
import Footer from "../../components/footer";
import NavBar from "../../components/navbar";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faClock,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Filter } from "lucide-react";

import Card from "../../components/ui/card";

import avimg from "../../assets/av1.png";
import mustang from "../../assets/mustang.jpg";
import royal from "../../assets/royal.jpg";
import sword from "../../assets/sword.png";
import bicycle from "../../assets/bicycle.JPG";
import bronze from "../../assets/bronze.jpg";
const MyBiddingHistory = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("all-bids");

  const items = [
    {
      id: 1,
      title: "Classic Car",
      description: "A well-maintained 1967 Ford Mustang in original condition.",
      images: [mustang, "mustang.png"],
      status: "ending-soon",
      currentBid: 25000000,
      startingBid: 2000000,
      timeLeft: "3 days 4 hours",
      totalBids: 15,
      location: "Colombo, Sri Lanka",
    },
    {
      id: 2,
      title: "Vintage Motorcycle",
      description: "A rare 1950s Royal Enfield Bullet, fully restored.",
      images: [royal, "enfield.png"],
      status: "active",
      currentBid: 800000,
      startingBid: 600000,
      timeLeft: "1 day 8 hours",
      totalBids: 10,
      location: "Kandy, Sri Lanka",
    },
    {
      id: 3,
      title: "Antique Bicycle",
      description: "Classic Raleigh bicycle from the 1940s, in working order.",
      images: [bicycle, "bicycle.png"],
      status: "ending-soon",
      currentBid: 120000,
      startingBid: 90000,
      timeLeft: "2 days 2 hours",
      totalBids: 7,
      location: "Galle, Sri Lanka",
    },
    {
      id: 4,
      title: "Bronze Sculpture",
      description: "Handcrafted bronze sculpture from the 19th century.",
      images: [bronze, "sculpture.png"],
      status: "active",
      currentBid: 1800000,
      startingBid: 120000,
      timeLeft: "2 days 10 hours",
      totalBids: 18,
      location: "Negombo, Sri Lanka",
    },
    {
      id: 5,
      title: "Ancient Sword",
      description: "An ancient ceremonial sword with intricate designs.",
      images: [sword, "sword.png"],
      status: "active",
      currentBid: 2700,
      startingBid: 2000,
      timeLeft: "3 days 8 hours",
      totalBids: 19,
      location: "Anuradhapura, Sri Lanka",
    },
    {
      id: 6,
      title: "Ancient Vass",
      description: "An ancient vass from Itali.",
      images: [avimg, "figurine.png"],
      status: "ended",
      currentBid: 600,
      startingBid: 400,
      timeLeft: "0 hours",
      totalBids: 10,
      location: "Batticaloa, Sri Lanka",
    },
  ];

  const favoriteItems = items.filter((item) => item.id === 1 || item.id === 2); // Example
  const bidHistoryItems = items.filter(
    (item) => item.id === 3 || item.id === 4
  ); // Example
  const pendingItems = items.filter((item) => item.status === "pending"); // Example: add status to items if needed

  return (
    <>
      <CustomHeader />
      <NavBar />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FontAwesomeIcon icon={faSearch} />
              </span>

              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>
          </div>

          <div className="w-full md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{t("allCategories")}</option>
              <option value="vehicles">{t("vehicles")}</option>
              <option value="electronics">{t("electronics")}</option>
              <option value="jewelry">{t("jewelryWatches")}</option>
              <option value="clothing">{t("clothingAccessories")}</option>
              <option value="machinery">{t("machinery")}</option>
              <option value="other">{t("otherItems")}</option>
            </select>
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter size={15} className="mr-2" /> {t("moreFilters")}
          </button>
        </div>
        {/* New Tabs */}
        <div className="w-full flex grid-cols-4 gap-2 mb-4 bg-gray-100 text-gray-700 p-1 rounded-md shadow-xs">
          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
              activeTab === "all-bids"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("all-bids")}
          >
            All Bids
          </button>
          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
              activeTab === "active"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("active")}
          >
            Active
          </button>
          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
              activeTab === "won"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("won")}
          >
            Won
          </button>
          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
              activeTab === "lost"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("lost")}
          >
            Lost
          </button>
        </div>
      </section>
      {/* Tab Content */}
      {activeTab === "all-bids" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 md:px-20 lg:px-60">
          {items.map((item) => (
            <Card key={item.id} item={item} />
          ))}
          {items.length === 0 && (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-4xl mb-4 text-gray-400"
              />
              <h2 className="text-xl mb-3 font-semibold">No Bids Found</h2>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      )}
      {activeTab === "active" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 md:px-20 lg:px-60">
          {items
            .filter((item) => item.status === "active")
            .map((item) => (
              <Card key={item.id} item={item} />
            ))}
          {items.filter((item) => item.status === "active").length === 0 && (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-4xl mb-4 text-gray-400"
              />
              <h2 className="text-xl mb-3 font-semibold">No Active Bids</h2>
              <p>There are no active bids at the moment.</p>
            </div>
          )}
        </div>
      )}
      {activeTab === "won" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 md:px-20 lg:px-60">
          {items
            .filter((item) => item.status === "won")
            .map((item) => (
              <Card key={item.id} item={item} />
            ))}
          {items.filter((item) => item.status === "won").length === 0 && (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-4xl mb-4 text-gray-400"
              />
              <h2 className="text-xl mb-3 font-semibold">No Won Bids</h2>
              <p>You haven't won any auctions yet.</p>
            </div>
          )}
        </div>
      )}
      {activeTab === "lost" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 md:px-20 lg:px-60">
          {items
            .filter((item) => item.status === "lost")
            .map((item) => (
              <Card key={item.id} item={item} />
            ))}
          {items.filter((item) => item.status === "lost").length === 0 && (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-4xl mb-4 text-gray-400"
              />
              <h2 className="text-xl mb-3 font-semibold">No Lost Bids</h2>
              <p>You haven't lost any auctions yet.</p>
            </div>
          )}
        </div>
      )}
      <Footer />
    </>
  );
};
export default MyBiddingHistory;
