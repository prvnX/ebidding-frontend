import React from "react";
import custombanner from "../assets/custom-banner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { UserDropdown } from "./user-dropdown"; // Ensure correct path

export default function NavBar() {
  const { t } = useTranslation();

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
            <button 
              className="relative bg-white/10 hover:bg-white/20 transition-colors rounded-full p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300" 
              aria-label="Notifications"
            >
              <FontAwesomeIcon icon={faBell} className="h-5 w-5 text-white" />
            </button>
            
            {/* Render UserDropdown here */}
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
