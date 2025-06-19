import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { formatCurrency } from "../../../function";


export default ({item, select}) => {
    const [isSelected, setSelected] = useState(false);
    const handleSelct = (e, flag) => {
        e.stopPropagation(); // Prevent triggering the item click
        select(item.id, flag);
        setSelected(flag);
    }
    const { t } = useTranslation();
    const handleItemClick = (id) => {
        console.log(`Item clicked: ${id}`);
    };
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
          <div className="absolute top-2 left-2 bg-white/80 hover:bg-white w-8 h-8 rounded-md flex items-center justify-center shadow-md text-[#1e3a5f]">
          {isSelected ? (
              <FontAwesomeIcon icon={faSquareCheck} onClick={(e) => handleSelct(e, false)} />
            ) : (
              <FontAwesomeIcon icon={faSquare} onClick={(e) => handleSelct(e, true)} />
            )
          }
          </div>
        </div>
        <div className="px-4 text-lg font-bold mb-1">{item.title}</div>
        <div className="px-4 text-sm text-gray-500 mb-2">{item.description}</div>
        <div className="px-4 text-xs text-gray-500 mb-2 flex justify-start items-center gap-2">
            <FontAwesomeIcon icon={faLocationDot}/>
            <div className="h-full border-l border-gray-300"></div>
            <div>{item.location}</div>
        </div>

        <div className="px-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-500">{t("startingBid")}</div>
                <div className="text-xl font-bold text-green-600">{formatCurrency(item.startingBid)}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">{t("increment")}</div>
                <div className="text-sm font-medium">{formatCurrency(item.startingBid)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}