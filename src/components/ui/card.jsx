import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};


export default function Card({item}){
    const [isFavorite, setIsFavorite] = useState(false);
    const { t } = useTranslation();
    console.log(item);
    return(
      <div key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer rounded-md bg-white shadow-sm gap-0 pb-1 grid grid-rows-[subgrid] row-span-6">
        <div className="relative" onClick={() => handleItemClick(item.id)}>
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
              item.status === "ending-soon" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {item.status === "ending-soon" ? t("endingSoon") : t("active")}
          </div>
          <div className="absolute top-2 left-2 bg-white/80 hover:bg-white w-8 h-8 rounded-md flex items-center justify-center shadow-md text-red-500 ">
          {isFavorite ? (
              <FontAwesomeIcon icon={faHeartSolid} className="text-red-500" onClick={() => setIsFavorite(false)} />
            ) : (
              <FontAwesomeIcon icon={faHeartRegular} className="text-gray-500" onClick={() => setIsFavorite(true)} />
            )
          }
          </div>
        </div>
        <div className="px-4 text-lg font-bold mb-1">{item.title}</div>
        <div className="px-4 text-sm text-gray-500 mb-2">{item.description}</div>
        <div className="px-4 text-xs text-gray-500"> <FontAwesomeIcon icon={faLocationDot}/> {item.location}</div>

        <div className="px-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-500">{t("currentBid")}</div>
                <div className="text-xl font-bold text-green-600">{formatCurrency(item.currentBid)}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">{t("startingBid")}</div>
                <div className="text-sm font-medium">{formatCurrency(item.startingBid)}</div>
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
              <button className="flex-1 border bg-[#1e3a5f] text-white rounded-md p-1.5 cursor-pointer" onClick={() => alert(item.id)}>
                {t("placeBid")}
              </button>
              <button onClick={() => alert(item.id)} className="text-sm flex items-center justify-center border bg-white rounded-md h-9 w-9 cursor-pointer border-gray-300 hover:bg-gray-100 transition text-gray-700">
                <FontAwesomeIcon icon={faEye}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}