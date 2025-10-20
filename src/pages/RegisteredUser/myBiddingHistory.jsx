import React, { useState, useEffect } from "react";
import CustomHeader from "../../components/custom-header";
import Footer from "../../components/footer";
import NavBar from "../../components/navbar";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Filter } from "lucide-react";
import { fetchProtectedResource } from "../authApi";
import EndedItemCard from "../../components/ui/endeditemcard";
import BreadCrumbs from "../../components/ui/breadCrumb";
const MyBiddingHistory = () => {
  const { t } = useTranslation();
  const [biddingHistory, setBiddingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Assuming username is stored in localStorage or can be fetched from auth context
  const username = localStorage.getItem("username") || "defaultUser";

  useEffect(() => {
    const fetchBiddingHistory = async () => {
      setLoading(true);
      try {
        const response = await fetchProtectedResource(
          `http://localhost:8081/getMyBiddingHistory/${username}`
        );
        if (response) {
          // console.log("Bidding history response inner:", response);
          // console.log("Bidding history data:", response.data);
          setBiddingHistory(response.data);
        } else {
          setBiddingHistory([]);
        }
      } catch (error) {
        setBiddingHistory([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBiddingHistory();
  }, [username]);

  // Filter items by active tab
  const filteredByTab = biddingHistory.filter((entry) => {
    const status = entry.status?.toLowerCase() || "";
    switch (activeTab) {
      case "all":
        return true;
      case "lost":
        return status === "lost";
      case "claimed":
        return status === "claimed";
      case "discarded":
        return status === "discarded";
      case "won_unclaimed":
        return status === "won_unclaimed";
      default:
        return true;
    }
  });

  // Filter by category
  const filteredByCategory =
    selectedCategory === "all"
      ? filteredByTab
      : filteredByTab.filter(
          (entry) =>
            entry.itemDetails?.category &&
            entry.itemDetails.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  // Filter by search term
  const filteredItems = filteredByCategory.filter((entry) => {
    const title = entry.itemDetails?.title?.toLowerCase() || "";
    const description = entry.itemDetails?.description?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();
    return title.includes(search) || description.includes(search);
  });

  return (
    
    <>

      <CustomHeader />
      <NavBar />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadCrumbs page="Bid History" breadCrumbs={[{ title: "Home", link: "/RegisteredUser/dashboard" }]} />

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
                placeholder={t("searchPlaceholderHistory")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                aria-label={t("searchPlaceholderHistory")}
              />
            </div>
          </div>

          <div className="w-full md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={t("categorySelect")}
            >
              <option value="all">{t("allCategories")}</option>
              <option value="vehicle">{t("vehicles")}</option>
              <option value="jewelry">{t("jewelryWatches")}</option>
              <option value="other">{t("otherItems")}</option>
            </select>
          </div>
 
        </div>
        {/* Tabs */}
        <div className="w-full flex grid-cols-5 gap-2 mb-4 bg-gray-100 text-gray-700 p-1 rounded-md shadow-xs">
          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
              activeTab === "all"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("all")}
          >
            {t("all")}
          </button>
          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
              activeTab === "lost"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("lost")}
          >
            {t("lost")}
          </button>
          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
              activeTab === "claimed"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("claimed")}
          >
            {t("claimed")}
          </button>
          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
              activeTab === "discarded"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("discarded")}
          >
            {t("discarded")}
          </button>
          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
              activeTab === "won_unclaimed"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("won_unclaimed")}
          >
            {t("wonUnclaimed")}
          </button>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="text-center text-gray-500 py-20">{t("loading")}...</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <FontAwesomeIcon
              icon={faSearch}
              className="text-4xl mb-4 text-gray-400 mx-auto"
            />
            <h2 className="text-xl mb-3 font-semibold">{t("noBidsFound")}</h2>
            <p>{t("tryAdjustingSearchOrFilter")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((entry, index) => {
              const item = entry.itemDetails;
              const bidStatus = entry.status;
              const myBid = entry.myBid;
              

              return (
                <EndedItemCard
                  key={item.id || index}
                  item={{
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    location: item.location?.name,
                    images: item.images?.map((img) => `/uploads/${img.url}`),
                    startDate: new Date(item.auction.startingTime),
                    endDate: new Date(item.auction.endingTime),
                    startBid: item.startingBid,
                    finalPrice: item.valuation,
                    status: bidStatus,
                  }}
                  userBid={myBid}
                />
              );
            })}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default MyBiddingHistory;
