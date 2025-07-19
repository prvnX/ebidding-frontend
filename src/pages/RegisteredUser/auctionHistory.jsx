import CustomHeader from "../../components/custom-header";
import Footer from "../../components/footer";
import NavBar from "../../components/navbar";
import breadCrumb from "../../components/ui/breadCrumb";

import React, { use, useState,useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faClock,
  faCheckCircle,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { Filter } from "lucide-react";

import Card from "../../components/ui/card";

import avimg from "../../assets/av1.png";
import mustang from "../../assets/mustang.jpg";
import royal from "../../assets/royal.jpg";
import sword from "../../assets/sword.png";
import bicycle from "../../assets/bicycle.JPG";
import bronze from "../../assets/bronze.jpg";
import EndedItemCard from "../../components/ui/userCards/endedItemCard";
const Dashboard = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("all-items");

  const items = [
  {
    id: 1,
    title: "Classic Car",
    description: "A well-maintained 1967 Ford Mustang in original condition.",
    images: [mustang, "mustang.png"],
    location: "Colombo, Sri Lanka",
    startDate: new Date("2025-07-01T09:00:00Z"),
    endDate: new Date("2025-07-05T18:00:00Z"),
    startBid: 2000000,
    finalPrice: 25000000,
    totalBids: 15,
    status: "not-bid",
  },
  {
    id: 2,
    title: "Vintage Motorcycle",
    description: "A rare 1950s Royal Enfield Bullet, fully restored.",
    images: [royal, "enfield.png"],
    location: "Kandy, Sri Lanka",
    startDate: new Date("2025-07-03T09:00:00Z"),
    endDate: new Date("2025-07-06T18:00:00Z"),
    startBid: 600000,
    finalPrice: 800000,
    totalBids: 10,
    status: "not-bid",
  },
  {
    id: 3,
    title: "Antique Bicycle",
    description: "Classic Raleigh bicycle from the 1940s, in working order.",
    images: [bicycle, "bicycle.png"],
    location: "Galle, Sri Lanka",
    startDate: new Date("2025-06-29T09:00:00Z"),
    endDate: new Date("2025-07-03T18:00:00Z"),
    startBid: 90000,
    finalPrice: 120000,
    totalBids: 7,
    status: "won",
  },
  {
    id: 4,
    title: "Bronze Sculpture",
    description: "Handcrafted bronze sculpture from the 19th century.",
    images: [bronze, "sculpture.png"],
    location: "Negombo, Sri Lanka",
    startDate: new Date("2025-07-02T09:00:00Z"),
    endDate: new Date("2025-07-06T15:00:00Z"),
    startBid: 120000,
    finalPrice: 1800000,
    totalBids: 18,
    status: "not-bid",
  },
  {
    id: 5,
    title: "Ancient Sword",
    description: "An ancient ceremonial sword with intricate designs.",
    images: [sword, "sword.png"],
    location: "Anuradhapura, Sri Lanka",
    startDate: new Date("2025-06-30T09:00:00Z"),
    endDate: new Date("2025-07-04T18:00:00Z"),
    startBid: 2000,
    finalPrice: 2700,
    totalBids: 19,
    status: "won",
  },
  {
    id: 6,
    title: "Ancient Vass",
    description: "An ancient vass from Italy.",
    images: [avimg, "figurine.png"],
    location: "Batticaloa, Sri Lanka",
    startDate: new Date("2025-06-25T09:00:00Z"),
    endDate: new Date("2025-07-01T18:00:00Z"),
    startBid: 400,
    finalPrice: 600,
    totalBids: 10,
    status: "lost",
  },
];
useEffect(() => {
  // Fetch items from API or perform any necessary setup
  setActiveTab("all-time");
}, []);
  

  return (
    <>
      <CustomHeader />
      <NavBar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* <div className="flex items-center justify-between mb-6 border-1">
        <breadCrumb
          breadCrumbs={[
            { title: t("home"), link: "/" },
            { title: t("auctionHistory"), link: "/auctionHistory" },
          ]}
          page={t("auctionHistory")}
        />
        </div> */}
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
              activeTab === "all-time"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("all-time")}
          >
            All Time
          </button>
          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
              activeTab === "week"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("week")}
          >
            Last Week
          </button>
          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
              activeTab === "month"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("month")}
          >
            Last Month
          </button>
          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
              activeTab === "year"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("year")}
          >
            Last Year
          </button>
        </div>
        
      </section>
      {/* Tab Content */}
      {activeTab === "all-time" && (
        <div className="grid grid-cols-1  gap-6 px-5 md:px-20 lg:px-60">
          {items.map((item) => (
            <EndedItemCard key={item.id} item={item} />
          ))}
          {items.length === 0 && (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-4xl mb-4 text-gray-400"
              />
              <h2 className="text-xl mb-3 font-semibold">No Items Found</h2>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      )}
      {activeTab === "week" && (
                <div className="grid grid-cols-1  gap-6 px-5 md:px-20 lg:px-60">
          {items.map((item) => (
            <EndedItemCard key={item.id} item={item} />
          ))}
          {items.length === 0 && (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-4xl mb-4 text-gray-400"
              />
              <h2 className="text-xl mb-3 font-semibold">No Items Found</h2>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      )}
      {activeTab === "month" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 md:px-20 lg:px-60">
          {items
            .filter((item) => item.status === "ending-soon")
            .map((item) => (
              <Card key={item.id} item={item} />
            ))}
          {items.filter((item) => item.status === "ending-soon").length === 0 && (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon
                icon={faWarning}
                className="text-4xl mb-4 text-gray-400"
              />
              <h2 className="text-xl mb-3 font-semibold">
                Last Month Auctions
              </h2>
              <p>Last Month Auctions will be appeared here.</p>
            </div>
          )}
        </div>
      )}
      {activeTab === "year" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 md:px-20 lg:px-60">
          {items
            .filter((item) => item.status === "ended")
            .map((item) => (
              <Card key={item.id} item={item} />
            ))}
          {items.filter((item) => item.status === "ended").length === 0 && (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon
                icon={faWarning}
                className="text-4xl mb-4 text-gray-400"
              />
              <h2 className="text-xl mb-3 font-semibold">Last Year Auctions</h2>
              <p>Last year auctions will be appeared here.</p>
            </div>
          )}
        </div>
      )}
      <Footer />
    </>
  );
};
export default Dashboard;
