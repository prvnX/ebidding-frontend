import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import pending from './components/ui/cards/pending';

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
      currentBid:"Current Highest Bid",
      startingBid:"Starting Bid",
      bids:"bids",
      placeBid:"Place Bid",
      active: "Active",
      endingSoon: "Ending Soon",
      startingSoon: "Starting Soon",
      completed: "Completed",
      activeAuctionsTab: "Active Auctions",
      viewItemDetails: "View Item Details",
      searchPlaceholder: "Search by item name, category, or location...",
      allCategories: "All Categories",
      moreFilters: "More Filters",
      noEndingSoonAuctions: "No ending soon auctions",
      noEndingSoonAuctionsPara: "There are currently no auctions ending soon. Please check back later.",
      noCompletedAuctions: "No completed auctions",
      noCompletedAuctionsPara: "There are currently no completed auctions. Please check back later.",
      noStartingSoon: "No starting soon auctions",
      noStartingSoonPara: "There are currently no auctions starting soon. Please check back later.",
      myBid: "My Bid",
      startingSoon: "Starting Soon",
      increment: "Increment",
      pending: "Pending",


      //AuctionMan
      notSheduled: "Not Scheduled",
      pending: "Pending",
      loading: "Loading",
      pleaseWait: "Please wait...",

      noNotShedItemsText: "No items not scheduled",
      noNotShedItemsDis: "There are currently no items that are not scheduled. Please check back later.",
      noPendingItemsText: "No pending items",
      noPendingItemsDis: "There are currently no items pending. Please check back later.",
      noCompletedItemsText: "No completed items",
      noCompletedItemsDis: "There are currently no completed items. Please check back later.",
      increment: "Increment",
      winningBid: "Winning Bid",
      viewItemDetails: "View Item Details",
      incrementBy: "Increment By",

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
      currentBid: "වර්තමාන ලංසු මුදල",
      startingBid: "ආරම්භක ලංසු මුදල",
      bids: "ලංසු",
      placeBid: "ලංසු යොදන්න",
      active: "සක්‍රීය",
      endingSoon: "ඉක්මනින් අවසන් වෙයි",
      startingSoon: "ආරම්භ වීම අසන්න",
      completed: "අවසන්",
      activeAuctionsTab: "සක්‍රීය ලංසු",
      searchPlaceholder: "අයිතම නාමය, වර්ගය, හෝ ස්ථානය අනුව සෙවීම...",
      allCategories: "සියලු වර්ග",
      moreFilters: "වැඩි දියුණු පෙරහන්",
      noEndingSoonAuctions: "ඉක්මනින් අවසන් වන ලංසු නොමැත",
      noEndingSoonAuctionsPara: "දැනට ඉක්මනින් අවසන් වන ලංසු නොමැත. කරුණාකර පසුව නැවත පරික්ෂා කරන්න.",
      noCompletedAuctions: "අවසන් වූ ලංසු නොමැත",
      noCompletedAuctionsPara: "දැනට අවසන් වූ ලංසු නොමැත. කරුණාකර පසුව නැවත පරික්ෂා කරන්න.",
      noStartingSoon: "ආරම්භ වීමට අසන්න ලංසු නොමැත",
      noStartingSoonPara: "දැනට ආරම්භ වීමට අසන්න ලංසු නොමැත. කරුණාකර පසුව නැවත පරික්ෂා කරන්න.",
      viewItemDetails: "විස්තර බලන්න",
      myBid: "මගේ ලංසු",
      startingSoon: "ආරම්භ වීමට ආසන්න",
      increment: "ඉහළ දැමීම",
      pending: "පැවැත්වීමට ඉතිරි",
      

        //AuctionMan
        notSheduled: "පැවැත්වීමට නියමිත නැත",
        pending: "පැවැත්වීමට ඉතිරි",
        loading: "බාගත වෙමින්",
        pleaseWait: "කරුණාකර රැඳී සිටින්න...",

        noNotShedItemsText: "පැවැත්වීමට නියමිත භාණ්ඩ නැත",
        noNotShedItemsDis: "පැවැත්වීමට නියමිත භාණ්ඩ කිසිවක් නොමැත. කරුණාකර පසුව නැරඹීමට පැමිණෙන්න.",
        noPendingItemsText: "පැවැත්වීමට ඉතිරි භාණ්ඩ නැත",
        noPendingItemsDis: "පැවැත්වීමට ඉතිරි භාණ්ඩ කිසිවක් නොමැත. කරුණාකර පසුව නැරඹීමට පැමිණෙන්න.",
        noCompletedItemsText: "සම්පූර්ණ කළ භාණ්ඩ නැත",
        noCompletedItemsDis: "සම්පූර්ණ කළ භාණ්ඩ කිසිවක් නොමැත. කරුණාකර පසුව නැරඹීමට පැමිණෙන්න.",
        increment: "ඉහළ දැමීම",
        winningBid: "ජයග්‍රහණ ලංසු",
        incrementBy : "ඉහළ දැමීම",
      
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