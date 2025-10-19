import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faCircleXmark,
  faBoxArchive,
  faCheckCircle,
  faCalendarAlt,
  faHeart as faHeartRegular,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { formatCurrency } from "../../function";
import noImage from "../../assets/ImageNotAvailable.png";
export default function EndedItemCard({ item, userBid }) {
  const { t } = useTranslation();

  // Determine status badge based on item.status with new mapping
  const getStatusBadge = () => {
    switch (item.status) {
      case "Won_Unclaimed":
        return {
          label: t("Won"),
          color: "bg-green-500",
        };
      case "Claimed":
        return {
          label: t("Claimed"),
          color: "bg-blue-500",
        };
      case "Discarded":
        return {
          label: t("Discarded"),
          color: "bg-gray-500",
        };
      case "Lost":
        return {
          label: t("Lost"),
          color: "bg-red-500",
        };
      default:
        return {
          label: t("Unknown"),
          color: "bg-gray-400",
        };
    }
  };

  const badge = getStatusBadge();

  // Format dates
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow max-w-sm mx-auto">
      <div className="relative group overflow-hidden">
        <img
          src={item.images?.[0] || noImage}
          alt={item.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Favorite Heart Icon */}
        <div className="absolute top-2 left-2 text-white text-xl drop-shadow-md">
          <FontAwesomeIcon icon={faHeartOutline} />
        </div>
        {/* Status Badge */}
        <div
          className={`absolute top-2 right-2 px-3 py-1 rounded-full text-white text-sm font-semibold ${badge.color} drop-shadow-md`}
        >
          {badge.label}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{item.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
        <p className="text-xs text-gray-400">{item.location}</p>

        <div className="flex flex-wrap justify-between items-center mt-4 gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">{t("My Bid")}</span>
            <span className="text-base font-semibold text-[#1e3a5f]">
              {formatCurrency(userBid)}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-400">{t("Starting Price")}</span>
            <span className="text-base font-semibold text-blue-400">
              {formatCurrency(item.startBid)}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-400">{t("Started Date")} <span className="mx-1">|</span> {t("Ended Date")}</span>
            <span className="text-base font-semibold">
              <span className="text-green-600">{formatDate(item.startDate)}</span>
              <span className="mx-2 text-gray-400">|</span>
              <span className="text-red-600">{formatDate(item.endDate)}</span>
            </span>
          </div>
        </div>

        <div className="flex justify-between mt-5 gap-3 flex-wrap">
          <button
            className="flex-1 bg-[#1e3a5f] hover:bg-[#25426e] text-white text-sm px-4 py-2 rounded-md font-medium transition"
            onClick={() => (window.location.href = `/item/${item.id}`)}
          >
            {t("View Item Details")}
          </button>
          <button
            className="flex-1 bg-transparent border border-[#1e3a5f] text-[#1e3a5f] text-sm px-4 py-2 rounded-md font-medium transition hover:bg-[#1e3a5f]/10"
            onClick={() => (window.location.href = `/auctionSummary?item=${item.id}`)}
          >
            {t("View Summary")}
          </button>
        </div>
      </div>
    </div>
  );
}