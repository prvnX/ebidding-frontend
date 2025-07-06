import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faImages, faDollarSign, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import CustomHeader from "../../components/custom-header";
import ImageUploader from "../../components/ui/imagesUpload";

import custombanner from "../../assets/custom-banner.png";
import LocationMap from "../../components/locationmap";
import Footer from "../../components/footer";
import BredCrumb from "../../components/ui/breadCrumb";

const AddItem = () => {

    const navigate = useNavigate();

    return (
        <>
            <CustomHeader />

            {/* dashboard header */}
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
                                <h1 className="text-lg  md:text-2xl font-bold text-white">Add a New Item</h1>
                                <p className="text-xs md:text-sm text-white/80">Create a new auction item</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <BredCrumb page="Add New Item" breadCrumbs={[
                { title: "Home", link: "/AuctionMan" },
            ]} />
            <form className="flex flex-col items-center justify-center gap-5 px-4 form-style">
                <div className="max-w-4xl w-full bg-white border border-gray-300 shadow-sm rounded p-6">
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon icon={faCircleInfo} size="xl" />
                        <h2 className="text-2xl font-semibold">Basic Information</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Enter the basic information of the item
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 my-3">
                        <div className="flex-1">
                            <label>Item Title *</label>
                            <input
                                type="text"
                                name="itemName"
                                placeholder="Enter item name"
                                required
                                />
                        </div>
                        <div className="flex-1">
                            <label>Case Number *</label>
                            <input
                                type="text"
                                name="itemName"
                                placeholder="Enter item name"
                                required
                                />
                        </div>
                    </div>

                    <div className="my-3">
                        <label>Description *</label>
                        <textarea
                            name="description"
                            placeholder="Detailed description of the item..."
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 my-3">
                        <div className="flex-1">
                            <label>Category *</label>
                            <select
                                name="category"
                            >
                                <option value="">Select category</option>
                                <option value="vehicles">Vehicles</option>
                                <option value="electronics">Electronics</option>
                                <option value="furniture">Furniture</option>
                                <option value="clothing">Clothing</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label>Condition *</label>
                            <select
                                name="category"
                            >
                                <option value="">Select category</option>
                                <option value="vehicles">Excellent</option>
                                <option value="electronics">Good</option>
                                <option value="furniture">Fair</option>
                                <option value="clothing">Poor</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 my-3">
                        <div className="flex-1">
                            <label>Location *</label>
                            <select
                                name="location"
                            >
                                <option value="">Select Location</option>
                                <option value="vehicles">Yard 1</option>
                                <option value="electronics">Yard 2</option>
                                <option value="furniture">Yard 3</option>
                                <option value="clothing">Pic on Map</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label>Address *</label>
                            <input
                                name="address"
                                placeholder="Enter the Addres"
                                min="0"
                                required
                            />
                        </div>
                    </div>
                    <div className="aspect-square mx-auto max-h-100">
                        <LocationMap 
                            itemDetail={{
                                position: [6.9271, 79.8612], // Example coordinates
                                locationName: "Colombo",
                            }} />
                    </div>
                </div>

                <div className="max-w-4xl w-full bg-white border border-gray-300 shadow-sm rounded p-6">
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon icon={faImages} size="xl" />
                        <h2 className="text-2xl font-semibold">Item Images</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Upload up to 10 images of the item
                    </p>
                    <ImageUploader />
                </div>

                <div className="max-w-4xl w-full bg-white border border-gray-300 shadow-sm rounded p-6">
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon icon={faDollarSign} size="xl" />
                        <h2 className="text-2xl font-semibold">Financial Details</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Set pricing and valuation information
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 my-3">
                        <div className="flex-1">
                            <label>Starting Bid *</label>
                            <input
                                type="number"
                                name="startingBid"
                                placeholder="Enter starting bid"
                                required
                                />
                        </div>
                        <div className="flex-1">
                            <label>Increment Value *</label>
                            <input
                                type="number"
                                name="increment"
                                placeholder="Enter Increment Value"
                                required
                                />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 my-3">
                        <div className="flex-1">
                            <label>Valuation</label>
                            <input
                                type="number"
                                name="startingBid"
                                placeholder="Enter starting bid"
                                />
                        </div>
                        <div className="flex-1" />
                    </div>
                </div>
                
                <div className="max-w-4xl w-full bg-white border border-gray-300 shadow-sm rounded p-6">
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon icon={faCalendarDays} size="xl" />
                        <h2 className="text-2xl font-semibold">Auction Dates</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        This data can also be set later.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 my-3">
                        <div className="flex-1">
                            <label>Auction Start Date and Time</label>
                            <input
                                type="datetime-local"
                                name="startingTime"
                                />
                        </div>
                        <div className="flex-1">
                            <label>Auction End Date and Time</label>
                            <input
                                type="dateTime-local"
                                name="endingTime"
                                />
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl w-full flex justify-end gap-2">
                    <Link
                        to="/AuctionMan" 
                        className="bg-white text-[#1e3a5f] hover:bg-[#e0e0ee] rounded-lg py-2 px-4 flex items-center border border-gray-200 shadow-sm cursor-pointer">
                            Cancel
                    </Link>
                    <button 
                        type="button"
                        className="bg-white text-[#1e3a5f] hover:bg-[#e0e0ee] rounded-lg py-2 px-4 flex items-center border border-gray-200 shadow-sm cursor-pointer">
                            Save as Draft
                    </button>
                    <button 
                        // type="submit" 
                        className="bg-[#1e3a5f] text-white hover:bg-[#2d4a6b] rounded-lg py-2 px-4 flex items-center border border-gray-200 shadow-sm cursor-pointer"
                        onClick={(e) => {
                            navigate('/auctionMan', { state: { success: 'Item added successfully' } });
                        }}
                        >
                        Create Auction Item
                    </button>
                </div>
            </form>
            <Footer />
        </>
    );
}

export default AddItem;