import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { formatCurrency } from "../../../function";
import { formatDate } from "../../../function";

import noImage from "../../../assets/ImageNotAvailable.png";


export default ({item}) => {
    const { t } = useTranslation();
    
    
    const navigate = useNavigate();
    const handleItemClick = (id) => {
        navigate(`/AuctionMan/item/${id}`);
    };
    return(
      <div key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer rounded-md bg-white shadow-sm gap-0 pb-1 grid grid-rows-[subgrid] row-span-6" onClick={() => handleItemClick(item.id)}>
        <div className="relative">
          <div className="relative h-48 overflow-hidden">
          {item.images && item.images.length > 0 ? (
            <img
              src={`http://localhost:8082/items/${item.caseNumber}-${item.id}/images/${item.images.find(img => img.cover)?.url || item.images[0].url}`}
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
            {item.images?.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                +{item.images.length - 1} {t("more")}
              </div>
            )}
          </div>
        </div>
        <div className="px-4 text-lg font-bold mb-1">{item.title}</div>
        <div className="px-4 text-sm text-gray-500 mb-2">{item.description}</div>
        <div className="px-4 text-xs text-gray-500 mb-2 flex justify-start items-center gap-2">
            <FontAwesomeIcon icon={faLocationDot}/>
            <div className="h-full border-l border-gray-300"></div>
            <div>{item.location.name}</div>
        </div>

        <div className="px-4 mb-2">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-500">{t("startingBid")}</div>
                <div className="text-xl font-bold text-green-600">{formatCurrency(item.startingBid)}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">{t("increment")}</div>
                <div className="text-sm font-medium">{formatCurrency(item.increment)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 text-xs text-gray-500 mb-2 flex justify-start items-center gap-2">
            <FontAwesomeIcon icon={faClock} className="text-xl"/>
            <div className="h-full border-l border-gray-300"></div>
            <div>
                <div>Start at - {formatDate(item.auction.startingTime)}</div>
                <div>End at   - {formatDate(item.auction.endingTime)}</div>
            </div>
        </div>
      </div>
    );
}