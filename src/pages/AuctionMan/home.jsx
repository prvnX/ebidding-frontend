import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
import { Plus, Gavel, Filter } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../../function";

import CustomHeader from "../../components/custom-header"
import AuctionManHeader from "../../components/auctionMan-header";
import NotSheduled from "../../components/ui/cards/notSheduled";
import PendingCard from "../../components/ui/cards/pending";
import Active from "../../components/ui/cards/active";
import Completed from "../../components/ui/cards/completed";

import Footer from "../../components/footer";
import Loading from "../../components/loading";


export default () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const select = (id, flag) => {
    if(flag)
      setSelectedItems([...selectedItems, id]);
    else
      setSelectedItems(selectedItems.filter(item => item !== id));
  }

  const { t } = useTranslation();

  const [notSheduledItems, setNotSheduledItems] = useState([]);
  const [pendingItems, setPendingItems] = useState([]);
  const [activeItems, setActiveItems] = useState([]);
  const [activeTab, setActiveTab] = useState('NotScheduled');
  const [completedItems, setCompletedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

const fetchItems = useCallback(() => {
    setLoading(true);

    const setter = activeTab === 'NotScheduled' ? setNotSheduledItems : activeTab === 'Pending' ? setPendingItems : activeTab === 'Active' ? setActiveItems : setCompletedItems;
    let apiEndPoint = `http://localhost:8082/is/v1/getItems?status=${activeTab}`;
    
    if(selectedCategory !== 'all') {
      apiEndPoint += `&category=${selectedCategory}`;
    }
    if(searchTerm) {
      apiEndPoint += `&searchTerm=${searchTerm}`
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
        setter(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activeTab, searchTerm, selectedCategory]);

  useEffect(() => {
    setSelectedItems([]);
    fetchItems();
  }, [activeTab, selectedCategory]);

  useEffect(() => {
    setLoading(true)
    const handler = setTimeout(() => {fetchItems()}, 2000);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    navigate("/auctionman/scheduleauctions");
  };

  return (
    <>
      <CustomHeader />

      {/* dashboard header */}
      <AuctionManHeader>
        <Link to="/auctionman/additem" className="bg-white text-[#1e3a5f] hover:bg-[#e0e0ee] rounded-lg py-2 px-4 flex items-center border-1 cursor-pointer">
          <Plus size={15} className="mr-3"/> Add Items
        </Link>
      </AuctionManHeader>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 max-w-7xl my-5 mx-auto px-4 gap-2 sm:px-6 lg:px-8">
        <div className="flex flex-1 h-full justify-between items-center space-x-4 bg-white text-[#1e3a5f] rounded-lg shadow p-4 border-l-4 border-blue-900">
          <div className="flex flex-col items-start justify-start">
            <p>Total Items</p>
            <strong><h1 className="text-blue-900 text-2xl"><CountUp start={0} end={234} duration={1} /></h1></strong>
          </div>
        </div>
        <div className="flex flex-1 h-full justify-between items-center space-x-4 bg-white text-[#1e3a5f] rounded-lg shadow p-4 border-l-4 border-yellow-600">
          <div className="flex flex-col items-start justify-start">
            <p>Not Sheduled Items</p>
            <strong><h1 className="text-yellow-600 text-2xl"><CountUp start={0} end={234} duration={1} /></h1></strong>
          </div>
        </div>
        <div className="flex flex-1 h-full justify-between items-center space-x-4 bg-white text-[#1e3a5f] rounded-lg shadow p-4 border-l-4 border-blue-700">
          <div className="flex flex-col items-start justify-start">
            <p>Pending Items</p>
            <strong><h1 className="text-blue-700 text-2xl"><CountUp start={0} end={234} duration={1} /></h1></strong>
          </div>
        </div>
        <div className="flex flex-1 h-full justify-between items-center space-x-4 bg-white text-[#1e3a5f] rounded-lg shadow p-4 border-l-4 border-green-600">
          <div className="flex flex-col items-start justify-start">
            <p>Active Items</p>
            <strong><h1 className="text-green-600 text-2xl"><CountUp start={0} end={234} duration={1} /></h1></strong>
          </div>
        </div>
        <div className="flex flex-1 h-full justify-between items-center space-x-4 bg-white text-[#1e3a5f] rounded-lg shadow p-4 border-l-4 border-orange-500">
          <div className="flex flex-col items-start justify-start">
            <p>Ending Soon</p>
            <strong><h1 className="text-orange-500 text-2xl"><CountUp start={0} end={12} duration={1} /></h1></strong>
          </div>
        </div>
        <div className="flex flex-1 h-full justify-between items-center space-x-4 bg-white text-[#1e3a5f] rounded-lg shadow p-4 border-l-4 border-red-800">
          <div className="flex flex-col items-start justify-start">
            <p>Completed Items</p>
            <strong><h1 className="text-red-800 text-2xl"><CountUp start={0} end={36} duration={1} /></h1></strong>
          </div>
        </div>
      </div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              activeTab === "NotScheduled"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("NotScheduled")}
          >
            {t("notSheduled")}
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

          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
              activeTab === "Active"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("Active")}
          >
            {t("active")}
          </button>

          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
              activeTab === "Completed"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("Completed")}
          >
            {t("completed")}
          </button>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 md:px-20 lg:px-60">
        {loading ? (
            <Loading />
          ) : activeTab === "NotScheduled" ? (notSheduledItems.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon icon={faSearch} className="text-4xl mb-4 text-gray-400" />
              <h2 className="text-xl mb-3 font-semibold">  {t("noNotShedItemsText")}</h2>
              <p>{t("noNotShedItemsDis")}</p>
            </div>
            ) : (
            notSheduledItems.map((item) => (
              <NotSheduled key={item.id} item={item} select={select} />
            ))
          )) : activeTab === "Pending" ? (pendingItems.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon icon={faSearch} className="text-4xl mb-4 text-gray-400" />
              <h2 className="text-xl mb-3 font-semibold">  {t("noPendingItemsText")}</h2>
              <p>{t("noPendingItemsDis")}</p>
            </div>
            ) : (
            pendingItems.map((item) => (
              <PendingCard key={item.id} item={item} />
            ))
          )) : activeTab === "Active" ? (activeItems.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon icon={faSearch} className="text-4xl mb-4 text-gray-400" />
              <h2 className="text-xl mb-3 font-semibold">  {t("noActiveItemsText")}</h2>
              <p>{t("noActiveItemsDis")}</p>
            </div>
            ) : (
            activeItems.map((item) => (
              <Active key={item.id} item={item} />
            )
          ))) : ( completedItems.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon icon={faSearch} className="text-4xl mb-4 text-gray-400" />
              <h2 className="text-xl mb-3 font-semibold">  {t("noCompletedItemsText")}</h2>
              <p>{t("noCompletedItemsDis")}</p>
            </div>
            ) : (
            completedItems.map((item) => (
              <Completed key={item.id} item={item} />
            ))
          ))
        }
      </div>
      { !loading && activeTab === "NotScheduled" && notSheduledItems.length > 0 && (
        <div className="px-5 md:px-20 lg:px-60 my-5 flex gap-2 justify-end">
          <button
            onClick={handleClick}
            className={`bg-[#1e3a5f] text-white hover:bg-[#1e3a5f]/90 rounded-lg py-2 px-4 flex items-center border-1 border-white cursor-pointer ${
              selectedItems.length > 0 ? "opacity-100" : "opacity-50 pointer-events-none"
            }`}
            disabled={selectedItems.length === 0}
          >
            <Gavel className="mr-2" />
            Schedule Auction
          </button>
        </div>
      )}
      <Footer />
      </>
  )
}