import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTrophy, faCircleXmark,faPeopleGroup, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { formatCurrency } from "../../../function";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";

export default function EndedItemCard({ item, userBid }) {
  const { t } = useTranslation();
  // item: { id, title, images, location, endTime, finalPrice, status, description }
  // userBid: { amount, isWinner }

  return (
    <div className="overflow-hidden hover:shadow-md transition-shadow rounded-lg bg-white border border-gray-200 grid grid-cols-[130px_1fr] min-h-[200px] ">
  {/* Image */}
  <div className="relative h-full w-[130px] flex items-center justify-center bg-gray-100">
    <img
      src={item.images?.[0] || "/src/assets/ImageNotAvailable.png"}
      alt={item.title}
      className="object-cover w-full h-full rounded-l-lg"
    />
    
  </div>

  {/* Details */}
  <div className="flex flex-col justify-between p-4 w-full relative">
   <div className="flex flex-col gap-2">
    <div>
      <h3 className="text-lg font-semibold text-gray-800 truncate">{item.title}</h3>
      <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.description}</p>
      <p className="text-xs text-gray-400 mt-1">{item.location}</p>
      {item.status === "won" && (
      <span className="absolute top-2 right-2 bg-green-600 text-white text-sm px-2 py-1 rounded flex items-center gap-1 shadow">
        <FontAwesomeIcon icon={faTrophy} /> {t("Won")}
      </span>
    )}
    {item.status == "lost" && (
      <span className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded flex items-center gap-1 shadow">
        <FontAwesomeIcon icon={faCircleXmark} /> {t("Lost")}
      </span>
    )}
    </div>
    <div>
        <span className="mr-10 text-gray-500 text-xs ">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
            {t("Started on")} {item.startDate.toLocaleDateString()}
        </span>
        <span className=" text-gray-500 text-xs ">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
            {t("Ended on")} {item.endDate.toLocaleDateString()}
        </span>

    </div>
    </div>

    <div className="flex flex-wrap justify-between items-end gap-4 mt-4">
      <div>
        <div className="text-xs text-gray-400">{t("Total Bids")}</div>
        <div className="text-base font-semibold text-[#1e3a5f]">
          {item.totalBids ? item.totalBids : t("N/A")}
        </div>
      </div>

      <div>
        <div className="text-xs text-gray-400">{t("Started Price")}</div>
        <div className="text-base font-semibold text-blue-400">
          {formatCurrency(item.startBid)}
        </div>
      </div>
        
        <div>
        <div className="text-xs text-gray-400">{t("Sold Price")}</div>
        <div className="text-base font-semibold text-green-600">
          {formatCurrency(item.finalPrice)}
        </div>
      </div>

      <div className="text-right">
        <button
          className="mt-2 bg-transparent border-1 border-[#1e3a5f] text-[#1e3a5f] text-sm px-4 py-2 rounded-md font-medium transition"
          onClick={() => window.location.href = `/itemView?item=${item.id}`}
        >
          {t("View Item Details")}
        </button>
                <button
          className="mt-2 ml-5 bg-[#1e3a5f] hover:bg-[#25426e] text-white text-sm px-4 py-2 rounded-md font-medium transition"
          onClick={() => window.location.href = `/auctionSummary?item=${item.id}`}
        >
          {t("View Summary")}
        </button>
      </div>
    </div>
  </div>
</div>
  );
}
