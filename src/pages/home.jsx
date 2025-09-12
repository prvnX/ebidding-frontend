import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faClock } from "@fortawesome/free-solid-svg-icons";
import { Filter } from "lucide-react";
import axios from "axios";
import CustomHeader from "../components/custom-header";
import BidderHeader from "../components/bidder-header";
import HeroSection from "../components/hero-header";
import Footer from "../components/footer";
import Loading from "../components/loading";
import Active from "../components/ui/cards/active";
import PendingCard from "../components/ui/cards/pending";
import Pagination from "../components/ui/pagination";

export default function Home() {
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

      let apiEndPoint = `http://localhost:8082/is/v1/getItems?status=${activeTab}`;
      
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
      //   setItems(await fetchProtectedResource(apiEndPoint, {}, 'GET'));
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
      setLoading(true)
      const handler = setTimeout(() => {fetchItems(1)}, 2000);
      return () => clearTimeout(handler);
    }, [searchTerm]);

    return (
      <>
        <CustomHeader />
        <BidderHeader />
        <HeroSection />
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
      <div className=" w-full flex grid-cols-4 gap-2 mb-4 bg-gray-100 text-gray-700 p-1 rounded-md shadow-xs">
        <button
          className={`px-4 py-2 flex-1 text-sm font-medium rounded  cursor-pointer ${
            activeTab === "Active"
              ? "bg-white text-black"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("Active")}
        >
          {t("activeAuctionsTab")}
        </button>

        <button
          className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
            activeTab === "Pending"
              ? "bg-white text-black"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 "
          }`}
          onClick={() => setActiveTab("Pending")}
        >
          {t("pending")}
        </button>

        {/* <button
          className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
            activeTab === "starting-soon"
              ? "bg-white text-black"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("starting-soon")}
        >
          {t("startingSoon")}
        </button> */}
      </div>
    </section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  px-5 md:px-20 lg:px-60">
        {loading ? (
            <Loading />
          ) : activeTab === "Active" ? items.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500">
                <FontAwesomeIcon icon={faSearch} className="text-4xl mb-4 text-gray-400" />
                <h2 className="text-xl mb-3 font-semibold">  {t("noActiveAuctions")}</h2>
                <p>{t("noActiveAuctionsPara")}</p>
              </div>
          ) : (
              items.map((item) => (
                <Active key={item.id} item={item} />
              ))
          ) : activeTab === "Pending" ? items.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon icon={faClock} className="text-4xl mb-4 text-gray-400" />
              <h2 className="text-xl mb-3 font-semibold">  {t("noPendingAuctions")}</h2>
              <p>{t("noPendingAuctionsPara")}</p>

            </div>
          ) : items.map((item) => (
              <PendingCard key={item.id} item={item} />
          )) : null
        }
        </div>

        {/* {activeTab === "starting-soon" &&         
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  px-5 md:px-20 lg:px-60">
          {Loading && (
            <loading />
          )}
            {pendingItems.map((item) => (
              <PendingCard key={item.id} item={item} />
            ))}

            { pendingItems.length === 0 &&
            <div className="col-span-3 text-center text-gray-500">
                <FontAwesomeIcon icon={faCheckCircle} className="text-4xl mb-4 text-gray-400" />
              <h2 className="text-xl mb-3 font-semibold">  {t("noStartingSoon")}</h2>
              <p>{t("noStartingSoonPara")}</p>

            </div>
            }
           
        </div>} */}
        {!loading && items.length > 0 && <Pagination currentPage={currentPage} hasNext={hasNext} goToPage={fetchItems} />}
        <Footer />
    </>
    );
}
