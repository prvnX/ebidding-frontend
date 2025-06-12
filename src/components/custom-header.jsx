import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; // import specific icon
import { faPhone } from '@fortawesome/free-solid-svg-icons'; // Uncomment if you want to use phone icon
import { faGlobe } from '@fortawesome/free-solid-svg-icons'; // Uncomment if you want to use globe icon
import { faXTwitter,faSquareFacebook,faYoutube } from "@fortawesome/free-brands-svg-icons";
import { LanguageSwitcher } from "./language-switch";




export default function CustomHeader() {
    return (
      // Header
      <header className="bg-[#1e3a5f] shadow-sm py-1">  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top bar with contact info */}
          <div className="flex justify-between items-center h-10 text-sm text-white/80">
            <div className="flex items-center space-x-6">
            <span className="cursor-pointer hover:text-blue-300 hover text-white"><FontAwesomeIcon icon={faPhone}/> <a href='tel:1915' className="text-s font-light ml-1" >1915</a></span>
            <span className="cursor-pointer hover:text-blue-300 hover text-white"><FontAwesomeIcon icon={faEnvelope}/> <a href='mailto:info@customs.gov.lk' className="text-s font-light ml-1" >info@customs.gov.lk</a></span>

            </div>
            <div className="flex items-center space-x-4">
            <span className="cursor-pointer hover:text-blue-300 hover text-white"><a href='https://www.customs.gov.lk/' className="text-s font-light ml-1" ><FontAwesomeIcon icon={faGlobe}/></a></span>
            <span className="cursor-pointer hover:text-blue-300 hover text-white"><a href='https://www.facebook.com/SriLankaCustoms/' className="text-s font-light ml-1" ><FontAwesomeIcon icon={faSquareFacebook}/></a></span>
            <span className="cursor-pointer hover:text-blue-300 hover text-white"><a href='https://x.com/customssl?lang=en' className="text-s font-light ml-1" ><FontAwesomeIcon icon={faXTwitter}/> </a></span>
            <span className="cursor-pointer hover:text-blue-300 hover text-white"><a href='https://www.youtube.com/channel/UCrEtbePpVwOMRaAootmBCAg' className="text-s font-light ml-1" ><FontAwesomeIcon icon={faYoutube}/></a></span>
            
              {/* <LanguageSwitcher /> */}

            <div className="ml-4">

                <LanguageSwitcher />
                
              </div>
            </div>
          </div>
        </div>
      </header>
    );
}