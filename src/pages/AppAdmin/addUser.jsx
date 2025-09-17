import { useState, useEffect, use, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faUserGear, faGavel, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import CustomHeader from "../../components/custom-header";
import ImagesUploader from "../../components/ui/imageUpload";
import LocationMap from "../../components/locationmap"
import SetLocation from "../../components/setlocation";
import { toast } from "react-toastify";
import CreatableSelect from 'react-select/creatable';

import Footer from "../../components/footer";
import BredCrumb from "../../components/ui/breadCrumb";
import axios from "axios";
import AppAdminHeader from "../../components/ui/appadmin/appadminheader";
import { fetchProtectedResource } from "../authApi";

const AddItem = () => {

    const navigate = useNavigate();

    const [userType, setUserType] = useState("Auction_manager");
    const [newLocation, setNewLocation] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState({});
    const [locationDetails, setLocationDetails] = useState([]);
    const [pickedLocation, setPickedLocation] = useState();

    useEffect(() => {
        axios.get('http://localhost:8082/is/v1/allLocations')
            .then(response => {
                setLocationDetails(response.data);
            })
            .catch(error => {
                console.error("Error fetching location details:", error);
            });
    }, []);

    const handleLocationChange = useCallback((option, actionMeta) => {
        if (!option) {
            setSelectedLocation({});
            setNewLocation(false);
            return;
        }

        const loc = locationDetails.find(location => location.id == option.value);

        if (loc) {
            console.log("Selected id", option.value);
            console.log("Selected Location:", loc);

            setSelectedLocation({
                id: loc.id,
                position: [loc.latitude, loc.longitude],
                name: loc.name,
                address: loc.address
            });
            setNewLocation(false);
        } else {
            // New location (created manually)
            setSelectedLocation({
                id: option.value,
                name: option.label
            });
            setNewLocation(true);
        }
    }, [locationDetails]);


    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        if (form.checkValidity() === false) {
            // addFlashMessage('error', 'Please fill all the required fields.');
            toast.error("Please fill all the required fields.")
            form.reportValidity();
            return;
        }
        
        const formData = {
            role: userType,
            first_name: form.firstName.value,
            last_name: form.lastName.value,
            username: form.employeeId.value,
            email: form.email.value,
            primary_phone: form.primaryPhone.value,
            secondary_phone: form.secondaryPhone.value,
            date_of_birth: "1992-05-02",
        }
        if (userType === "yard_manager") {
            if (newLocation) {
                formData.location = {
                    name: selectedLocation.name,
                    address: selectedLocation.address,
                    latitude: pickedLocation[0],
                    longitude: pickedLocation[1]
                }
            } else {
                formData.location = {id: selectedLocation.id};
            }
        }
        console.log("Form Data:", formData);
        const response = await fetchProtectedResource('http://localhost:8083/addUser', formData, 'POST');
        if (response && response.status === 200) {
            toast.success("User added successfully");
            navigate('/appadmin');
        } else {
            toast.error("Failed to add user. Please try again.");
        }
    }

    return (
        <>
            <CustomHeader />

            <AppAdminHeader />
            <BredCrumb page="Add a New User" breadCrumbs={[
                { title: "Home", link: "/appadmin" },
            ]} />
            <form className="flex flex-col items-center justify-center gap-5 px-4 form-style" onSubmit={handleSubmit}>
                <div className="max-w-4xl w-full m-0!">
                    <h1 className="text-3xl font-bold text-[#1e3a5f]">Add a New User</h1>
                </div>
                <div className="max-w-4xl w-full bg-white border border-gray-300 shadow-sm rounded p-6">
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon icon={faUserGear} size="xl" />
                        <h2 className="text-2xl font-semibold">User Type</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Select the type of user</p>
                    <div className="flex mt-4 gap-4 flex-wrap justify-around">
                        <button className={`border border-gray-300 rounded p-6 hover:shadow-sm transition-colors duration-300 ${userType === 'Auction_manager' ? "bg-[#1e3a5f] text-white" : "hover:bg-gray-200"}`} onClick={() => setUserType('Auction_manager')} type="button">
                            <FontAwesomeIcon icon={faGavel} size="2xl" />
                            <p className="mt-2 text-center">Auction Manager</p>
                        </button>
                        <button className={`border border-gray-300 rounded p-6 hover:shadow-sm transition-colors duration-300 ${userType === 'yard_manager' ? "bg-[#1e3a5f] text-white" : "hover:bg-gray-200"}`} onClick={() => setUserType('yard_manager')} type="button">
                            <FontAwesomeIcon icon={faWarehouse} size="2xl" />
                            <p className="mt-2 text-center">Inventory Manager</p>
                        </button>
                    </div>
                </div>
                <div className="max-w-4xl w-full bg-white border border-gray-300 shadow-sm rounded p-6">
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon icon={faCircleInfo} size="xl" />
                        <h2 className="text-2xl font-semibold">Personnel Details</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Enter the personnel details of the user
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 my-3">
                        <div className="flex-1">
                            <label>First Name *</label>
                            <input
                                type="text"
                                name="firstName"
                                // value={basicInfo.title}
                                // onChange={handleBasicInfoChange}
                                placeholder="Enter first name"
                                required
                                />
                        </div>
                        <div className="flex-1">
                            <label>Last Name *</label>
                            <input
                                type="text"
                                name="lastName"
                                // value={basicInfo.caseNumber}
                                // onChange={handleBasicInfoChange}
                                placeholder="Enter last name"
                                required
                                />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 my-3">
                        <div className="flex-1">
                            <label>Employee Id *</label>
                            <input
                                type="text"
                                name="employeeId"
                                // value={basicInfo.title}
                                // onChange={handleBasicInfoChange}
                                placeholder="Enter employee ID"
                                required
                                />
                        </div>
                        <div className="flex-1">
                            <label>E-mail *</label>
                            <input
                                type="email"
                                name="email"
                                // value={basicInfo.caseNumber}
                                // onChange={handleBasicInfoChange}
                                placeholder="Enter E-mail"
                                required
                                />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 my-3">
                        <div className="flex-1">
                            <label>Primary Phone Number *</label>
                            <input
                                type="text"
                                name="primaryPhone"
                                // value={basicInfo.title}
                                // onChange={handleBasicInfoChange}
                                placeholder="Enter primary phone number"
                                required
                                />
                        </div>
                        <div className="flex-1">
                            <label>Secondary Phone Number</label>
                            <input
                                type="text"
                                name="secondaryPhone"
                                // value={basicInfo.caseNumber}
                                // onChange={handleBasicInfoChange}
                                placeholder="Enter secondary phone number"
                                />
                        </div>
                    </div>
                </div>
                {userType === "yard_manager" && (
                <div className="max-w-4xl w-full bg-white border border-gray-300 shadow-sm rounded p-6">
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon icon={faWarehouse} size="xl" />
                        <h2 className="text-2xl font-semibold">Yard/Inventory Details</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Enter details of the yard/inventory
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 my-3">
                        <div className="flex-1 no-form">
                            <label>Name *</label>
                            <CreatableSelect
                                name="yard_name"
                                placeholder="Select from the list or type to create a new location"
                                options={locationDetails.map(loc => ({ value: loc.id, label: loc.name }))}
                                onChange={handleLocationChange}
                            />
                        </div>
                        <div className="flex-1">
                            <label>Address *</label>
                            <input
                                type="text"
                                name="address"
                                value={selectedLocation?.address || ""}
                                onChange={(e) => setSelectedLocation({ ...selectedLocation, address: e.target.value })}
                                placeholder={newLocation ? "Enter the new location address here" : "Select the name first, address will be auto-filled"}
                                required
                                readOnly={!newLocation}
                                />
                        </div>
                    </div>
                    <div className="flex flex-row md:flex-row gap-4 my-3">
                        {/* <div className="flex-1">
                            <ImagesUploader />
                        </div> */}
                        <div className="flex-1">
                            {newLocation ? (
                                <SetLocation selectedLocation={pickedLocation} setSelectedLocation={setPickedLocation} /> 
                            ) : (
                                <LocationMap itemDetail={selectedLocation} />
                            )}
                        </div>
                    </div>
                </div>
                )}

                <div className="max-w-4xl w-full flex justify-end gap-2">
                    <Link
                        to="/appadmin" 
                        className="bg-white text-[#1e3a5f] hover:bg-[#e0e0ee] rounded-lg py-2 px-4 flex items-center border border-gray-200 shadow-sm cursor-pointer">
                            Cancel
                    </Link>
                    {/* <button 
                        type="button"
                        className="bg-white text-[#1e3a5f] hover:bg-[#e0e0ee] rounded-lg py-2 px-4 flex items-center border border-gray-200 shadow-sm cursor-pointer">
                            Save as Draft
                    </button> */}
                    <button 
                        type="submit" 
                        className="bg-[#1e3a5f] text-white hover:bg-[#2d4a6b] rounded-lg py-2 px-4 flex items-center border border-gray-200 shadow-sm cursor-pointer"
                        >
                        Add new User
                    </button>
                </div>
            </form>
            <Footer />
        </>
    );
}

export default AddItem;