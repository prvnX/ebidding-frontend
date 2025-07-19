import React from "react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next"


export default function HeroSection (){
          const {t} = useTranslation();
    return(

        <section className="bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6b] text-white py-12 border-t border-[#2d4a6b]" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">{t("bannerTitle")}</h2>
          <p className="text-xl mb-8 font-thin text-sm">Bid on seized and confiscated items through Sri Lanka Customs</p>
          <div className="flex justify-center space-x-4 ">
            <div className="bg-white/10 backdrop-blur-sm border-white/20 text-white rounded-lg border border-[#2d4a6b]">
              <div className="p-4 text-center">
                <div className="text-2xl font-bold"><CountUp start={0} end={156} duration={2.5} /></div>
                <div className="text-sm">Active Auctions</div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border-white/20 text-white rounded-lg border border-[#2d4a6b] ">
              <div className="p-4 text-center">
                <div className="text-2xl font-bold"><CountUp start={0} end={2340} duration={2.5} /></div>
                <div className="text-sm">{("Registered Bidders")}</div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border-white/20 text-white rounded-lg border border-[#2d4a6b]">
              <div className="p-4 text-center">
                <div className="text-2xl font-bold">LKR <CountUp start={0} end={42} duration={2.5} />M</div>
                <div className="text-sm">{("Total Value")}</div>
              </div>
            </div>

          </div>
        </div>
      </section>
    )
}