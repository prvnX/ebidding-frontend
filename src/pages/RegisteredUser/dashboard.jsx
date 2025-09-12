import CustomHeader from "../../components/custom-header";
import Footer from "../../components/footer";
import NavBar from "../../components/navbar";
import ViewCard from "../../components/ui/userCards/viewCard";
import BidCard from "../../components/ui/userCards/myBidCard";
import Loading from "../../components/loading";
import PendingCard from "../../components/ui/userCards/pendingCard";
import fetchProtectedResource from "../authApi";
import axios from "axios";

import React, { useState , useEffect, use, useCallback} from "react";
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
import active from "../../components/ui/cards/active";
import api from "../authApi";
import Pagination from "../../components/ui/pagination";
const Dashboard = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("Active");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  const fetchItems = useCallback((page) => {
    setLoading(true);

    let apiEndPoint = activeTab === 'favourites' ? `/is/v1/getFavourites/NOT IMPLEMENTED YET` : activeTab === 'MyBids' ? `/is/v1/getMyBids/NOT IMPLEMENTED YET` : `http://localhost:8082/is/v1/getItems?status=${activeTab}`;
    
    if(selectedCategory !== 'all') {
      apiEndPoint += `&category=${selectedCategory}`;
    }
    if(searchTerm) {
      apiEndPoint += `&searchTerm=${searchTerm}`
    }
    if(page > 0){
      apiEndPoint += `&page=${page - 1}`
    }
    console.log(apiEndPoint);
    // try {
    //   setter(await fetchProtectedResource(apiEndPoint, {}, 'GET'));
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // } finally {
    //   setLoading(false);
    // }

    axios.get(apiEndPoint)
      .then((response) => {
        const {content, currentPage, hasNext} = response.data;
        setItems(content);
        setCurrentPage(currentPage);
        setHasNext(hasNext);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activeTab, searchTerm, selectedCategory]);
  
  useEffect(() => {
    fetchItems(1);
  }, [activeTab, selectedCategory]);

  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(() => fetchItems(1), 2000);
    return () => clearTimeout(handler);
  }, [searchTerm]);
  

  // const items = [
  //   {
  //     id: 1,
  //     title: "Classic Car",
  //     description: "A well-maintained 1967 Ford Mustang in original condition.",
  //     images: [mustang, "mustang.png"],
  //     status: "ending-soon",
  //     currentBid: 25000000,
  //     startingBid: 2000000,
  //     timeLeft: "3 days 4 hours",
  //     totalBids: 15,
  //     location: "Colombo, Sri Lanka",
  //   },
  //   {
  //     id: 2,
  //     title: "Vintage Motorcycle",
  //     description: "A rare 1950s Royal Enfield Bullet, fully restored.",
  //     images: [royal, "enfield.png"],
  //     status: "Active",
  //     currentBid: 800000,
  //     startingBid: 600000,
  //     timeLeft: "1 day 8 hours",
  //     totalBids: 10,
  //     location: "Kandy, Sri Lanka",
  //   },
  //   {
  //     id: 3,
  //     title: "Antique Bicycle",
  //     description: "Classic Raleigh bicycle from the 1940s, in working order.",
  //     images: [bicycle, "bicycle.png"],
  //     status: "ending-soon",
  //     currentBid: 120000,
  //     startingBid: 90000,
  //     timeLeft: "2 days 2 hours",
  //     totalBids: 7,
  //     location: "Galle, Sri Lanka",
  //   },
  //   {
  //     id: 4,
  //     title: "Bronze Sculpture",
  //     description: "Handcrafted bronze sculpture from the 19th century.",
  //     images: [bronze, "sculpture.png"],
  //     status: "Active",
  //     currentBid: 1800000,
  //     startingBid: 120000,
  //     timeLeft: "2 days 10 hours",
  //     totalBids: 18,
  //     location: "Negombo, Sri Lanka",
  //   },
  //   {
  //     id: 5,
  //     title: "Ancient Sword",
  //     description: "An ancient ceremonial sword with intricate designs.",
  //     images: [sword, "sword.png"],
  //     status: "Pending",
  //     currentBid: 2700,
  //     startingBid: 2000,
  //     timeLeft: "3 days 8 hours",
  //     totalBids: 19,
  //     location: "Anuradhapura, Sri Lanka",
  //   },
  //   {
  //     id: 6,
  //     title: "Ancient Vass",
  //     description: "An ancient vass from Itali.",
  //     images: [avimg, "figurine.png"],
  //     status: "Active",
  //     currentBid: 600,
  //     startingBid: 400,
  //     timeLeft: "8 hours",
  //     totalBids: 10,
  //     location: "Batticaloa, Sri Lanka",
  //   },
  // ];

  const MyBids = [
    {
      id: 1,
      title: "Classic Car",
      description: "A well-maintained 1967 Ford Mustang in original condition.",
      images: [mustang, "mustang.png"],
      status: "ending-soon",
      currentBid: 25000000,
      startingBid: 2000000,
      myBid: 25000000,
      timeLeft: "3 days 4 hours",
      totalBids: 15,
      location: "Colombo, Sri Lanka",
      isWinning: true,
      increment: 100000,
    },
    {
      id: 2,
      title: "Vintage Motorcycle",
      description: "A rare 1950s Royal Enfield Bullet, fully restored.",
      images: [royal, "enfield.png"],
      status: "Active",
      currentBid: 800000,
      startingBid: 600000,
      myBid: 700000,
      timeLeft: "1 day 8 hours",
      totalBids: 10,
      location: "Kandy, Sri Lanka",
      isWinning: false,
      increment: 5000,
    },
    {
      id: 3,
      title: "Antique Bicycle",
      description: "Classic Raleigh bicycle from the 1940s, in working order.",
      images: [bicycle, "bicycle.png"],
      status: "ending-soon",
      currentBid: 120000,
      startingBid: 90000,
      myBid: 100000,
      timeLeft: "2 days 2 hours",
      totalBids: 7,
      location: "Galle, Sri Lanka",
      isWinning: false,
      increment: 10000,
    }
  ];

  const favoriteItems = items.filter((item) => item.id === 1 || item.id === 2); // Example
  const bidHistoryItems = items.filter(
    (item) => item.id === 3 || item.id === 4
  ); // Example
  // const items = items.filter((item) => item.status === "Pending"); // Example: add status to items if needed

  return (
    <>
      <CustomHeader />
      <NavBar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-2">
        {/* <h2 className="text-2xl font-semibold text-gray-800">
          Hello, John! Welcome
        </h2> */}
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
              <option value="Vehicle">{t("vehicles")}</option>
              <option value="Jewelry">{t("Jewelry")}</option>
              <option value="General">{t("General")}</option>
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
              activeTab === "Active"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("Active")}
          >
            { t("activeAuctions") }
          </button>
          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
              activeTab === "favorite"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("favorite")}
          >
            { t("favoriteAuctions") }
          </button>
          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
              activeTab === "myBids"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("myBids")}
          >
            { t("myBids") }
          </button>
          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
              activeTab === "Pending"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("Pending")}
          >
            { t("pendingAuctions") }
          </button>
        </div>
      </section>
      {/* Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 md:px-20 lg:px-60">
          {
            loading ? (
              <Loading />
            ) 

            : activeTab === "Active" ? items.length === 0 ? (
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
            ) : items.map((item) => (
              <ViewCard key={item.id} item={item} />
            )) 

            : activeTab === "favorite" ? favoriteItems.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-4xl mb-4 text-gray-400"
              />
              <h2 className="text-xl mb-3 font-semibold">No Favorites</h2>
              <p>You have not added any favorites yet.</p>
            </div>
          ) 

          : favoriteItems.map((item) => (
            <ViewCard key={item.id} item={item} />
          )) : activeTab === "myBids" ? MyBids.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-4xl mb-4 text-gray-400"
              />
              <h2 className="text-xl mb-3 font-semibold">No Bids</h2>
              <p>You have not placed any bids yet.</p>
            </div>
          ) : MyBids.map((item) => (
            <BidCard key={item.id} item={item} />
          )) 

          : activeTab === "Pending" ? items.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-4xl mb-4 text-gray-400"
              />
              <h2 className="text-xl mb-3 font-semibold">
                No Pending Auctions
              </h2>
              <p>No pending auctions at the moment.</p>
            </div>
          ) : items.map((item) => (
            <PendingCard key={item.id} item={item} />
          )) : null
        }
        </div>
      {!loading && items.length > 0 && <Pagination currentPage={currentPage} hasNext={hasNext} goToPage={fetchItems} />}
      <Footer />
    </>
  );
};
export default Dashboard;
