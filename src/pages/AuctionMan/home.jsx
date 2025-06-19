import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
import { Plus, Box, Gavel, Users, CircleDollarSign } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../function";

import CustomHeader from "../../components/custom-header"
import Card from "../../components/ui/card";
import NotSheduled from "../../components/ui/cards/notSheduled";
import PendingCard from "../../components/ui/cards/pending";
import Completed from "../../components/ui/cards/completed";

import custombanner from "../../assets/custom-banner.png";
import avimg from "../../assets/av1.png";
import mustang from "../../assets/mustang.jpg";
import royal from "../../assets/royal.jpg";
import sword from "../../assets/sword.png";
import bicycle from "../../assets/bicycle.JPG";
import bronze from "../../assets/bronze.jpg";
import Footer from "../../components/footer";


export default () => {
  const cards = [
    {
      title: 'Total Items',
      amount: <CountUp start={0} end={234} duration={1} />,
      icon: Box,
      color: "text-blue-1000"
    },
    {
      title: 'Total Expenses',
      amount: formatCurrency(100000),
      icon: Gavel,
      color: "text-green-600"
    },
    {
      title: 'Rating',
      amount: '4.5 Stars',
      icon: Users,
      color: "text-blue-400"
    },
    {
      title: 'Total Revenue',
      amount: formatCurrency(200000),
      icon: CircleDollarSign,
      color: "text-orange-500"
    },
    {
      title: 'Pending Items',
      amount: <CountUp start={0} end={36} duration={1} />,
      icon: Box,
      color: "text-purple-500"
    },
    {
      title: 'Ending Soon',
      amount: <CountUp start={0} end={12} duration={1} />,
      icon: Box,
      color: "text-red-500"
    }
  ];
  const staticItems = [
    {
        id: 1,
        title: "Classic Car",
        description: "A well-maintained 1967 Ford Mustang in original condition.",
        images: [mustang, "mustang.png"],
        status: 'notSheduled',
        currentBid: 25000000,
        startingBid: 200000,
        timeLeft: "3 days 4 hours",
        totalBids: 15,
        location: "Colombo, Sri Lanka"
    },
    {
        id: 2,
        title: "Vintage Motorcycle",
        description: "A rare 1950s Royal Enfield Bullet, fully restored.",
        images: [royal, "enfield.png"],
        status: 'completed',
        currentBid: 800000,
        startingBid: 600000,
        timeLeft: "1 day 8 hours",
        totalBids: 10,
        location: "Kandy, Sri Lanka",
        endingTime: "2023-10-01T10:00:00Z",
    },
    {
        id: 3,
        title: "Antique Bicycle",
        description: "Classic Raleigh bicycle from the 1940s, in working order.",
        images: [bicycle, "bicycle.png"],
        status: 'notSheduled',
        currentBid: 120000,
        startingBid: 90000,
        timeLeft: "2 days 2 hours",
        totalBids: 7,
        location: "Galle, Sri Lanka"
    },
    {
        id: 4,
        title: "Bronze Sculpture",
        description: "Handcrafted bronze sculpture from the 19th century.",
        images: [bronze, "sculpture.png"],
        status: 'pending',
        currentBid: 1800000,
        startingBid: 120000,
        timeLeft: "2 days 10 hours",
        totalBids: 18,
        location: "Negombo, Sri Lanka",
        startingTime: "2023-10-01T10:00:00Z",
        endingTime: "2023-10-05T10:00:00Z"
    },
    {
        id: 5,
        title: "Ancient Sword",
        description: "An ancient ceremonial sword with intricate designs.",
        images: [sword, "sword.png"],
        status: 'notSheduled',
        currentBid: 2700,
        startingBid: 2000,
        timeLeft: "3 days 8 hours",
        totalBids: 19,
        location: "Anuradhapura, Sri Lanka"
    },
    {
        id: 6,
        title: "Ancient Vass",
        description: "An ancient vass from Itali.",
        images: [avimg, "figurine.png"],
        status: 'completed',
        currentBid: 600,
        startingBid: 400,
        timeLeft: "8 hours",
        totalBids: 10,
        location: "Batticaloa, Sri Lanka",
        endingTime: "2023-10-01T10:00:00Z"
    }
  ];

  const [selectedItems, setSelectedItems] = useState([]);

  const select = (id, flag) => {
    if(flag)
      setSelectedItems([...selectedItems, id]);
    else
      setSelectedItems(selectedItems.filter(item => item !== id));
  }

  const { t } = useTranslation();

  const [items, setItems] = useState(staticItems);
  const [activeTab, setActiveTab] = useState('notSheduled');
  const [loading, setLoading] = useState(false);

  const fetchItems = async() => {
    setLoading(true);
    
    let filteredItems = staticItems.filter(item => item.status === activeTab); // Simulate fetching items based on the active tab
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    setItems(filteredItems);
    setLoading(false);
    return;
  }

  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  return (
    <>
      <CustomHeader />

      {/* dashboard header */}
      <header className="bg-[#1e3a5f] shadow-sm py-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <img 
              src={custombanner} 
              alt="Sri Lanka Customs" 
              className="hidden md:block h-16 w-auto rounded-lg" 
              />              
              <div className="md:border-l md:border-[#2d4a6b] pl-4">
                <h1 className="text-lg  md:text-2xl font-bold text-white">Auction Management Dashboard</h1>
                <p className="text-xs md:text-sm text-white/80">Bidding Management System</p>
              </div>
            </div>
            <Link to="/auctionman/additem" className="bg-white text-[#1e3a5f] hover:bg-[#e0e0ee] rounded-lg py-2 px-4 flex items-center border-1 cursor-pointer">
              <Plus size={15} className="mr-3"/> Add Items
            </Link>
          </div>
        </div>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 max-w-7xl my-5 mx-auto px-4 gap-2 sm:px-6 lg:px-8">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="flex flex-1 h-full justify-between items-center space-x-4 bg-white text-[#1e3a5f] rounded-lg border border-[#e5e7eb] backdrop-blur-md p-4"
            >
              <div className="flex flex-col items-start justify-start">
                <p>{card.title}</p>
                <strong><h1 className={`${card.color} text-2xl`}>{card.amount}</h1></strong>
              </div>
              <Icon size={30} className={`${card.color}`} />
            </div>
      )})}
      </div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" w-full flex grid-cols-4 gap-2 mb-4 bg-gray-100 text-gray-700 p-1 rounded-md shadow-xs">
          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded  cursor-pointer ${
              activeTab === "notSheduled"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("notSheduled")}
          >
            {t("notSheduled")}
          </button>

          <button
            className={`px-4 py-2 flex-1 text-sm font-medium rounded cursor-pointer ${
              activeTab === "pending"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 "
            }`}
            onClick={() => setActiveTab("pending")}
          >
            {t("pending")}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 md:px-20 lg:px-60">
        {loading ? (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon icon={faSpinner} spin className="text-8xl" />
              <h2 className="text-xl mb-3 font-semibold">  {t("loading")}</h2>
              <p>{t("pleaseWait")}</p>
            </div>
          ) : activeTab === "notSheduled" ? (items.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon icon={faSearch} className="text-4xl mb-4 text-gray-400" />
              <h2 className="text-xl mb-3 font-semibold">  {t("noNotShedItemsText")}</h2>
              <p>{t("noNotShedItemsDis")}</p>
            </div>
            ) : (
            items.map((item) => (
              <NotSheduled key={item.id} item={item} select={select} />
            ))
          )) : activeTab === "pending" ? (items.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon icon={faSearch} className="text-4xl mb-4 text-gray-400" />
              <h2 className="text-xl mb-3 font-semibold">  {t("noPendingItemsText")}</h2>
              <p>{t("noPendingItemsDis")}</p>
            </div>
            ) : (
            items.map((item) => (
              <PendingCard key={item.id} item={item} />
            ))
          )) : (items.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">
              <FontAwesomeIcon icon={faSearch} className="text-4xl mb-4 text-gray-400" />
              <h2 className="text-xl mb-3 font-semibold">  {t("noCompletedItemsText")}</h2>
              <p>{t("noCompletedItemsDis")}</p>
            </div>
            ) : (
            items.map((item) => (
              <Completed key={item.id} item={item} />
            )
          )))
        }
      </div>
      { !loading && activeTab === "notSheduled" && items.length > 0 && (
        <div className="px-5 md:px-20 lg:px-60 my-5 flex gap-2 justify-end">
          <Link to="/auctionman/additem" className={`bg-[#1e3a5f] text-white hover:bg-[#1e3a5f]/90 rounded-lg py-2 px-4 flex items-center border-1 border-white cursor-pointer ${
            selectedItems.length > 0 ? "opacity-100" : "opacity-50 pointer-events-none"
          }`}>
            <Gavel className="mr-2"/> Schedule Auction
          </Link>
        </div>
      )}
      <Footer />
      </>
  )
}