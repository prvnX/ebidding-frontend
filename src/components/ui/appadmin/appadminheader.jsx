import React from "react";
import custombanner from "../../../assets/custom-banner.png";
import { faBell } from "@fortawesome/free-solid-svg-icons"; 
import { useTranslation } from "react-i18next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import NotificationDropdown from "../../notificationDropDown";
import { Link } from "react-router-dom";

export default function AppAdminHeader() {
  const [notificationClick,setNotificationClick] = React.useState(false);

      const {t} = useTranslation();

    return (
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
                <h1 className="text-lg  md:text-2xl font-bold text-white">App Administration</h1>
                <p className="text-xs md:text-sm text-white/80">App Admin  Dashboard  </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* <button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 rounded-lg p-2 flex items-center border-1 border-white"> */}
                {/* <Bell className="h-4 w-4 mr-2" /> */}
                {/* <FontAwesomeIcon icon={faBell} className="h-4 w-4 mr-2 text-white" /> */}
                {/* Notifications */}

              {/* </button> */}
           <button 
              className="relative transition-colors rounded-full p-3 cursor-pointer" 
              aria-label="Notifications"
              onClick={() => setNotificationClick(!notificationClick)}
            >
              <FontAwesomeIcon icon={faBell} className="h-5 w-5 text-white text-xl" />
            </button>
              <Link
                size="sm" 
                className="bg-white text-[#1e3a5f] hover:bg-white/90 rounded-lg py-2 px-4 flex items-center border-1 border-white cursor-pointer"
                to={"/appadmin/addUser"}
                >
                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                 Add User
              </Link>
            </div>
          </div>
          </div>
          {
            notificationClick && <NotificationDropdown />
          }
        </header>
    );
}