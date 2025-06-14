import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files (you can load them from separate JSON files too)
const resources = {
  en: {
    translation: {
        //home page
      welcome: "Welcome",
      about: "About us",
      bannerTitle:"Official Customs Auction Platform",
      officialEbiddingPlatform:"Official eBidding platform for seized goods and confiscated items by Sri Lanka Customs Department.",
      quickLinks: "Quick Links",
      currentBid:"Current Bid",
      startingBid:"Starting Bid",
      bids:"bids",
      placeBid:"Place Bid",
      active: "Active",
      endingSoon: "Ending Soon",
      completed: "Completed",
      activeAuctionsTab: "Active Auctions",
      searchPlaceholder: "Search by item name, category, or location...",
      allCategories: "All Categories",
      moreFilters: "More Filters",
      noEndingSoonAuctions: "No ending soon auctions",
      noEndingSoonAuctionsPara: "There are currently no auctions ending soon. Please check back later.",
     noCompletedAuctions: "No completed auctions",
     noCompletedAuctionsPara: "There are currently no completed auctions. Please check back later.",

    }
  },
  si: {
    translation: {
        //home page
      welcome: "ආයුබෝවන්",
      about: "අපි ගැන",
      bannerTitle:"නිල රේගු වෙන්දේසි වේදිකාව",
      officialEbiddingPlatform:"ශ්‍රී ලංකා රේගු දෙපාර්තමේන්තුව විසින් අත්අඩංගුවට ගත් භාණ්ඩ සඳහා නිල ඊ-ලංසු වේදිකාව.",    
      quickLinks: "ඉක්මන් සබැඳි",
      
    }
  },
  ta: {
    translation: {
        //home page
      welcome: "வரவேற்கிறோம்",
      about: "எங்களை பற்றி",
      bannerTitle:"அதிகாரப்பூர்வ சுங்க ஏல தளம்",
        //footer
    officialEbiddingPlatform:"இலங்கை சுங்கத் துறையால் பறிமுதல் செய்யப்பட்ட பொருட்களுக்கான அதிகாரப்பூர்வ மின்-ஏல தளம்.",
    quickLinks: "விரைவு இணைப்புகள்",
    }
  }
};

i18n
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;