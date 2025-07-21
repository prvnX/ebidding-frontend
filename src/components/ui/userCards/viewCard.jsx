import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  faHeart as faHeartSolid,
  faLocationDot,
  faClock,
  faUsers,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import  noImage   from '../../../assets/ImageNotAvailable.png';

import { formatCurrency } from "../../../function";
import CountDownDate from "../../countdown";

export default function ViewCard({ item }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isEndingSoon, setIsEndingSoon] = useState(false);


  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  const handleFavoriteClick = (e, flag) => {
    e.stopPropagation(); // Prevent triggering the card click
    setIsFavorite(flag);
  };

  const handleViewClick = (e, itemId) => {
    e.stopPropagation(); // Prevent triggering the card click
    navigate(`/item/${itemId}`);
  };

  useEffect(() => {
  const currentTime = new Date();
  const endingTime = new Date(item.auction?.endingTime);

  const diffInHours = (endingTime - currentTime) / (1000 * 60 * 60);

  if (diffInHours <= 24 && diffInHours > 0) {
    setIsEndingSoon(true);
  } else {
    setIsEndingSoon(false);
  }
  }, [item.auction?.endingTime]);

  return (
    <div
      key={item.id}
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer rounded-md bg-white shadow-sm gap-0 pb-1 grid grid-rows-[subgrid] row-span-6"
      onClick={() => handleItemClick(item.id)}
    >
      <div className="relative">
        <div className="relative h-48 overflow-hidden">
          {item.images && item.images.length > 0 ? (
              <img
                src={`http://localhost:8082/${item.caseNumber}-${item.id}/${item.images.find(img => img.cover)?.url || item.images[0].url}`}
                alt={item.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            ) : (
              <img
                src={noImage}
                alt={item.title}
                className="w-full h-full object-contain transition-transform hover:scale-105"
              />
            )
          }
          {item.images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              +{item.images.length - 1} {t("more")}
            </div>
          )}
        </div>
        <div
          className={`absolute top-2 right-2 text-xs font-semibold px-3 py-0.5 text-white rounded-xl shadow-sm ${
            isEndingSoon ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {isEndingSoon ? t("endingSoon") : t("active")}
        </div>
        <div className="absolute top-2 left-2 bg-white/80 hover:bg-white w-8 h-8 rounded-md flex items-center justify-center shadow-md text-red-500 ">
          {isFavorite ? (
            <FontAwesomeIcon
              icon={faHeartSolid}
              className="text-red-500"
              onClick={(e) => handleFavoriteClick(e, false)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faHeartRegular}
              className="text-gray-500"
              onClick={(e) => handleFavoriteClick(e, true)}
            />
          )}
        </div>
      </div>
      <div className="px-4 text-lg font-bold mb-1">{item.title}</div>
      <div className="px-4 text-sm text-gray-500 mb-2">{item.description}</div>
      <div className="px-4 text-xs text-gray-500">
        {" "}
        <FontAwesomeIcon icon={faLocationDot} /> {item.location.name}
      </div>

      <div className="px-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-500">{t("currentBid")}</div>
              <div className="text-xl font-bold text-green-600">
                {/* {formatCurrency(item.currentBid)} */} 
                N/A
                
                </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">{t("startingBid")}</div>
              <div className="text-sm font-medium">
                {formatCurrency(item.startingBid)}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center text-gray-500">
              <FontAwesomeIcon icon={faClock} className="mr-1" />
              <CountDownDate dateTime={item.auction?.endingTime} />
            </div>
            <div className="flex items-center text-gray-500">
              <FontAwesomeIcon icon={faUsers} className="mr-1" />
              {/* {item.totalBids} {t("bids")} */}
             N/A Bids
            </div>
          </div>

          <div className="flex gap-2">
  
              <button
                className="flex-1 border bg-[#1e3a5f] text-white rounded-md p-1.5 cursor-pointer"
                onClick={(e) => handleBidClick(e, item.id)}
              >
                {t("viewItemDetails")}
              </button>
            
            
            
          </div>
        </div>
      </div>
    </div>
  );
}
