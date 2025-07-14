import { useCallback, useEffect, useState } from 'react';
import { Upload } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faStar, faXmark } from '@fortawesome/free-solid-svg-icons'; // Import the X icon for removal
import { addFlashMessage } from '../../flashMessageCenter';

const ImageUploadComponent = ({images, setImages, coverImage, setCoverImage}) => {

  const [coverImageBlob, setCoverImageBlob] = useState(null);
  const [imagesBlob, setImagesBlob] = useState([]);

  useEffect(() => {
    console.log("Cover image", coverImage);

    if (!coverImage) {
      setCoverImageBlob(null);
      return;
    }

    const blob = URL.createObjectURL(coverImage);
    setCoverImageBlob(blob);

    return () => URL.revokeObjectURL(blob); // cleanup
  }, [coverImage]);

  useEffect(() => {
    console.log("Images", images);
    const blobs = images.map(file => URL.createObjectURL(file));
    setImagesBlob(blobs);

    return () => {
      blobs.forEach(url => URL.revokeObjectURL(url)); // cleanup
    };
  }, [images]);

  
  useEffect(() => {
    console.log("ImagesBlob", imagesBlob);
  }, [imagesBlob]);

  
  useEffect(() => {
    console.log("CoverImageBlob", coverImageBlob);
  }, [coverImageBlob]);


  const handleSetImages = useCallback((newFiles) => {
    if (!coverImage) {
      console.log("CoverImage flase")
      setCoverImage(newFiles.shift());
    }
    const totalImages = [...images, ...newFiles];
    if (totalImages.length > 9) {
      addFlashMessage('error', 'You can only upload up to 10 images.');
    }
    setImages(totalImages.slice(0, 9));
  }, [images, coverImage]);

  // Handles image selection from the file input
  const handleImageUpload = useCallback((event) => {
    const files = Array.from(event.target.files);
    handleSetImages(files);
  });

  // Handles image removal from the preview
  const removeImage = useCallback((indexToRemove) => {
    setImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
  });

  const removeCoverImage = useCallback(() => {
    const i = [...images];
    setCoverImage(i.shift());
    setImages(i);
  }, [images])

  // Handles drag and drop functionality
  const handleDragOver = useCallback((event) => {
    event.preventDefault(); // Prevent default to allow drop
  });

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleSetImages(files);
  });

  const swithCover = useCallback((index) => {
      const newCover = images[index];
      setImages((prev) => {
        const updated = [...prev];
        updated.splice(index, 1);
        updated.splice(index, 0, coverImage);
        return updated;
      });
      setCoverImage(newCover);
  }, [images, coverImage]);

  const [previewImage, setPreviewImage] = useState(false);

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

      {coverImageBlob && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px]">
          <div className="relative col-span-2 row-span-2">
              <img
                src={coverImageBlob || "/placeholder.svg"}
                alt={`Cover Image`}
                className="w-full h-full object-cover rounded-lg border-3 border-[#ring-3 ring-[#1e3a5f]"
                onClick={() => setPreviewImage(coverImageBlob || "/placeholder.svg")}
              />
              <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                <p className=' bg-green-100 px-2 rounded-md'>Cover Image</p>
                <div className="bg-white/80 hover:bg-white w-8 h-8 rounded-md flex items-center justify-center shadow-md text-red-500">
                  <button
                      type="button"
                      onClick={removeCoverImage}
                  >
                      <FontAwesomeIcon icon={faXmark} size='xl' />
                  </button>
                </div>
              </div>
            </div>
          {imagesBlob.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image || "/placeholder.svg"}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover rounded-lg border"
                onClick={() => setPreviewImage(image || "/placeholder.svg")}
              />
              <div className="absolute -top-2 right-1 flex flex-row gap-1">
                <div className='bg-gray-100 hover:bg-white w-5 h-5 border border-gray-500 rounded-md flex items-center justify-center shadow-md text-yellow-500'>
                  <button
                      type="button"
                      onClick={() => swithCover(index)}
                      className='flex items-center justify-center'
                  >
                      <FontAwesomeIcon icon={faStar} size='xs' />
                  </button>
                </div>
                <div className='bg-gray-100 hover:bg-white w-5 h-5 border border-gray-500 rounded-md flex items-center justify-center shadow-md text-red-500'>
                  <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className='flex items-center justify-center'
                  >
                      <FontAwesomeIcon icon={faXmark} size='md' />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {
        previewImage ? (
          <div 
            className="fixed inset-0 bg-gray-800/50 flex items-center justify-center z-1000 p-5"
            onClick={() => setPreviewImage(false)}
          >
            <div className="relative h-full">
              <img src={previewImage} alt="Preview" className="max-w-full max-h-full" />
              
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent closing overlay when clicking button
                  setPreviewImage(false);
                }}
                className="absolute top-2 right-2 bg-gray-100 hover:bg-white w-8 h-8 border border-red-500 rounded-md flex items-center justify-center shadow-md text-red-500"
              >
                <FontAwesomeIcon icon={faXmark} size="lg" />
              </button>
            </div>
          </div>
        ) : ''
      }
    </div>
  );
};

export default ImageUploadComponent;