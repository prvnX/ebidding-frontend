import { useRef, useState, useEffect, useCallback, use } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faClipboardList, faImages, faDollarSign, faCalendarDays, faPlus, faTimes, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import CustomHeader from "../../components/custom-header";
import ImagesUploader from "../../components/ui/imagesUpload";
import FilesUpload from "../../components/ui/filesUpload";
import { toast } from "react-toastify";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

import custombanner from "../../assets/custom-banner.png";
import LocationMap from "../../components/locationmap";
import Footer from "../../components/footer";
import BredCrumb from "../../components/ui/breadCrumb";
import axios from "axios";

const AddItem = () => {

    const navigate = useNavigate();
    //Basic information

    const [basicInfo, setBasicInfo] = useState({
        title: '',
        caseNumber: '',
        description: '',
        category: '',
        condition: '',
    });

    const handleBasicInfoChange = (e) => {
        const { name, value } = e.target;
        setBasicInfo((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    //Location

    const [locationDetails, setLocationDetails] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState({});

    const handleLocationChange = useCallback((e) => {
        if(!e.target.value) {
            setSelectedLocation({});
            return;
        }
        let loc = locationDetails.find(location => location.id == e.target.value);
        if (!loc) {
            setSelectedLocation({});
            return;
        }
        setSelectedLocation(
            {
                id: loc.id,
                position: [loc.latitude, loc.longitude],
                name: loc.name,
                address: loc.address
            }
        )
    })
    

    useEffect(() => {
        axios.get('http://localhost:8082/is/v1/allLocations')
            .then(response => {
                setLocationDetails(response.data);
            })
            .catch(error => {
                console.error("Error fetching location details:", error);
            });
    }, []);

    //Specifications

    const vehicleSpecs = [
        { key: 'Make', value: '' },
        { key: 'Model', value: '' },
        { key: 'Year', value: '' },
        { key: 'Color', value: '' },
        { key: 'Mileage', value: '' },
    ];

    const jewelrySpecs = [
        { key: 'Material', value: '' },
        { key: 'Weight', value: '' },
        { key: 'Size', value: '' },
        { key: 'Gemstone', value: '' },
        { key: 'Certification', value: '' },
    ];

    const [requiredSpecs, setRequiredSpecs] = useState([{ key: '', value: '' }]);

    useEffect(() => {
        switch (basicInfo.category) {
            case 'Vehicle':
            setRequiredSpecs(vehicleSpecs);
            break;
            case 'Jewelry':
            setRequiredSpecs(jewelrySpecs);
            break;
            default:
            setRequiredSpecs([]);
            break;
        }
    }, [basicInfo.category]);

    const [specs, setSpecs] = useState([{ key: '', value: '' }]);

    const handleRequiredSpecChange = (index, value) => {
        const updated = [...requiredSpecs];
        updated[index].value = value;
        setRequiredSpecs(updated);
    };

    const handleSpecChange = (index, field, value) => {
        const updated = [...specs];
        updated[index][field] = value;
        setSpecs(updated);
    };

    const addRow = () => {
        setSpecs([...specs, { key: '', value: '' }]);
    };

    const removeRow = (index) => {
        const updated = specs.filter((_, i) => i !== index);
        setSpecs(updated);
    };

    //Images

    const [coverImage, setCoverImage] = useState('');
    const [images, setImages] = useState([]);

    //Financial Details

    const [finacInfo, setFinacInfo] = useState({
        startingBid: '',
        increment: '',
        valuation: ''
    });

    const handleFinacInfoChange = (e) => {
        const {name, value} = e.target;
        setFinacInfo((prev) => ({
            ...prev,
            [name]: value
        })
        )
    }

    //files

    const [files, setFiles] = useState([]);

    //auction details

    dayjs.extend(utc);
    dayjs.extend(timezone);
    
    // ✅ Set default timezone to Sri Lanka
    dayjs.tz.setDefault('Asia/Colombo');
    
    const initialMinTime = useRef(dayjs().endOf('minute')); // Initialize with current date/time using dayjs
    const [endingTimeMin, setEndingTimeMin] = useState(initialMinTime.current); // Initialize endingTimeMin with initialMinTime
    const [startTimeError, setStartTimeError] = useState(false);
    const [endTimeError, setEndTimerError] = useState(false);
    const [gapError, setGapError] = useState(false);
    const [startingTime, setStartingTime] = useState();
    const [endingTime, setEndingTime] = useState();

    useEffect(() => {
        const startDate = startingTime ? dayjs(startingTime) : null;
        const endDate = endingTime ? dayjs(endingTime) : null;

        // Check if start/end dates are in the past
        // Use dayjs().startOf('minute') for more accurate "now" comparison
        const isStartInvalid = startDate && startDate.isBefore(initialMinTime.current);
        const isEndInvalid = endDate && endDate.isBefore(initialMinTime.current);

        // Check if gap is less than 6 hours
        const isGapInvalid = startDate && endDate && endDate.diff(startDate, 'hour') < 6;

        setStartTimeError(isStartInvalid);
        setEndTimerError(isEndInvalid);
        setGapError(isGapInvalid);
    }, [startingTime, endingTime]);


    //Handle form submission

    const handleFormSubmition = (e) => {
        e.preventDefault();
        const form = e.target;

        if (form.checkValidity() === false) {
            toast.error("Please fill all the required fields.")
            form.reportValidity();
            return;
        }

        if (endTimeError || startTimeError || gapError) {
            toast.error("Please provide valid auction dates");
            return;
        }

        const newItem = {
            ...basicInfo,
            specs : [...specs, ...requiredSpecs],
            ...finacInfo,
            auction: {
                startingTime,
                endingTime
            },
            location : {
                id: selectedLocation.id,
            }
        }

        const formData = new FormData();
        formData.append('item', JSON.stringify(newItem));
        formData.append("cover", coverImage);  // append cover image
        images.forEach((imageFile) => {
            formData.append("images", imageFile);  // append each image with same key
        });
        files.forEach((file) => {
            formData.append("files", file.file, file.name);
        })

        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        axios.post("http://localhost:8082/is/v1/createItem", formData)
             .then(res => {
                const {status, data} = res;
                if (status === 200 && data.success) {
                    toast.success("Item added successfully");
                    navigate('/auctionMan');
                }
            })
            .catch(error => {
                console.error('Error scheduling auctions:', error);
                // addFlashMessage('error', 'Failed to add item. Please try again.');
                toast.error("Failed to add item. Please try again.");
            });
    }

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
            <form onSubmit={handleFormSubmition} className="flex flex-col items-center justify-center gap-5 px-4 form-style">
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
                                name="title"
                                value={basicInfo.title}
                                onChange={handleBasicInfoChange}
                                placeholder="Enter item name"
                                required
                                />
                        </div>
                        <div className="flex-1">
                            <label>Case Number *</label>
                            <input
                                type="text"
                                name="caseNumber"
                                value={basicInfo.caseNumber}
                                onChange={handleBasicInfoChange}
                                placeholder="Enter item name"
                                required
                                />
                        </div>
                    </div>

                    <div className="my-3">
                        <label>Description *</label>
                        <textarea
                            name="description"
                            value={basicInfo.description}
                            onChange={handleBasicInfoChange}
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
                                value={basicInfo.category}
                                onChange={handleBasicInfoChange}
                                required
                            >
                                <option value="">Select category</option>
                                <option value="Vehicle">Vehicles</option>
                                <option value="Jewelry">Jewelry</option>
                                {/* <option value="electronics">Electronics</option>
                                <option value="furniture">Furniture</option>
                                <option value="clothing">Clothing</option> */}
                                <option value="General">General</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label>Condition *</label>
                            <select
                                name="condition"
                                value={basicInfo.condition}
                                onChange={handleBasicInfoChange}
                                required
                            >
                                <option value="">Select Condition</option>
                                <option value="Excellent">Excellent</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                                <option value="Poor">Poor</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 my-3">
                        <div className="flex-1">
                            <label>Location *</label>
                            <select
                                name="locationId"
                                value={selectedLocation.id || ''}
                                onChange={handleLocationChange}
                            >
                                <option value="">Select Location</option>
                                {locationDetails && locationDetails.map((location, index) => (
                                    <option key={index} value={location.id}>{location.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label>Address</label>
                            <input
                                placeholder="Select the location first, address will be auto-filled"
                                min="0"
                                value={selectedLocation.address}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="mx-auto aspect-square max-w-100">
                        <LocationMap itemDetail={selectedLocation} />
                    </div>
                </div>

                <div className="max-w-4xl w-full bg-white border border-gray-300 shadow-sm rounded p-6">
                    <div className="flex items-center gap-4 mb-2">
                        <FontAwesomeIcon icon={faClipboardList} size="xl" />
                        <h2 className="text-2xl font-semibold">Specification</h2>
                    </div>

                    {basicInfo.category !== '' && basicInfo.category !== 'General' && (
                        <p className="text-sm text-gray-600 mb-4">
                            Required specifications for item type {basicInfo.category}.
                        </p>
                    )}


                    <div className="space-y-2">
                        {requiredSpecs.map((spec, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={spec.key}
                                    readOnly
                                    className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm"
                                    required
                                    tabindex="-1"
                                />
                                <input
                                    type="text"
                                    placeholder="Value"
                                    value={spec.value}
                                    onChange={(e) => handleRequiredSpecChange(index, e.target.value)}
                                    className="flex-2 border border-gray-300 rounded px-3 py-1 text-sm"
                                    required
                                />
                                <div className="w-3" />
                            </div>
                        ))}
                    <p className="text-sm text-gray-600 mb-4">
                        Add any additional specifications or details about the item
                    </p>
                        {specs.map((spec, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Key"
                                value={spec.key}
                                onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                                className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm"
                            />
                            <input
                                type="text"
                                placeholder="Value"
                                value={spec.value}
                                onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                                className="flex-2 border border-gray-300 rounded px-3 py-1 text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => removeRow(index)}
                                className="text-red-500 hover:text-red-700"
                                title="Remove"
                                >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        ))}
                        <div className="w-full">
                            <button
                                type="button"
                                onClick={addRow}
                                className="mt-3 ml-auto text-sm text-blue-600 hover:underline flex items-center gap-1"
                                >
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </div>
                    </div>

                <div className="max-w-4xl w-full bg-white border border-gray-300 shadow-sm rounded p-6">
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon icon={faImages} size="xl" />
                        <h2 className="text-2xl font-semibold">Item Images</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Upload up to 10 images (total size must be under 50 MB).
                    </p>
                    <ImagesUploader images={images} setImages={setImages} coverImage={coverImage} setCoverImage={setCoverImage} />
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
                                value={finacInfo.startingBid}
                                onChange={handleFinacInfoChange}
                                placeholder="Enter starting bid"
                                required
                                />
                        </div>
                        <div className="flex-1">
                            <label>Increment Value *</label>
                            <input
                                type="number"
                                name="increment"
                                value={finacInfo.increment}
                                onChange={handleFinacInfoChange}
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
                        <FontAwesomeIcon icon={faPaperclip} size="xl" />
                        <h2 className="text-2xl font-semibold">Attachments</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Upload any additional documents or files related to the item (e.g., ownership documents, certificates).<br/>The total file size must be under 50 MB.
                    </p>
                    <FilesUpload documents={files} setDocuments={setFiles} />
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className="flex-1">
                                <label>Auction Start Date and Time</label>
                                <DateTimePicker
                                    value={startingTime ? dayjs(startingTime) : null}
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                    onChange={(newValue) => {
                                        // Update the startingDateTime state
                                        setStartingTime(newValue);
                                        // Set the minimum for the ending picker to the newly selected starting time
                                        setEndingTimeMin(newValue ? dayjs(newValue).add(6, 'hour') : initialMinTime.current);
                                    }}
                                    minDateTime={initialMinTime.current}
                                    // Removed maxDateTime prop as startingTimeMax is not defined
                                    format="DD/MM/YYYY HH:mm"
                                    slotProps={{ textField: { 
                                        size: "small", 
                                        error: startTimeError,
                                        helperText: startTimeError ? "Cannot be in the past." : null
                                        }}}
                                    ampm={false}
                                    className="w-full"
                                />
                            </div>
                            <div className="flex-1">
                                <label>Auction End Date and Time</label>
                                <DateTimePicker
                                    value={endingTime ? dayjs(endingTime) : null}
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                    onChange={(newValue) => {
                                        setEndingTime(newValue);
                                    }}
                                    minDateTime={endingTimeMin}
                                    format="DD/MM/YYYY HH:mm"
                                    ampm={false}
                                    slotProps={{ textField: {
                                        size: "small",
                                        error: endTimeError || gapError,
                                        helperText: endTimeError ? "Cannot be in the past." : gapError ? "There should be at least 6 hours gap" : null
                                        }}}
                                    className="w-full"
                                />
                            </div>
                        </LocalizationProvider>
                    </div>
                    <p className="text-sm text-gray-600"><strong>Note:</strong> An auction should last for at least 6 hours</p>
                    <p className="text-sm text-gray-600"><strong>Note:</strong> All times on this page are shown in Sri Lanka Time (GMT+5:30)</p>
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
                        type="submit" 
                        className="bg-[#1e3a5f] text-white hover:bg-[#2d4a6b] rounded-lg py-2 px-4 flex items-center border border-gray-200 shadow-sm cursor-pointer"
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