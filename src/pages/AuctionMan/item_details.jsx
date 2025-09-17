import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faClock, faUsers, faCheckCircle, faGavel, faEye, faEdit, faTrash, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { LineChart, MarkElement } from '@mui/x-charts/LineChart';
import LocationMap from "../../components/locationmap";
import useStompSubscriptions from "../../hooks/useStompSubscriptions";
import { fetchProtectedResource } from "../authApi";

import CountDownDate from "../../components/countdown";
import CustomHeader from "../../components/custom-header";
import AuctionManHeader from "../../components/auctionMan-header";
import BreadCrumbs from "../../components/ui/breadCrumb";
import Footer from "../../components/footer";

import { formatCurrency, formatDate } from "../../function";
import axios from "axios";
import SchedueAuction from "../../components/ui/schedueAuction";

const CustomMark = (props) => {
  return <MarkElement {...props} sx={{ fill: '#4CAF50', strokeWidth: 0, }} />
};

export default () => {
  const { itemId } = useParams();
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
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
          const {data : {bidHistoryItems}} = await fetchProtectedResource(
              `http://localhost:8081/bs/v1/getBiddingDetails/${itemId}`,
              null,
              'GET'
          );
          setBidHistory(bidHistoryItems);
          console.log(biddingHistoryData);

      } catch (error) {
          console.error('An error occurred:', error);
      }
  }, [itemId, setItem, setBidHistory]);

  useEffect(() => {
    fetchItem();
  }, [itemId]);

  const handleNewMessage = useCallback((bid) => {
    console.log("New message:", bid);
    if (bidHistory.some(historyBid => historyBid.bidId === bid.bidId) || bid.itemId != itemId) {
      console.log("Bid is already in history. Probably it is a my bid");
      return;
    }
    console.log("continued");
    setBidHistory((prevHistory) => [
      bid,
      ...prevHistory
    ]);
  }, [setBidHistory, item]);

  useStompSubscriptions(`/topic/bid:${itemId}`, handleNewMessage);

  // Handle case when item is not found
  if (!item) {
    return (
      <>
        Item Not Found
      </>
    );
  }

  return (
    <>
      <CustomHeader />
      <AuctionManHeader />
      <BreadCrumbs page="Item Details" breadCrumbs={[
                      { title: "Home", link: "/AuctionMan" },
                  ]} />
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Main image and thumbnails */}
            <div className="lg:col-span-2">

              <div className="bg-white rounded-lg shadow-sm p-4  mb-2">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-xl font-bold text-gray-900">{item.title}</h1>
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
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Case Number: {item.caseNumber}</p>
                  {item.status === "Not Scheduled" && (
                    <span className="text-lg text-gray-500 flex gap-2 mr-2">
                      <button className="border border-gray-300 px-3 py-1 rounded-md text-sm hover:bg-gray-100 transition">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="border border-gray-300 px-3 py-1 rounded-md text-sm hover:bg-gray-100 transition">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </span>
                  )}
                </div>
              </div>
 

              {/* Main Image */}
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
              </div>
                
            {activeTab === "description" && (
              <div className="bg-white p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Item Description</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{item.description}</p>

                {/* Item Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
                  {/* Left Side - Item Info */}
                  <div className="flex flex-col gap-5 pr-0">
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
                  {(item.location && item.location.latitude && item.location.longitude) && (
                    <div className="pr-0">
                      {/* <LocationMap itemDetail={itemDetail} /> */}
                      <LocationMap itemDetail={{
                        position:[item.location.latitude, item.location.longitude], 
                        locationName: item.location?.name, 
                        // image: `http://localhost:8082/${item.caseNumber}-${item.id}/${item.images[0].url}`
                      }} />
                    </div>
                  )}
                </div>
              </div>
            )}
                            
            {/* Specifications Tab */}
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
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mr-3 mt-0.5" />
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
          </div>
        </div>

            {/* Right column - Bidding panel */}
            <div className="space-y-4">
              {/* Auction Info */}
              {item.status === "Not Scheduled" ? (
                <SchedueAuction item={item} fetchItem={fetchItem} />
              ) : item.status === "Pending" ? (
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="text-center mb-4">
                    <div className="text-sm text-gray-600 mb-1 font-semibold">Starting Bid</div>
                    <div className="text-3xl font-bold text-green-600">{formatCurrency(item.startingBid)}</div>
                  <div className="text-center text-sm text-gray-600"><span className=" font-semibold">Increment:</span> {formatCurrency(item.increment)}</div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <div className="flex flex-col items-start">
                      <p className="font-semibold">Starts at</p>
                      <p>{formatDate(item.auction?.startingTime)}</p>
                    </div>
                    <div className="flex flex-col items-start">
                      <p className="font-semibold">Ends at</p>
                      <p>{formatDate(item.auction?.endingTime)}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faClock} size="xl" className="mr-1 text-green-600" />
                      <div className="h-full border-l border-gray-300"></div>
                      <div className="flex flex-col">
                        <p className="text-gray-600 font-semibold">Starts in</p>
                        <CountDownDate  dateTime={item.auction?.startingTime} starting={true} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : item.status === "Active" || item.status === "Ending Soon" ? (
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="text-center mb-4">
                    <div className="text-sm text-gray-600 mb-1 font-semibold">Current Highest Bid</div>
                    {/* <div className="text-3xl font-bold text-green-600">{formatCurrency(item.currentBid)}</div> */}
                    <div className="text-3xl font-bold text-green-600">{bidHistory.length === 0
                                                                            ? "No Bids Yet"
                                                                            : formatCurrency(bidHistory[0].amount)}</div>
                    <div className="text-sm text-gray-600"><span className=" font-semibold">Starting Bid:</span> {formatCurrency(item.startingBid)}</div>
                  <div className="text-center text-sm text-gray-600"><span className=" font-semibold">Increment:</span> {formatCurrency(item.increment)}</div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <div className="flex flex-col items-start">
                      <p className="font-semibold">Started at</p>
                      <p>{formatDate(item.auction?.startingTime)}</p>
                    </div>
                    <div className="flex flex-col items-start">
                      <p className="font-semibold">Ends at</p>
                      <p>{formatDate(item.auction?.endingTime)}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faClock} size="xl" className="mr-1 text-red-600" />
                      <div className="h-full border-l border-gray-300"></div>
                      <div className="flex flex-col">
                        <p className="text-gray-600 font-semibold">Ends in</p>
                        <CountDownDate  dateTime={item.auction?.endingTime} />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faUsers} className="mr-1" />
                      <span>{bidHistory.length} bids</span>
                    </div>
                  </div>
                </div>
              ) : item.status == "Completed" && (
                <>
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="text-center mb-4">
                      <div className="text-sm text-gray-600 mb-1 font-semibold">Highest Bid</div>
                      {/* <div className="text-3xl font-bold text-green-600">{formatCurrency(item.currentBid)}</div> */}
                      <div className="text-3xl font-bold text-green-600">{formatCurrency(340000)}</div>
                      <div className="text-sm text-gray-600"><span className=" font-semibold">Starting Bid:</span> {formatCurrency(item.startingBid)}</div>
                    <div className="text-center text-sm text-gray-600"><span className=" font-semibold">Increment:</span> {formatCurrency(item.increment)}</div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <div className="flex flex-col items-start">
                        <p className="font-semibold">Started at</p>
                        <p>{formatDate(item.auction?.startingTime)}</p>
                      </div>
                      <div className="flex flex-col items-start">
                        <p className="font-semibold">Ended at</p>
                        <p>{formatDate(item.auction?.endingTime)}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faClock} className="mr-1 text-red-500" />
                        <span className="text-md font-bold text-red-500">Auction Ended</span>
                      </div>
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faUsers} className="mr-1" />
                        {/* <span>{item.totalBids} bids</span> */}
                        <span>9 bids</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-semibold mb-3 text-gray-800">Winner's Details</h3>
                    <div className="flex items-center mb-4">
                      <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="Winner"
                        className="w-22 h-22 rounded-full object-cover mr-4 border-2 border-gray-300"
                      />
                      <div>
                        <div className="font-semibold text-gray-900 text-lg">John Doe</div>
                        <div className="text-gray-600 text-sm">NIC: 123456789V</div>
                        <div className="text-gray-600 text-sm">Phone: +94 77 123 4567</div>
                        <div className="text-gray-600 text-sm">Email: johndoe@email.com</div>
                      </div>
                    </div>
                    <button
                      className="w-full py-2 mt-2 bg-[#1e3a5f] text-white rounded-md font-medium hover:bg-[#294b78] transition flex items-center justify-center"
                      // onClick={}
                      >
                      <FontAwesomeIcon icon={faGavel} className="mr-2" />
                      Issue Release Order
                    </button>
                  </div>
                </>
              )
              }

              {(item.status === "Active" || item.status === "Ending Soon" || item.status === "Completed")  && (
              <>
                <div className="bg-white rounded-lg shadow-sm">
                  <h3 className="p-4 font-semibold text-gray-800">Bids Over Time</h3>
                  <LineChart
                      xAxis={[{ 
                        data: [1, 3, 6, 7, 7.5, 7.6, 7.65, 7.68, 7.7, 7.8, 7.9, 8],
                        label: 'Time (Days)'
                        }]}
                      yAxis={[{ label: 'Bid Amount (Rs.1000)' }]}
                      series={[
                        {
                          data: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                          color: '#4CAF50',
                          markShape: 'square',
                          // showMark: false,
                        },
                      ]}
                      height={300}
                      slots={{
                        mark: CustomMark, // Use your custom MarkElement component
                      }}
                    />
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="font-semibold mb-3 text-gray-800">Bid History</h3>
                  <div className="text-sm text-gray-600 mb-3">Recent bidding activity</div>
                  
                  <div className="space-y-2 max-h-80 overflow-y-auto" style={{ scrollbarWidth: 'thin'}}>
                    {bidHistory.map((bid, index) => (
                      <div key={bid.bidId} className={`flex items-center justify-between py-2 border-b border-gray-100 px-2 last:border-b-0 ${index === 0 && "bg-green-300 rounded-xl"}`}>
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
                    ))}
                  </div>
                </div>
              </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}