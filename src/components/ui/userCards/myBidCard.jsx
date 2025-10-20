import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { use, useEffect, useState ,useCallback} from "react";
import { useNavigate } from "react-router-dom";
import {
  faHeart as faHeartSolid,
  faLocationDot,
  faClock,
  faUsers,
  faEye,
  faHammer
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

import { formatCurrency } from "../../../function";
import CountDownDate from "../../countdown";
import { toast } from "react-toastify";
import { fetchProtectedResource } from "../../../pages/authApi";
import useStompSubscriptions from "../../../hooks/useStompSubscriptions";
import noImage from "../../../assets/ImageNotAvailable.png";

export default function BidCard({ item }) {
  const [currentHighest, setCurrentHighest] = useState(item.currentHighest);
  const [myBid, setMyBid] = useState(item.mybid);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };
     const handleNewMessage = useCallback((bid) => {
      console.log("New message:", bid);
      setCurrentHighest(bid.amount);
      console.log(bid.placedByMe);
      if(bid.placedByMe == true){
        console.log("This is my bid");
        setMyBid(bid.amount);
      }
    }, [currentHighest, myBid]);

  useStompSubscriptions(`/topic/bid:${item.itemDTO.id}`, handleNewMessage);
  


  const handleBidClick = async (e)  => {
    e.stopPropagation(); // Prevent triggering the card click
     if (!item) return;
      const bidAmount = currentHighest + item.itemDTO.increment;
      const response = await fetchProtectedResource(
        `http://localhost:8081/bs/v1/bid`,
        {
          itemId: item.itemDTO.id,
          amount: parseInt(bidAmount)
        },
        'POST'
      )
      .catch((error) => {
        console.error('Error placing bid:', error);
        toast.error('Failed to place bid. Please try again.');
      });
      if (response) {
        // console.log("Bid response:", response.data);
        if (response.data.success) {
          setCurrentHighest(bidAmount);
          setMyBid(bidAmount);
          toast.success(`Bid placed: ${formatCurrency(parseInt(bidAmount))}`);
          return;
        }
        toast.error(`Bid Placing Unsuccessful: ${response.data.message}`);
      }
};

  const handleViewClick = (e, itemId) => {
    e.stopPropagation(); // Prevent triggering the card click
    navigate(`/item/${itemId}`);
  };

  useEffect(() => {
    if(currentHighest == myBid){
      setIsWinning(true);
    } else {
      setIsWinning(false);
    }
  }, [currentHighest, myBid,item]);

    const handleBid = async (e) => {
      e.stopPropagation(); // Prevent triggering the card click
      e.preventDefault();
     
    };

  const [isWinning, setIsWinning] = useState(false);
  return (
    <div
      key={item.id}
      className={`overflow-hidden hover:shadow-lg transition-shadow cursor-pointer rounded-md  shadow-sm gap-0 pb-1 grid grid-rows-[subgrid] row-span-6 ${isWinning ? "border-1 border-green-300 bg-green-50" : "border-1 border-red-300 bg-red-50"}`}
      onClick={() => handleItemClick(item.itemDTO.id)}
    >
      <div className="relative">
        <div className="relative h-48 overflow-hidden">
          {item.itemDTO.images && item.itemDTO.images.length > 0 ? (
            <img
              src={`http://localhost:8082/items/${item.itemDTO.caseNumber}-${item.itemDTO.id}/images/${item.itemDTO.images.find(img => img.cover)?.url || item.itemDTO.images[0].url}`}
              alt={item.itemDTO.title}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          ) : (
            <img
              src={noImage}
              alt={item.title}
              className="w-full h-full object-contain transition-transform hover:scale-105"
            />
          )}
          {item.itemDTO.images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              +{item.itemDTO.images.length - 1} {t("more")}
            </div>
          )}
        </div>
        <div
          className={`absolute top-2 right-2 text-xs font-semibold px-3 py-0.5 text-white rounded-xl shadow-sm ${
            isWinning ?  "bg-green-500":"bg-red-500" 
          }`}
        >
          {isWinning ? "Winning" : "OutBid"}
        </div>

      </div>
      <div className="px-4 text-lg font-bold mb-1">{item.itemDTO.title}</div>
      <div className="px-4 text-sm text-gray-500 mb-2">{item.itemDTO.description}</div>
      <div className="px-4 text-xs text-gray-500">
        {" "}
        <FontAwesomeIcon icon={faLocationDot} /> {item.itemDTO.location.name}
      </div>

      <div className="px-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <div className={`text-sm ${isWinning ? "text-green-600" : "text-red-600"}`}>{t("currentBid")}</div>
              <div className={`text-xl font-bold text-green-600 ${isWinning ? "text-green-600" : "text-red-600"}`}>
                {formatCurrency(currentHighest)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">{t("myBid")}</div>
              <div className="text-sm font-medium">
                {formatCurrency(myBid)}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center text-gray-500">
              <FontAwesomeIcon icon={faClock} className="mr-1" />
              <CountDownDate dateTime={item.itemDTO.auction?.endingTime} />
              
            </div>
            <div className="flex items-center text-gray-500">
              <FontAwesomeIcon icon={faUsers} className="mr-1" />
              {item.bidCount} {t("bids")}
            </div>
          </div>

          <div className="flex gap-2">
            {item.status === "ended" ? (
              <button
                className="flex-1 border bg-[#1e3a5f] text-white rounded-md p-1.5 cursor-pointer"
                onClick={(e) => handleSummaryClick(e, item.itemDTO.id)}
              >
                {t("View Summary")}
              </button>
            ) : (
              <button
                className={`flex-1 border text-white rounded-md p-2 cursor-pointer ${isWinning ? "bg-green-200" : "bg-red-600"}`}
                onClick={(e) => handleBidClick(e, item.itemDTO.id)} disabled={isWinning}
              >
                {t("incrementBy")} {formatCurrency(item.itemDTO.increment)}
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
