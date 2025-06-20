import { useState } from 'react';
import { Upload } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'; // Import the X icon for removal

const ImageUploadComponent = () => {
  const [images, setImages] = useState([]); // Stores image URLs or File objects

  // Handles image selection from the file input
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => URL.createObjectURL(file)); // Create URLs for preview
    setImages(prevImages => [...prevImages, ...newImages]);
  };

  // Handles image removal from the preview
  const removeImage = (indexToRemove) => {
    setImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
  };

  // Handles drag and drop functionality
  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default to allow drop
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...newImages]);
  };

  return (
    <div className="space-y-4">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <div className="text-lg font-medium text-gray-900 mb-2">Upload Images</div>
        <div className="text-sm text-gray-500 mb-4">Drag and drop images here, or click to select files</div>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="!hidden"
          id="image-upload"
        />
        <button
          type="button"
          className='border border-gray-300 px-3 py-1 rounded'
          onClick={() => document.getElementById("image-upload")?.click()}
        >
          Select Images
        </button>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image || "/placeholder.svg"}
                alt={`Upload ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border"
              />
              <div className="absolute top-2 right-2 bg-white/80 hover:bg-white w-8 h-8 rounded-md flex items-center justify-center shadow-md text-red-500">
                <button
                    type="button"
                    onClick={() => removeImage(index)}
                >
                    <FontAwesomeIcon icon={faXmark} size='xl' />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploadComponent;