import { UploadCloud } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faFilePdf, faFileWord, faFileImage, faFile, faFileExcel, faPen, faEye, faCheck } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const getIcon = (fileName) => {
  const ext = fileName.split('.').pop().toLowerCase();
  if (ext === 'pdf') return <FontAwesomeIcon icon={faFilePdf} className="text-red-700" />;
  if (ext === 'doc' || ext === 'docx') return <FontAwesomeIcon icon={faFileWord} className="text-blue-900" />;
  if (ext === 'xls' || ext === 'xlsx') return <FontAwesomeIcon icon={faFileExcel} className="text-green-700" />;
  if (['jpg', 'jpeg', 'png'].includes(ext)) return <FontAwesomeIcon icon={faFileImage} className="text-yellow-600" />;
  return <FontAwesomeIcon icon={faFile} className="text-gray-700" />;
};

const DocumentUploader = ({documents, setDocuments}) => {

    const MAX_TOTAL_SIZE = 50 * 1024 * 1024;
    const [totalFileSize, setTotalFileSize] = useState(0);

    const handleChange = (e) => {
        const selectedFiles = Array.from(e.target.files).map(file => ({
            file,
            name: file.name,
            editing: false
        }));

        const updatedFiles = [...documents];
        let currentTotalSize = updatedFiles.reduce((sum, doc) => sum + doc.file.size, 0);

        for (let i = 0; i < selectedFiles.length; i++) {
            const fileSize = selectedFiles[i].file.size;

            if (currentTotalSize + fileSize <= MAX_TOTAL_SIZE) {
                updatedFiles.push(selectedFiles[i]);
                currentTotalSize += fileSize;
            } else {
                toast.warn(`Skipped "${selectedFiles[i].name}" — total size would exceed ${MAX_TOTAL_SIZE / (1024 * 1024)} MB.`);
            }
        }
        setDocuments(updatedFiles);
    };

    const handleClear = () => {
        setDocuments([]);
    };

    const doneRename = (index) =>
        setDocuments(prev =>
            prev.map((d, i) =>
            i === index ? { ...d, editing: false } : d
        )
    )

    const cancelRename = (index) => {
        setDocuments(prev => {
            const originalName = prev[index].file.name; // original file name from File object
            return prev.map((d, i) =>
            i === index ? { ...d, name: originalName, editing: false } : d
            );
        });
    }

    useEffect(() => {
        setTotalFileSize((documents.reduce((sum, doc) => sum + doc.file.size, 0) / (1024 * 1024)).toFixed(2));
    }, [documents])

    return (
        <div className="flex flex-col gap-2">
            <div className="w-full h-32 mt-1 border-2 border-dashed border-gray-300 rounded shadow-sm flex items-center justify-center cursor-pointer relative overflow-hidden">
                <input
                    type="file"
                    multiple
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleChange}
                />
                <div className="flex flex-col items-center text-gray-500">
                <UploadCloud size={32} />
                <p className="text-sm">Drag & drop documents here, or click to select</p>
            </div>
        </div>

        {documents.length > 0 && (
            <ul className="pl-2">
                {documents.map((doc, index) => (
                    <li key={index} className="text-sm flex items-center justify-start gap-2 my-2">
                    {/* ❌ Delete Button */}
                    <button
                        type="button"
                        onClick={() => setDocuments(prev => prev.filter((_, i) => i !== index))}
                        className="text-red-500 text-xs"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>

                    {/* 🖊️ Rename Button */}
                    <button
                        type="button"
                        onClick={() =>
                        setDocuments(prev =>
                            prev.map((d, i) => i === index ? { ...d, editing: true } : d)
                        )
                        }
                        className="text-yellow-500 text-xs"
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </button>

                    {/* 🔍 Preview/Download Button */}
                    <a
                        href={URL.createObjectURL(doc.file)}
                        download={!['pdf', 'jpg', 'jpeg', 'png'].includes(doc.name.split('.').pop().toLowerCase()) ? doc.name : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-xs"
                    >
                        <FontAwesomeIcon icon={faEye} />
                    </a>

                    <div className="border-l-1 border-gray-300 h-6" />
                    {/* File Name or Editable Input */}
                    <span className="ml-2 w-full">
                        {doc.editing ? (() => {
                            const dotIndex = doc.name.lastIndexOf('.');
                            const baseName = doc.name.slice(0, dotIndex);
                            const ext = doc.name.slice(dotIndex); // includes the dot, like ".pdf"

                            return (
                                <div className="flex items-center gap-1">
                                    <input
                                        type="text"
                                        value={baseName}
                                        onChange={(e) => {
                                        const newName = e.target.value + ext;
                                        setDocuments(prev =>
                                            prev.map((d, i) =>
                                            i === index ? { ...d, name: newName } : d
                                            )
                                        );
                                        }}
                                        autoFocus
                                        onBlur={() => doneRename(index)}
                                        className="border p-1 text-xs flex-1"
                                    />
                                    <span className="text-gray-500 mx-1">{ext}</span>

                                    {/* Done Button */}
                                    <button
                                        type="button"
                                        onClick={() => doneRename(index)}
                                        className="text-green-600 px-2 border-gray-200 shadow-sm cursor-pointer p-1 rounded-md"
                                    >
                                        Done
                                    </button>

                                    {/* Cancel Button */}
                                    <button
                                        type="button"
                                        onClick={() => cancelRename(index)}
                                        className="text-red-600 px-2 border-gray-200 shadow-sm cursor-pointer p-1 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            );
                        })() : (
                            <span className="flex items-center gap-1">
                                {getIcon(doc.name)} {doc.name} <span className="ml-3">{(doc.file.size / (1024 * 1024)).toFixed(2)} MB</span>
                            </span>
                        )}
                    </span>
                    </li>
                ))}
            </ul>
        )}

        {documents.length > 0 && (
            <>
                <span>
                    {totalFileSize} MB / {MAX_TOTAL_SIZE / (1024 * 1024)} MB
                </span>
                <button
                    type="button"
                    onClick={handleClear}
                    className="bg-white text-red-700 hover:bg-[#ffeeee] rounded-lg py-2 px-4 border border-gray-200 shadow-sm cursor-pointer w-50 mx-auto">
                    Remove All
                </button>
            </>
        )}
        </div>
    );
};

export default DocumentUploader;
