import custombanner from "../assets/custom-banner.png";
import { useTranslation } from "react-i18next"

export default ({children}) => {

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
                  <h1 className="text-lg  md:text-2xl font-bold text-white">Auction Management Dashboard</h1>
                  <p className="text-xs md:text-sm text-white/80">Bidding Management System</p>
                </div>
              </div>
              {children}
            </div>
          </div>
        </header>
    );
}