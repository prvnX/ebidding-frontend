import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  faHeart as faHeartSolid,
  faLocationDot,
  faClock,
  faUsers,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

import { formatCurrency } from "../../../function";
import { toast } from "react-toastify";

export default function BidCard({ item }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  const handleFavoriteClick = (e, flag) => {
    e.stopPropagation(); // Prevent triggering the card click
    setIsFavorite(flag);
  };

  const handleBidClick = (e, itemId) => {
    e.stopPropagation(); // Prevent triggering the card click
    toast.success("Value Incremented Successfully");

};

  const handleViewClick = (e, itemId) => {
    e.stopPropagation(); // Prevent triggering the card click
    navigate(`/item/${itemId}`);
  };


  return (
    <div
      key={item.id}
      className={`overflow-hidden hover:shadow-lg transition-shadow cursor-pointer rounded-md  shadow-sm gap-0 pb-1 grid grid-rows-[subgrid] row-span-6 ${item.isWinning ? "border-1 border-green-300 bg-green-50" : "border-1 border-red-300 bg-red-50"}`}
      onClick={() => handleItemClick(item.id)}
    >
      <div className="relative">
        <div className="relative h-48 overflow-hidden">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          {item.images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              +{item.images.length - 1} {t("more")}
            </div>
          )}
        </div>
        <div
          className={`absolute top-2 right-2 text-xs font-semibold px-3 py-0.5 text-white rounded-xl shadow-sm ${
            item.isWinning ?  "bg-green-500":"bg-red-500" 
          }`}
        >
          {item.isWinning ? "Winning" : "OutBid"}
        </div>

      </div>
      <div className="px-4 text-lg font-bold mb-1">{item.title}</div>
      <div className="px-4 text-sm text-gray-500 mb-2">{item.description}</div>
      <div className="px-4 text-xs text-gray-500">
        {" "}
        <FontAwesomeIcon icon={faLocationDot} /> {item.location}
      </div>

      <div className="px-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <div className={`text-sm ${item.isWinning ? "text-green-600" : "text-red-600"}`}>{t("currentBid")}</div>
              <div className={`text-xl font-bold text-green-600 ${item.isWinning ? "text-green-600" : "text-red-600"}`}>
                {formatCurrency(item.currentBid)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">{t("myBid")}</div>
              <div className="text-sm font-medium">
                {formatCurrency(item.myBid)}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center text-gray-500">
              <FontAwesomeIcon icon={faClock} className="mr-1" />
              {item.timeLeft}
            </div>
            <div className="flex items-center text-gray-500">
              <FontAwesomeIcon icon={faUsers} className="mr-1" />
              {item.totalBids} {t("bids")}
            </div>
          </div>

          <div className="flex gap-2">
            {item.status === "ended" ? (
              <button
                className="flex-1 border bg-[#1e3a5f] text-white rounded-md p-1.5 cursor-pointer"
                onClick={(e) => handleSummaryClick(e, item.id)}
              >
                {t("View Summary")}
              </button>
            ) : (
              <button
                className={`flex-1 border text-white rounded-md p-2 cursor-pointer ${item.isWinning ? "bg-green-200" : "bg-red-600"}`}
                onClick={(e) => handleBidClick(e, item.id)} disabled={item.isWinning}
              >
                {t("incrementBy")} {formatCurrency(item.increment)}
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
