import React, { useState ,useEffect, useCallback} from "react";
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
  faExclamationTriangle,
  faArrowUp,
  faTrophy
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import LocationMap from "../components/locationmap";
import useStompSubscriptions from "../hooks/useStompSubscriptions";
import {fetchProtectedResource} from "../pages/authApi"
import CountDownDate from "../components/countdown";
import CustomHeader from "../components/custom-header";
import BidderHeader from "../components/bidder-header";
import Footer from "../components/footer";
import NavBar from "../components/navbar";  
import { toast } from "react-toastify";
import axios from "axios";
import noImage from "../assets/ImageNotAvailable.png";
import BreadCrumbs from "../components/ui/breadCrumb";

// Import images
import Button from "@mui/material/Button";
import { formatDate } from "../function";
import { wsCallBackManager } from "../services/wsCallBackManager";

export default function ItemDetails() {
  const { itemId } = useParams();
  const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [isFinished, setIsFinished] = useState(false);  
  const [bidHistory, setBidHistory] = useState([]);


  const [item, setItem] = useState(null);

  const fetchItem = useCallback(async () => {
      try {
          // Step 1: Fetch the item details
          const itemResponse = await axios.get(`http://localhost:8082/is/v1/getItem/${itemId}`);
          const itemData = itemResponse.data;
          setItem(itemData);
          console.log('Fetched item details:', itemData);

          // Step 2: Fetch the bidding history
          const biddingHistoryResponse = await fetchProtectedResource(
              `http://localhost:8081/bs/v1/getBiddingHistory/${itemId}`,
              null,
              'GET'
          );
          const biddingHistoryData = biddingHistoryResponse.data;
          setBidHistory(biddingHistoryData);
          console.log(biddingHistoryData);

      } catch (error) {
          console.error('An error occurred:', error);
      }
  }, [itemId, setItem, setBidHistory]);

  useEffect(() => {
    fetchItem();
    const handleMyBidMessage = (myBid) => {
      console.log("My Bid received", myBid);
      if (myBid.itemId !== parseInt(itemId)) return;
      setBidHistory((prevBidHistory) => {
        console.log("Previous Bid History:", prevBidHistory);

        const bidExists = prevBidHistory.some(bid => bid.bidId === myBid.bidId);
  
        if (bidExists) {
          // If the bid already exists, map over the array and replace it
          const updatedBidHistory = prevBidHistory.map(bid =>
            bid.bidId === myBid.bidId ? myBid : bid
          );
          console.log("Updated Bid History (replaced):", updatedBidHistory);
          return updatedBidHistory;
        } else {
          // If the bid does not exist, append it to the end of the array
          const updatedBidHistory = [myBid, ...prevBidHistory];
          console.log("Updated Bid History (appended):", updatedBidHistory);
          return updatedBidHistory;
        }
      });
    };

    wsCallBackManager.setCallBack(handleMyBidMessage);

    return () => {
      wsCallBackManager.unSetCallBack();
    }
  }, [itemId]);

  const handleNewMessage = useCallback((bid) => {
    console.log("New message:", bid);
    console.log("Item id :", itemId);
    console.log("Item id :", parseInt(itemId));
    console.log("bid.itemId !== parseInt(itemId)", bid.itemId !== parseInt(itemId))
    if (bid.itemId !== parseInt(itemId)) return;
    setBidHistory((prevHistory) => {
      if (prevHistory.some(historyBid => historyBid.bidId === bid.bidId)) return prevHistory;
      else return [bid, ...prevHistory]
    });
  }, [setBidHistory, itemId]);

  useStompSubscriptions(`/topic/bid:${itemId}`, handleNewMessage);

  const terms = [
        "All sales are final - no returns or exchanges",
        "Payment must be completed within 7 days of auction end",
        "Items must be collected within 30 days",
        "Buyer responsible for all taxes and duties",
        "Item sold in current working condition"
        ]

  

  if (!item) {
    return (
      <>
        <CustomHeader />
        <BidderHeader />
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Item Not Found</h2>
            <p className="text-gray-600 mb-6">The requested auction item could not be found.</p>
            <Button 
              className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => navigate(-1)}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back to Auctions
            </Button>
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

  const handleBid = async (e) => {
    e.preventDefault();
    if (!item) return;
    // if(!isUserLogged) {
    //   toast.error("Please log in before placing a bid.");
    //   return;
    // }
    const bidAmount = bidHistory.length === 0 ? item.startingBid : (bidHistory[0].amount + item.increment);
    const response = await fetchProtectedResource(
      `http://localhost:8081/bs/v1/bid`,
      {
        bidderId: 1, // Replace with actual bidder ID
        itemId: item.id,
        amount: parseInt(bidAmount)
      },
      'POST'
    )
    .catch((error) => {
      console.error('Error placing bid:', error);
      toast.error('Failed to place bid. Please try again.');
    });

    if (response) {
      toast.success(`Bid placed: ${formatCurrency(parseInt(bidAmount))}`);
    }
  };

  const handleAddToWatchlist = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <CustomHeader />
      { isUserLogged ? <NavBar /> : <BidderHeader/>}      
      <div className="bg-gray-100 min-h-screen">
      <BreadCrumbs page="Item Details" breadCrumbs={[{ title: "Home", link: "/RegisteredUser/dashboard" }]} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Back to Auctions */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Main image and thumbnails */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-4 mb-2">
                <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h1>
                   <span className={`items-center px-3 py-1 rounded-full text-sm font-medium ${
                    item.status === "Not Scheduled"
                      ? "bg-yellow-300 text-gray-800"
                      : item.status === "Pending" 
                      ? "bg-blue-700 text-white"
                      : item.status === "Active"
                      ? "bg-green-600 text-white"
                      : item.status === "Ending Soon"
                      ? "bg-red-100 text-red-800"
                      : "bg-red-800 text-white"
                    }`}>
                    {item.status}
                  </span>
                  </div>
                <p className="text-sm text-gray-600">Case Number: {item.caseNumber}</p>
              </div>

          {item.images && item.images.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm mb-4">

                  <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                    {item.images[selectedImage] ? (
                      <img 
                        src={
                              item.images && item.images.length > 0
                                ? `http://localhost:8082/items/${item.caseNumber}-${item.id}/images/${item.images[selectedImage].url}`
                                : noImage
                            }
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
                            src={`http://localhost:8082/items/${item.caseNumber}-${item.id}/images/${item.images[index].url}`}
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
              )}  

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
                          {formatCurrency(item.valuation)}
                        </div>
                      </div>
                    </div>

                    {/* Seized Date
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 mt-1 border-2 border-gray-400 rounded-sm flex items-center justify-center flex-shrink-0">
                        <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400 text-xs" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Seized Date</div>
                        <div className="font-medium text-gray-900">{item.seizedDate}</div>
                      </div>
                    </div> */}

                    {/* Location */}
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 mt-1 border-2 border-gray-400 rounded-sm flex items-center justify-center flex-shrink-0">
                        <FontAwesomeIcon icon={faLocationDot} className="text-gray-400 text-xs" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Location</div>
                        <div className="font-medium text-gray-900">{item.location?.name}</div>
                      </div>
                    </div>

    
                  </div>

                  {/* Right Side - Map */}
                  <div className="pr-0">
                    <LocationMap itemDetail={{position:[item.location.latitude,item.location.longitude], locationName: item.location?.name , image:(item.images.length)? `http://localhost:8082/${item.caseNumber}-${item.id}/${item.images[0].url}` : noImage }} />
                  </div>
                </div>
              </div>
            )}

                            
{activeTab === "specifications" && (
              <div className="bg-white p-6">
                <h2 className="font-semibold text-lg text-gray-900 mb-4">Item Specifications</h2>
                
                <div className="mb-6">
                  {item.specs.filter(spec => spec.key !== "Weight" && spec.key !== "Dimensions" && spec.key !== "Condition").map((spec, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <div className="w-5 h-5 mr-2 flex-shrink-0">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                      </div>
                      <span>{spec.key} - {spec.value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="font-medium text-gray-900">{item.specs.find(spec => spec.key === "Weight")?.value || "N/A"}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Dimensions</p>
                    <p className="font-medium text-gray-900">{item.specs.find(spec => spec.key === "Dimensions")?.value || "N/A"}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Condition</p>
                    <p className="font-medium text-gray-900">{item.specs.find(spec => spec.key === "Condition")?.value || "N/A"}</p>
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
                      {terms.map((term, index) => (
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


              {/* Current Bid Info */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-600 mb-1">Current Highest Bid</div>
                  <div className="text-3xl font-bold text-green-600">{bidHistory.length === 0
                                                                            ? "No Bids Yet"
                                                                            : formatCurrency(bidHistory[0].amount)}</div>
                  <div className="text-sm text-gray-600">Starting Bid: {formatCurrency(item.startingBid)}</div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faClock} className="mr-1 text-red-500" />
                    <CountDownDate  dateTime={item.auction.endingTime}/>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faUsers} className="mr-1" />
                    <span>{bidHistory.length} bids</span>
                  </div>
                </div>

                {/* Bid Input */}
                <form onSubmit={handleBid} className="mb-3">
   
                  
                  {/* Place Bid Button */}
                  <button
                    type="button"
                    className={`w-full py-3 bg-[#1e3a5f] text-white rounded-md font-medium hover:bg-[#294b78] transition flex items-center justify-center 
                              disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed`}
                    disabled={item.status==='Completed' || bidHistory[0]?.placedByMe}
                    onClick={handleBid}
                  >
                    

                    <FontAwesomeIcon icon={faGavel} className="mr-2" />
                    Place Bid : {bidHistory.length === 0
                                  ? formatCurrency(item.startingBid)
                                  : formatCurrency(bidHistory[0].amount + item.increment)}
                  </button>
                <div className="text-center text-sm text-gray-600 mt-4">
                  Minimum increment: {formatCurrency(item.increment)}
                </div>
                  <div className="border-b border-gray-200 mx-auto my-4 w-full"></div>
                  <div className="text-xs text-gray-500 mb-2 block bg-gray-100 px-2 py-1 rounded-md">
                    <span className="block">You can also add maximum bid amount to place auto bid. Our system will automatically bid for you until your maximum bid is reached.</span>
                  
                  <div className="flex items-center mb-3 mt-2">
                    <span className="text-[#294b78] mr-2 text-sm">LKR</span>
                    <input
                      type="number"
                      // value={bidAmount}
                      // onChange={(e) => setBidAmount(e.target.value)}
                      placeholder="Enter your bid amount"
                      className="flex-1 border border-[#294b78] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      // min={highestBid + item.increment}
                    />
                    
                    {/* <button className={`ml-2 text-white px-2 py-3 rounded-md bg-[#294b78] transition text-xs ${(bidAmount === "" || item.status==="Completed ") && 'opacity-50 cursor-not-allowed'}`}type="submit" disabled={bidAmount === "" || item.status==="Completed"}>  */}
                        <button className={`ml-2 text-white px-2 py-3 rounded-md bg-[#294b78] transition text-xs`}> 
                      <FontAwesomeIcon icon={faArrowUp} className="mr-1" />
                      <span className="text-xs font-semibold">Place Auto-Bid </span>
                    </button>
                  </div>
                  </div>
                </form>

                

              </div>

              {/* Bid History */} 
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="font-semibold mb-3 text-gray-800">Bid History</h3>
                  <div className="text-sm text-gray-600 mb-3">Recent bidding activity</div>
                  
                  <div className="space-y-2 max-h-80 overflow-y-auto" style={{ scrollbarWidth: 'thin'}}>
                    {bidHistory.map((bid, index) => (
                      <div key={bid.bidId} className={`flex flex-col justify-center py-2 border-b border-gray-100 px-2 last:border-b-0 ${index === 0 && "bg-green-300 rounded-xl"}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 flex items-center justify-center">
                              {index === 0 ? <FontAwesomeIcon icon={faTrophy} className="text-amber-500 text-xs" /> : <FontAwesomeIcon icon={faGavel} className="text-gray-500 text-xs" />}
                            </div>
                            <div className="font-medium text-sm flex items-center">
                              {formatDate(bid.bidTime)}
                            </div>
                          </div>
                          <div className="font-medium text-right">
                            {formatCurrency(bid.amount)}
                          </div>
                        </div>
                        {bid.placedByMe && <div className="text-xs text-gray-500">My Bid</div>}
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