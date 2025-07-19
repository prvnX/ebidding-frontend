import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHeart, 
  faLocationDot, 
  faClock, 
  faUsers, 
  faShare, 
  faArrowLeft, 
  faCheckCircle, 
  faInfoCircle,
  faGavel,
  faEye,
  faCalendarAlt,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import LocationMap from "../components/locationmap";

import CountDownDate from "../components/countdown";
import CustomHeader from "../components/custom-header";
import BidderHeader from "../components/bidder-header";
import Footer from "../components/footer";
import NavBar from "../components/navbar";  
import { toast } from "react-toastify";

// Import images
import mustang from "../assets/mustang.jpg";
import royal from "../assets/royal.jpg";
import sword from "../assets/sword.png";
import bicycle from "../assets/bicycle.JPG";
import bronze from "../assets/bronze.jpg";
import avimg from "../assets/av1.png";

export default function ItemDetails() {
  const { itemId } = useParams();
  const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [isUserLogged,setIsUserLogged] = useState(false);

  // Complete items data - matches your original data structure
  const items = [
    {
      id: 1,
      title: "Classic Car",
      caseNumber: "CP/2024/001234",
      description: "A well-maintained 1967 Ford Mustang in original condition. This vintage American muscle car is a rare find in Sri Lanka, with a powerful V8 engine and manual transmission. The car has been carefully preserved and maintained by a passionate collector.",
      images: [mustang, mustang, mustang, mustang, mustang],
      status: "Active Auction",
      currentBid: 25000000,
      startingBid: 2000000,
      timeLeft: "3d 4h 15m 30s",
      endingDate:"2025-06-30",
      endingTime:"15:00:00",
      totalBids: 15,
      location: "Colombo, Sri Lanka",
      minimumIncrement: 100000,
      seller: {
        name: "Classic Auto Collection",
        rating: 4.9,
        verified: true,
        itemsSold: 37,
        memberSince: "May 2018"
      },
      specifications: [
        { name: "Year", value: "1967" },
        { name: "Make", value: "Ford" },
        { name: "Model", value: "Mustang" },
        { name: "Condition", value: "Excellent" },
        { name: "Mileage", value: "76,000 miles" },
        { name: "Engine", value: "V8 289 cubic inch" },
        { name: "Transmission", value: "Manual" },
        { name: "Color", value: "Candy Apple Red" },
        { name: "Interior", value: "Black Leather" }
      ],
      bidHistory: [
        { bidder: "User+++123", amount: 25000000, time: "2 minutes ago", status: "Winning" },
        { bidder: "Bid+++789", amount: 24500000, time: "15 minutes ago", status: "" },
        { bidder: "Auc+++456", amount: 24000000, time: "1 hour ago", status: "" },
        { bidder: "Buy+++321", amount: 23500000, time: "2 hours ago", status: "" }
      ],
      terms: [
        "All sales are final - no returns or exchanges",
        "Payment must be completed within 7 days of auction end",
        "Items must be collected within 30 days",
        "Buyer responsible for all taxes and duties",
        "Items sold as-is with no warranty"
      ]
    },
    {
      id: 2,
      title: "Vintage Motorcycle",
      caseNumber: "CP/2024/001235",
      description: "A rare 1950s Royal Enfield Bullet, fully restored to original specifications. This classic motorcycle represents the golden era of British engineering with its distinctive single-cylinder engine and timeless design.",
      images: [royal, royal, royal, royal, royal],
      status: "Active Auction",
      currentBid: 800000,
      startingBid: 600000,
      timeLeft: "1d 8h 45m 20s",
      totalBids: 10,
      location: "Kandy, Sri Lanka",
      minimumIncrement: 25000,
      endingDate:"2025-07-30",
      endingTime:"15:30:00",
      seller: {
        name: "Vintage Motors",
        rating: 4.7,
        verified: true,
        itemsSold: 24,
        memberSince: "August 2019"
      },
      specifications: [
        { name: "Year", value: "1956" },
        { name: "Make", value: "Royal Enfield" },
        { name: "Model", value: "Bullet" },
        { name: "Condition", value: "Restored" },
        { name: "Engine", value: "350cc Single Cylinder" },
        { name: "Transmission", value: "4-speed Manual" },
        { name: "Color", value: "Forest Green" },
        { name: "Documentation", value: "Complete" }
      ],
      bidHistory: [
        { bidder: "Moto+++567", amount: 800000, time: "5 minutes ago", status: "Winning" },
        { bidder: "Vintage+++234", amount: 775000, time: "30 minutes ago", status: "" },
        { bidder: "Classic+++890", amount: 750000, time: "2 hours ago", status: "" }
      ],
      terms: [
        "All sales are final - no returns or exchanges",
        "Payment must be completed within 7 days of auction end",
        "Items must be collected within 30 days",
        "Buyer responsible for all taxes and duties",
        "Vehicle inspection recommended before bidding"
      ]
    },
    {
      id: 3,
      title: "Antique Bicycle",
      caseNumber: "CP/2024/001236",
      description: "Classic Raleigh bicycle from the 1940s, in working order. This vintage bicycle showcases the craftsmanship of the era with its steel frame and original components carefully maintained over the decades.",
      images: [bicycle, bicycle, bicycle, bicycle, bicycle],
      status: "Ending Soon",
      currentBid: 120000,
      startingBid: 90000,
      timeLeft: "2d 2h 30m 15s",
      totalBids: 7,
      location: "Galle, Sri Lanka",
      minimumIncrement: 5000,
      endingDate:"2025-06-19",
      endingTime:"15:00:00",
      seller: {
        name: "Antique Treasures",
        rating: 4.8,
        verified: true,
        itemsSold: 42,
        memberSince: "January 2017"
      },
      specifications: [
        { name: "Year", value: "1947" },
        { name: "Make", value: "Raleigh" },
        { name: "Condition", value: "Good working condition" },
        { name: "Frame", value: "Steel" },
        { name: "Wheels", value: "28 inch" },
        { name: "Origin", value: "United Kingdom" }
      ],
      bidHistory: [
        { bidder: "Cycle+++789", amount: 120000, time: "1 hour ago", status: "Winning" },
        { bidder: "Antique+++456", amount: 115000, time: "3 hours ago", status: "" },
        { bidder: "Retro+++123", amount: 110000, time: "5 hours ago", status: "" }
      ],
      terms: [
        "All sales are final - no returns or exchanges",
        "Payment must be completed within 7 days of auction end",
        "Items must be collected within 30 days",
        "Buyer responsible for all taxes and duties",
        "Item sold in current working condition"
      ]
    },
    {
      id: 4,
      title: "Bronze Sculpture",
      caseNumber: "CP/2024/001237",
      description: "Handcrafted bronze sculpture from the 19th century. This exquisite piece represents the artistic mastery of Southeast Asian bronze work, featuring intricate details and traditional motifs.",
      images: [bronze, bronze, bronze, bronze, bronze],
      status: "Active Auction",
      currentBid: 1800000,
      startingBid: 1200000,
      timeLeft: "2d 10h 20m 45s",
      totalBids: 18,
      location: "Negombo, Sri Lanka",
      minimumIncrement: 50000,
      endingDate:"2025-06-30",
      endingTime:"15:00:00",
      seller: {
        name: "Heritage Arts",
        rating: 4.9,
        verified: true,
        itemsSold: 56,
        memberSince: "March 2016"
      },
      specifications: [
        { name: "Age", value: "Circa 1880" },
        { name: "Material", value: "Bronze" },
        { name: "Height", value: "45 cm" },
        { name: "Weight", value: "7.5 kg" },
        { name: "Origin", value: "Southeast Asia" },
        { name: "Condition", value: "Excellent" },
        { name: "Authenticity", value: "Certified" }
      ],
      bidHistory: [
        { bidder: "Art+++345", amount: 1800000, time: "10 minutes ago", status: "Winning" },
        { bidder: "Heritage+++678", amount: 1750000, time: "45 minutes ago", status: "" },
        { bidder: "Bronze+++901", amount: 1700000, time: "2 hours ago", status: "" }
      ],
      terms: [
        "All sales are final - no returns or exchanges",
        "Payment must be completed within 7 days of auction end",
        "Items must be collected within 30 days",
        "Buyer responsible for all taxes and duties",
        "Certificate of authenticity included"
      ]
    },
    {
      id: 5,
      title: "Ancient Sword",
      caseNumber: "CP/2024/001238",
      description: "An ancient ceremonial sword with intricate designs and historical significance. This blade represents centuries of craftsmanship with its ornate handle and well-preserved steel construction.",
      images: [sword, sword, sword, sword, sword],
      status: "Active Auction",
      currentBid: 2700000,
      startingBid: 2000000,
      timeLeft: "3d 8h 10m 25s",
      totalBids: 19,
      location: "Anuradhapura, Sri Lanka",
      minimumIncrement: 100000,
      endingDate:"2025-06-30",
      endingTime:"15:00:00",
      seller: {
        name: "Historical Artifacts",
        rating: 4.8,
        verified: true,
        itemsSold: 31,
        memberSince: "June 2017"
      },
      specifications: [
        { name: "Age", value: "18th Century" },
        { name: "Material", value: "Steel blade, ivory handle" },
        { name: "Length", value: "85 cm" },
        { name: "Condition", value: "Well preserved" },
        { name: "Origin", value: "South Asia" },
        { name: "Type", value: "Ceremonial" },
        { name: "Documentation", value: "Historical provenance available" }
      ],
      bidHistory: [
        { bidder: "History+++234", amount: 2700000, time: "20 minutes ago", status: "Winning" },
        { bidder: "Sword+++567", amount: 2600000, time: "1 hour ago", status: "" },
        { bidder: "Ancient+++890", amount: 2500000, time: "3 hours ago", status: "" }
      ],
      terms: [
        "All sales are final - no returns or exchanges",
        "Payment must be completed within 7 days of auction end",
        "Items must be collected within 30 days",
        "Buyer responsible for all taxes and duties",
        "Special handling and export permits may be required"
      ]
    },
    {
      id: 6,
      title: "Ancient Vase",
      caseNumber: "CP/2024/001239",
      description: "An ancient ceramic vase from Italy, showcasing Art Nouveau design elements. This elegant piece represents early 20th century European ceramic artistry with its distinctive glazing and form.",
      images: [avimg, avimg, avimg, avimg, avimg],
      status: "Ending Soon",
      currentBid: 600000,
      startingBid: 400000,
      timeLeft: "8h 30m 45s",
      totalBids: 10,
      location: "Batticaloa, Sri Lanka",
      minimumIncrement: 25000,
      endingDate:"2025-06-30",
      endingTime:"15:00:00",
      seller: {
        name: "Global Antiques",
        rating: 4.7,
        verified: true,
        itemsSold: 48,
        memberSince: "September 2018"
      },
      specifications: [
        { name: "Age", value: "Early 20th Century" },
        { name: "Material", value: "Ceramic" },
        { name: "Height", value: "32 cm" },
        { name: "Condition", value: "Excellent" },
        { name: "Origin", value: "Italy" },
        { name: "Style", value: "Art Nouveau" },
        { name: "Maker", value: "Unknown artisan" }
      ],
      bidHistory: [
        { bidder: "Ceramic+++456", amount: 600000, time: "15 minutes ago", status: "Winning" },
        { bidder: "Vase+++789", amount: 575000, time: "1 hour ago", status: "" },
        { bidder: "Italy+++012", amount: 550000, time: "2 hours ago", status: "" }
      ],
      terms: [
        "All sales are final - no returns or exchanges",
        "Payment must be completed within 7 days of auction end",
        "Items must be collected within 30 days",
        "Buyer responsible for all taxes and duties",
        "Fragile item - special packaging included"
      ]
    }
  ];
      const itemDetail={
          position:[6.9271, 79.8612], 
          locationName:"SriLankan Customs Head Q", 
          image: bronze
      };

  // Find the current item based on URL parameter
  const item = items.find(item => item.id === parseInt(itemId));

  // Handle case when item is not found
  if (!item) {
    return (
      <>
        <CustomHeader />
        <BidderHeader />
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Item Not Found</h2>
            <p className="text-gray-600 mb-6">The requested auction item could not be found.</p>
            <Link 
              to="/" 
              className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back to Auctions
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleBid = (e) => {
    e.preventDefault();
    if(!isUserLogged) {
      toast.error("Please log in before placing a bid.");
      return;
    }
    if (!bidAmount || parseInt(bidAmount) <= item.currentBid) {
      toast.warn(`Bid must be higher than current bid of ${formatCurrency(item.currentBid)}`);
      return;
    }
    toast.success(`Bid placed: ${formatCurrency(parseInt(bidAmount))}`);
    setBidAmount("");
  };

  const handleAddToWatchlist = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <CustomHeader />
      { isUserLogged ? <NavBar /> : <BidderHeader/>}      
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Back to Auctions */}
          <Link to="/" className="inline-flex items-center text-white bg-gray-600 px-3 py-2 rounded text-sm hover:bg-gray-700 mb-4">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back to Auctions
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Main image and thumbnails */}
            <div className="lg:col-span-2">
 

              {/* Main Image */}
              <div className="bg-white rounded-lg shadow-sm mb-4">

                <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                <div className="mb-4">
                <span className={`absolute top-2 right-2 items-center px-3 py-1 rounded-full text-sm font-medium ${
                  item.status === "Ending Soon" 
                    ? "bg-red-100 text-red-800" 
                    : "bg-green-500 text-white"
                }`}>
                  {item.status}
                </span>
              </div>
                  {item.images[selectedImage] ? (
                    <img 
                      src={item.images[selectedImage]} 
                      alt={item.title} 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <FontAwesomeIcon icon={faEye} className="text-gray-400 text-6xl" />
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    {selectedImage + 1} / {item.images.length}
                  </div>
                </div>
                
                {/* Thumbnail Images */}
                <div className="flex space-x-2 p-4 overflow-x-auto">
                  {item.images.map((img, index) => (
                    <div 
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 cursor-pointer rounded border-2 flex-shrink-0 ${
                        selectedImage === index ? 'border-blue-500' : 'border-gray-300'
                      }`}
                    >
                      {img ? (
                        <img 
                          src={img} 
                          alt={`${item.title} - view ${index + 1}`} 
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                          <FontAwesomeIcon icon={faEye} className="text-gray-400 text-xs" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Item Details Tabs */}
              <div className="bg-gray-100 rounded-lg mb-6">
                <div className="flex justify-between border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab("description")}
                    className={`py-3 px-6 text-center flex-grow ${
                      activeTab === "description" 
                      ? "bg-white text-gray-900 font-medium" 
                      : "text-gray-500 hover:text-gray-700 bg-gray-100"
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab("specifications")}
                    className={`py-3 px-6 text-center flex-grow ${
                      activeTab === "specifications" 
                      ? "bg-white text-gray-900 font-medium" 
                      : "text-gray-500 hover:text-gray-700 bg-gray-100"
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab("condition")}
                    className={`py-3 px-6 text-center flex-grow ${
                      activeTab === "condition" 
                      ? "bg-white text-gray-900 font-medium" 
                      : "text-gray-500 hover:text-gray-700 bg-gray-100"
                    }`}
                  >
                    Condition
                  </button>
                  <button
                    onClick={() => setActiveTab("terms")}
                    className={`py-3 px-6 text-center flex-grow ${
                      activeTab === "terms" 
                      ? "bg-white text-gray-900 font-medium" 
                      : "text-gray-500 hover:text-gray-700 bg-gray-100"
                    }`}
                  >
                    Terms
                  </button>
                </div>
                
            {activeTab === "description" && (
              <div className="bg-white p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Item Description</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{item.description}</p>

                {/* Item Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
                  {/* Left Side - Item Info */}
                  <div className="grid  pr-0">
                    {/* Case Number */}
                    <div className="flex items-start space-x-3 ">
                      <div className="w-5 h-5 mt-1 border-2 border-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Case Number</div>
                        <div className="font-medium text-gray-900">{item.caseNumber}</div>
                      </div>
                    </div>

                                    {/* Estimated Value */}
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 mt-1 border-2 border-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Estimated Value</div>
                        <div className="font-medium text-gray-900">
                          {formatCurrency(item.startingBid)} - {formatCurrency(item.currentBid * 1.5)}
                        </div>
                      </div>
                    </div>

                    {/* Seized Date */}
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 mt-1 border-2 border-gray-400 rounded-sm flex items-center justify-center flex-shrink-0">
                        <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400 text-xs" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Seized Date</div>
                        <div className="font-medium text-gray-900">{item.seizedDate}</div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 mt-1 border-2 border-gray-400 rounded-sm flex items-center justify-center flex-shrink-0">
                        <FontAwesomeIcon icon={faLocationDot} className="text-gray-400 text-xs" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Location</div>
                        <div className="font-medium text-gray-900">{item.location}</div>
                      </div>
                    </div>

    
                  </div>

                  {/* Right Side - Map */}
                  <div className="pr-0">
                    <LocationMap itemDetail={itemDetail} />
                  </div>
                </div>
              </div>
            )}
                            
                            {/* Specifications Tab */}
                            {activeTab === "specifications" && (
                              <div className="bg-white p-6">
                                <h2 className="font-semibold text-lg text-gray-900 mb-4">Item Specifications</h2>
                                
                                <div className="mb-6">
                                  {item.specifications.filter(spec => spec.name !== "Weight" && spec.name !== "Dimensions" && spec.name !== "Condition").map((spec, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                      <div className="w-5 h-5 mr-2 flex-shrink-0">
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                                      </div>
                                      <span>{spec.name} - {spec.value}</span>
                                    </div>
                                  ))}
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                                  <div>
                                    <p className="text-sm text-gray-500">Weight</p>
                                    <p className="font-medium text-gray-900">{item.specifications.find(spec => spec.name === "Weight")?.value || "N/A"}</p>
                                  </div>
                                  
                                  <div>
                                    <p className="text-sm text-gray-500">Dimensions</p>
                                    <p className="font-medium text-gray-900">{item.specifications.find(spec => spec.name === "Dimensions")?.value || "N/A"}</p>
                                  </div>
                                  
                                  <div>
                                    <p className="text-sm text-gray-500">Condition</p>
                                    <p className="font-medium text-gray-900">{item.specifications.find(spec => spec.name === "Condition")?.value || "N/A"}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                
                {/* Condition Tab - Fixed version */}
                {activeTab === "condition" && (
                  <div className="bg-white p-6">
                    <h2 className="text-xl font-bold mb-4">Condition Report</h2>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-5 flex items-start">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-3 mt-0.5" />
                      <p>This item has been inspected by Sri Lanka Customs officials and is certified to be in excellent condition.</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="text-gray-600">Overall Condition:</div>
                        <div className="font-medium text-green-500">
                          Excellent
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-gray-600">Inspection Date:</div>
                        <div className="font-medium">2024-01-20</div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-gray-600">Authentication:</div>
                        <div className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md text-sm font-medium">
                          Verified
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-gray-600">
                      <p>All items have been thoroughly inspected and authenticated by qualified customs officials. Any defects or issues would be clearly noted in this report.</p>
                    </div>
                  </div>
                )}
                
                {/* Terms Tab */}
                {activeTab === "terms" && (
                  <div className="bg-white p-6">
                    <h2 className="font-semibold text-lg text-gray-900 mb-4">Terms & Conditions</h2>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-5 flex items-start">
                      <FontAwesomeIcon icon={faInfoCircle} className="text-yellow-500 mr-3 mt-0.5" />
                      <p className="text-gray-700">Please read all terms carefully before placing a bid. All sales are final.</p>
                    </div>
                    
                    <ul className="space-y-3">
                      {item.terms.map((term, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-2 w-2 bg-gray-400 rounded-full mt-2 mr-3"></div>
                          <span className="text-gray-700">{term}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
            </div>

            {/* Right column - Bidding panel */}
            <div className="space-y-4">
              {/* Title and Case Number */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h1 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h1>
                <p className="text-sm text-gray-600">Case Number: {item.caseNumber}</p>
              </div>

              {/* Current Bid Info */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-600 mb-1">Current Highest Bid</div>
                  <div className="text-3xl font-bold text-green-600">{formatCurrency(item.currentBid)}</div>
                  <div className="text-sm text-gray-600">Starting Bid: {formatCurrency(item.startingBid)}</div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faClock} className="mr-1 text-red-500" />
                    <CountDownDate  date={item.endingDate} time={item.endingTime}/>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faUsers} className="mr-1" />
                    <span>{item.totalBids} bids</span>
                  </div>
                </div>

                {/* Bid Input */}
                <form onSubmit={handleBid} className="mb-3">
                  <div className="flex items-center mb-3">
                    <span className="text-gray-500 mr-2 text-sm">LKR</span>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder={`${item.currentBid + item.minimumIncrement}`}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min={item.currentBid + item.minimumIncrement}
                    />
                  </div>
                  
                  {/* Place Bid Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1e3a5f] text-white rounded-md font-medium hover:bg-[#294b78] transition flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faGavel} className="mr-2" />
                    Place Bid
                  </button>
                </form>
                
                <div className="text-center text-sm text-gray-600">
                  Minimum increment: {formatCurrency(item.minimumIncrement)}
                </div>
              </div>

              {/* Bid History */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-semibold mb-3 text-gray-800">Bid History</h3>
                <div className="text-sm text-gray-600 mb-3">Recent bidding activity</div>
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {item.bidHistory.map((bid, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 flex items-center justify-center">
                          <FontAwesomeIcon icon={faUsers} className="text-gray-500 text-xs" />
                        </div>
                        <div>
                          <div className="font-medium text-sm flex items-center">
                            {bid.bidder}
                            {bid.status === "Winning" && (
                              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">
                                Winning
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">{bid.time}</div>
                        </div>
                      </div>
                      <div className="font-medium text-right">
                        {formatCurrency(bid.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-semibold mb-3 text-gray-800">Quick Actions</h3>
                
                <button
                  onClick={handleAddToWatchlist}
                  className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition flex items-center justify-center mb-2"
                >
                  <FontAwesomeIcon icon={isFavorite ? faHeart : faHeartRegular} className="mr-2" />
                  {isFavorite ? "Remove from Watchlist" : "Add to Watchlist"}
                </button>
                
                <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition flex items-center justify-center">
                  <FontAwesomeIcon icon={faShare} className="mr-2" />
                  Share
                </button>

                <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition flex items-center justify-center mt-2">
                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                Report Issue
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      
      <Footer />
    </>
  );
}