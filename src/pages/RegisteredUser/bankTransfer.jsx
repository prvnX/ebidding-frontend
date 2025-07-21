import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUpload, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomHeader from '../../components/custom-header';
import NavBar from '../../components/navbar';
import Footer from '../../components/footer';

const BankTransfer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [uploadedFile, setUploadedFile] = useState(null);
  
  // Get the amount from navigation state or use default
  const amountToPay = location.state?.amount || 15000;

  const handleBackClick = () => {
    navigate('/payment');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmitForVerification = () => {
    if (uploadedFile) {
      console.log('Submitting deposit slip for verification:', uploadedFile);
      // Handle submission logic here
      navigate('/wallet'); // Navigate back to wallet after submission
    } else {
      alert('Please upload a deposit slip before submitting.');
    }
  };

  return (
    <>
      <CustomHeader />
      <NavBar />
      <div className="min-h-screen bg-gray-50 pb-32">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackClick}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-gray-600 text-lg" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">Bank Transfer</h1>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          {/* Bank Account Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Deposit to the following account:
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Account Name:</span>
                <span className="text-gray-900 font-semibold text-right">
                  Sri Lanka Customs (Pvt) Ltd
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Account Number:</span>
                <span className="text-gray-900 font-semibold">0123-4567-8901</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Bank Name:</span>
                <span className="text-gray-900 font-semibold">Sampath Bank PLC</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Branch:</span>
                <span className="text-gray-900 font-semibold">Colombo Main Branch</span>
              </div>
            </div>

            {/* Reference Section */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-800 mb-2">Reference:</h4>
              <p className="text-sm text-gray-600">
                Please use your User ID or phone number as the payment reference.
              </p>
            </div>
          </div>

          {/* Upload Deposit Slip */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upload Your Deposit Slip
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Please upload a clear image of your deposit slip for verification.
            </p>

            {/* File Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <label htmlFor="fileUpload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <FontAwesomeIcon icon={faCloudUploadAlt} className="text-blue-600 text-xl" />
                  </div>
                  <h4 className="font-medium text-gray-700 mb-1">Choose a file...</h4>
                  {uploadedFile ? (
                    <p className="text-sm text-green-600 font-medium">
                      {uploadedFile.name}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">
                      JPG, PNG, or PDF up to 10MB
                    </p>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button - Fixed at Bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleSubmitForVerification}
              className={`w-full font-semibold py-4 px-6 rounded-2xl transition-colors duration-200 shadow-lg ${
                uploadedFile
                  ? 'bg-gray-700 hover:bg-gray-800 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!uploadedFile}
            >
              Submit for Verification
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BankTransfer;
