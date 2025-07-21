import { useState } from "react";
import { UploadCloud } from "lucide-react"; // or use your own SVG

const ImageUploader = () => {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col gap-2">
        <div className="w-full aspect-[3/2] mt-1 border-2 border-dashed border-gray-300 rounded shadow-sm flex items-center justify-center cursor-pointer relative overflow-hidden">
        <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleChange}
        />
        {image ? (
            <img
            src={image}
            alt="Uploaded"
            className="object-cover w-full h-full"
            />
        ) : (
            <div className="flex flex-col items-center text-gray-500">
            <UploadCloud size={32} />
            <p className="text-sm">Drag & drop image here, or click to select</p>
            </div>
        )}
        </div>
        <button
            type="button"
            onClick={() => setImage(null)}
            className="flex-1 border bg-[#1e3a5f] text-white rounded-md p-1.5 cursor-pointer"
        >
            Remove Image
        </button>
    </div>
  );
};

export default ImageUploader;
