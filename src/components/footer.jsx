import React from "react";
import custombanner from "../assets/custom-banner.png";
import { useTranslation } from "react-i18next";
export default function Footer(){
    const {t} = useTranslation();
    return (
        <footer className="bg-[#1e3a5f] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src={custombanner} alt="Sri Lanka Customs" className="h-17 w-auto rounded-lg" />
              </div>
              <p className="text-white/80 text-sm">{t("officialEbiddingPlatform")}</p>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-white">{("quickLinks")}</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <a href="#" className="hover:text-white">
                    {("howToBid")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {("termsConditions")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {("paymentMethods")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {("collectionProcess")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-white">{("support")}</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <a href="#" className="hover:text-white">
                    {("helpCenter")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {("contactUs")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {("liveChat")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {("faq")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-white">{("contactInfo")}</h4>
              <div className="text-sm text-white/80 space-y-2">
                <p>
                  📞 {("hotline")} ({("hotlineLabel")})
                </p>
                <p>✉️ {("email")}</p>
                <p>📍 {("customsHouse")}</p>
                <p>🌐 {("website")}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-[#2d4a6b] mt-8 pt-8 text-center text-sm text-white/60">
            <p>&copy; 2024 {("copyright")}</p>
          </div>
        </div>
      </footer>
    )
}