import ImageUploader from "../../components/ui/imageUpload";

const AddItem = () => {
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-5xl w-full bg-white shadow-md rounded p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Add an Item to the Inventory</h2>
            <form className="flex">
                <div className="w-1/3 mr-4">
                    <label className="block text-sm font-medium">Upload Image</label>
                    <ImageUploader />
                    <p className="text-xs text-gray-500 mt-1">Max size: 2MB. Supported formats: JPG, PNG.</p>
                </div>
                <div className="form-style flex-1">

                    <div>
                        <label>Item Name</label>
                        <input
                            type="text"
                            name="itemName"
                            placeholder="Enter item name"
                            />
                    </div>

                    <div>
                        <label>Description</label>
                        <textarea
                            name="description"
                            placeholder="Enter item description"
                            rows="4"
                        ></textarea>
                    </div>

                    <div>
                        <label>Category</label>
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

                    <div>
                        <label>Starting Bid</label>
                        <input
                            type="number"
                            name="startingBid"
                            placeholder="Enter starting bid amount"
                            min="0"
                        />
                    </div>

                    <div>
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Enter item location"
                        />
                    </div>
                </div>
            </form>
        </div>
    </div>
    );
}

export default AddItem;