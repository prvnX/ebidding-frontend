import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { formatCurrency, formatDate } from "../../../function";
import CountDownDate from "../../countdown";

import noImage from "../../../assets/ImageNotAvailable.png";


export default ({item}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
    const handleItemClick = (id) => {
        navigate(`/AuctionMan/item/${id}`);
    };
    return(
      <div key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer rounded-md bg-white shadow-sm gap-0 pb-1 grid grid-rows-[subgrid] row-span-6">
        <div className="relative" onClick={() => handleItemClick(item.id)}>
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
            <div className="text-sm text-gray-500">{t("winningBid")}</div>
            <div className="text-xl font-bold text-green-600">{formatCurrency(item.startingBid)}</div>
        </div>
        <div className="px-4 text-xs text-gray-500 mb-2 flex justify-start items-center gap-2">
            <FontAwesomeIcon icon={faClock} />
            <div className="h-full border-l border-gray-300"></div>
            <div>
              <div>Close At - {formatDate(item.auction.endingTime)}</div>
              <CountDownDate  dateTime={item.auction?.endingTime}/>
            </div>
        </div>
      </div>
    );
}