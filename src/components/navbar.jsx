import React from "react";
import custombanner from "../assets/custom-banner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons"; 
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next"

export default function NavBar() {

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
                <h1 className="text-lg  md:text-2xl font-bold text-white">E-Bidding Platform</h1>
                <p className="text-xs md:text-sm text-white/80">Official Auction Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button variant="outline" size="sm" >
                {/* <Bell className="h-4 w-4 mr-2" /> */}
                <FontAwesomeIcon icon={faBell} className="h-4 w-4 mr-2 text-white" />

              </button>
              <button variant="outline" size="sm" >
                <FontAwesomeIcon icon={faCircleUser} className="h-4 w-4 mr-2 text-white"/>
              </button>
            </div>
          </div>
          </div>
        </header>
    );
}