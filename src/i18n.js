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
      activeAuctions: "Active Auctions",
      favoriteAuctions: "Favorite Auctions",
      myBids: "My Bids",
      pendingAuctions: "Pending Auctions",
      howToBid: "How to Bid?",
      termsConditions: "Terms & Conditions",
      paymentMethods: "Payment Methods",
      collectionProcess: "Collection Process",
      support: "Support",
      helpCenter: "Help Center",
      contactUs: "Contact Us",
      liveChat: "Live Chat",
      faq: "FAQ",
      contactInfo: "Contact Information",
      copyright: "Sri Lanka Customs Department. All rights reserved.",
      vehicles : "Vehicles",
      electronics: "Electronics",
      jewelryWatches: "Jewelry & Watches",
      clothingAccessories: "Clothing & Accessories",
      machinery: "Machinery",
      otherItems: "Other Items",

    


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
      winning: "Winning",

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
      myBid: "මගේ වෙන්දේසි",
      startingSoon: "ආරම්භ වීමට ආසන්න",
      increment: "ඉහළ දැමීම",
      pending: "පැවැත්වීමට ඉතිරි",
      activeAuctions: "සක්‍රීය වෙන්දේසි",
      favoriteAuctions: "ප්‍රියතම වෙන්දේසි",
      myBids: "මගේ වෙන්දේසි",
      pendingAuctions: "පැවැත්වීමට ඇති වෙන්දේසි",
      howToBid: "ලංසු යොදන්නේ කෙසේද?",
      termsConditions: "වෙනත් කොන්දේසි",
      paymentMethods: "ගෙවීම් ක්‍රම",
      collectionProcess:"එකතු කිරීමේ ක්‍රියාවලිය",
      support: "සහාය",
      helpCenter: "උදව් මධ්‍යස්ථානය",
      contactUs: "අප අමතන්න",
      liveChat: "සජීවී කතාබහ",
      faq: "ප්‍රශ්න සහ පිළිතුරු",
      contactInfo: "සම්බන්ධතා තොරතුරු",
      copyright: "ශ්‍රී ලංකා රේගු දෙපාර්තමේන්තුව. සියලු හිමිකම් ඇවිරිණි.",
      

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
        vehicles: "වාහන",
        electronics: "ඉලෙක්ට්‍රොනික උපකරණ",
        jewelryWatches: "රන් භාණ්ඩ සහ ඔරලෝසු",
        clothingAccessories: "ඇඳුම් සහ අමතර භාණ්ඩ",
        machinery: " යන්ත්‍රෝපකරණ",
        otherItems: "වෙනත් භාණ්ඩ",
        winning: "ජයග්‍රහණය"


      
    }
  },
  ta: {
    translation: {
  
          welcome: "வரவேற்கின்றோம்",
          about: "எங்களை பற்றி",
          bannerTitle: "அதிகாரப்பூர்வ சுங்க ஏல முறையகம்",
          officialEbiddingPlatform: "இலங்கை சுங்க திணைக்களத்தால் பறிமுதல் செய்யப்பட்ட பொருட்களுக்கு அதிகாரப்பூர்வ மின்னணு ஏலம் தளமாகும்.",
          quickLinks: "விரைவு இணைப்புகள்",
          currentBid: "தற்போதைய உயர் விடை",
          startingBid: "தொடக்க விடை",
          bids: "விலைகள்",
          placeBid: "விலை இடு",
          active: "செயலில்",
          endingSoon: "மீட்க முடியாத நேரம் நெருங்குகிறது",
          startingSoon: "விரைவில் துவங்குகிறது",
          completed: "முடிக்கப்பட்டது",
          activeAuctionsTab: "செயலில் ஏலங்கள்",
          viewItemDetails: "பொருள் விவரங்களைப் பார்வையிடுக",
          searchPlaceholder: "பொருளின் பெயர், வகை, அல்லது இடம் மூலம் தேடுங்கள்...",
          allCategories: "அனைத்து வகைகள்",
          moreFilters: "மேலும் வடிகட்டிகள்",
          noEndingSoonAuctions: "விரைவில் முடியும் ஏலங்கள் இல்லை",
          noEndingSoonAuctionsPara: "தற்போது விரைவில் முடியும் ஏலங்கள் இல்லை. தயவுசெய்து பின்னர் மறுபரிசீலனை செய்யவும்.",
          noCompletedAuctions: "முடிக்கப்பட்ட ஏலங்கள் இல்லை",
          noCompletedAuctionsPara: "தற்போது முடிக்கப்பட்ட ஏலங்கள் எதுவும் இல்லை. தயவுசெய்து பின்னர் பார்க்கவும்.",
          noStartingSoon: "விரைவில் துவங்கும் ஏலங்கள் இல்லை",
          noStartingSoonPara: "தற்போது எந்த விரைவில் துவங்கும் ஏலங்களும் இல்லை. பின்னர் பார்வையிடவும்.",
          myBid: "என் விடை",
          increment: "அதிகரிப்பு",
          pending: "நிலுவையில்",
          activeAuctions: "செயலில் உள்ள ஏலங்கள்",
          favoriteAuctions: "விருப்ப ஏலங்கள்",
          myBids: "என் விடைகள்",
          pendingAuctions: "நிலுவை ஏலங்கள்",
          howToBid: "விலை எப்படி இடுவது?",
          termsConditions: "விதிமுறைகள் மற்றும் நிபந்தனைகள்",
          paymentMethods: "கட்டண முறைகள்",
          collectionProcess: "சேகரிக்கும் செயன்முறை",
          support: "ஆதரவு",
          helpCenter: "உதவி மையம்",
          contactUs: "எங்களை தொடர்புகொள்ள",
          liveChat: "நேரடி உரையாடல்",
          faq: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
          contactInfo: "தொடர்பு தகவல்",
          copyright: "இலங்கை சுங்க திணைக்களம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",

          // AuctionMan
          notSheduled: "அட்டவணைப்படுத்தப்படவில்லை",
          pending: "நிலுவையில்",
          loading: "ஏற்றுகிறது",
          pleaseWait: "தயவுசெய்து காத்திருக்கவும்...",

          noNotShedItemsText: "அட்டவணைப்படுத்தப்படாத பொருட்கள் இல்லை",
          noNotShedItemsDis: "தற்போது அட்டவணைப்படுத்தப்படாத பொருட்கள் எதுவும் இல்லை. தயவுசெய்து பின்னர் பார்வையிடவும்.",
          noPendingItemsText: "நிலுவை பொருட்கள் இல்லை",
          noPendingItemsDis: "தற்போது நிலுவை பொருட்கள் எதுவும் இல்லை. தயவுசெய்து பின்னர் பார்வையிடவும்.",
          noCompletedItemsText: "முடிக்கப்பட்ட பொருட்கள் இல்லை",
          noCompletedItemsDis: "தற்போது முடிக்கப்பட்ட பொருட்கள் எதுவும் இல்லை. தயவுசெய்து பின்னர் பார்வையிடவும்.",
          winningBid: "வெற்றி விடை",
          viewItemDetails: "பொருள் விவரங்களைப் பார்வையிடுக",
          incrementBy: "அதிகரிப்பு அளவு",
            vehicles: "வாகனங்கள்",
            electronics: "மின்னணு சாதனங்கள்",
            jewelryWatches: "ஆபரணங்கள் & கடிகாரங்கள்",
            clothingAccessories: "ஆடைகள் & அணிகலன்கள்",
            machinery: "இயந்திரங்கள்",
            otherItems: "பிற பொருட்கள்",
            winning: "வெற்றி"

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