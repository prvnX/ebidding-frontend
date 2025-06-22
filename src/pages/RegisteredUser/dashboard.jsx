import CustomHeader from "../../components/custom-header";
import Footer from "../../components/footer";
import NavBar from "../../components/navbar";

import React, { useState } from "react";
// import { Link } from "react-router-dom";
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
const Dashboard = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("active");

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
      status: "active",
      currentBid: 600,
      startingBid: 400,
      timeLeft: "8 hours",
      totalBids: 10,
      location: "Batticaloa, Sri Lanka",
    },
  ];
  return (
    <>
      <CustomHeader />
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Hello user</h1>
      </div>
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
        <div className=" w-full flex grid-cols-4 gap-2 mb-4 bg-gray-100 text-gray-700 p-1 rounded-md shadow-xs">
          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded  cursor-pointer ${
              activeTab === "active"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("active")}
          >
            {t("activeAuctionsTab")}
          </button>

          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
              activeTab === "ending-soon"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 "
            }`}
            onClick={() => setActiveTab("ending-soon")}
          >
            {t("endingSoon")}
          </button>

          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
              activeTab === "completed"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            {t("completed")}
          </button>
        </div>
      </section>
      {activeTab === "active" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  px-5 md:px-20 lg:px-60">
          {items.map((item) => (
            <Card key={item.id} item={item} />
          ))}
          {items.length === 0 && (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-4xl mb-4 text-gray-400"
              />
              <h2 className="text-xl mb-3 font-semibold">
                {" "}
                {t("noActiveAuctions")}
              </h2>
              <p>{t("noActiveAuctionsPara")}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "ending-soon" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  px-5 md:px-20 lg:px-60">
          {items.map(
            (item) =>
              item.status === "ending-somon" && (
                <Card key={item.id} item={item} />
              )
          )}
          {items.filter((item) => item.status === "ending-somon").length ===
            0 && (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon
                icon={faClock}
                className="text-4xl mb-4 text-gray-400"
              />
              <h2 className="text-xl mb-3 font-semibold">
                {" "}
                {t("noEndingSoonAuctions")}
              </h2>
              <p>{t("noEndingSoonAuctionsPara")}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "completed" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  px-5 md:px-20 lg:px-60">
          {items.map(
            (item) =>
              item.status === "completed" && <Card key={item.id} item={item} />
          )}

          {items.filter((item) => item.status === "completed").length === 0 && (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-4xl mb-4 text-gray-400"
              />
              <h2 className="text-xl mb-3 font-semibold">
                {" "}
                {t("noCompletedAuctions")}
              </h2>
              <p>{t("noCompletedAuctionsPara")}</p>
            </div>
          )}
        </div>
      )}

      <Footer />
    </>
  );
};
export default Dashboard;
