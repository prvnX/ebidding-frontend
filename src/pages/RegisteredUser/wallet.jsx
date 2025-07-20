import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import CustomHeader from '../../components/custom-header';
import NavBar from '../../components/navbar';
import Footer from '../../components/footer';

const Wallet = () => {
  const navigate = useNavigate();
  const [showIncreaseModal, setShowIncreaseModal] = useState(false);
  const [selectedLimit, setSelectedLimit] = useState(100000);
  
  // Sample data - replace with actual data from your API/store
  const walletData = {
    availableLimit: 65000,
    totalLimit: 100000,
    usedAmount: 35000,
    usedPercentage: 35
  };

  const recentTransactions = [
    {
      id: 1,
      type: 'Bank Transfer - HNB',
      date: '2024-07-11',
      amount: 50000.00,
      status: 'Completed',
      isCredit: true
    },
    {
      id: 2,
      type: 'Bid placed - Luxury Watch',
      date: '2024-07-10',
      amount: 25000.00,
      status: 'Pending',
      isCredit: false
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount).replace('LKR', 'LKR');
  };

  const handleIncreaseLimit = () => {
    // Open the increase limit modal
    setShowIncreaseModal(true);
  };

  const handleCloseModal = () => {
    setShowIncreaseModal(false);
  };

  const handleLimitChange = (value) => {
    setSelectedLimit(value);
  };

  const handleProceedToPay = () => {
    // Navigate to payment page with the selected amount
    const amountToPay = calculateFee(selectedLimit);
    navigate('/payment', { 
      state: { 
        amount: amountToPay,
        newLimit: selectedLimit 
      } 
    });
    // Close modal
    setShowIncreaseModal(false);
  };

  const calculateFee = (limit) => {
    return limit * 0.1; // 10% fee
  };

  const handleViewAllTransactions = () => {
    // Handle view all transactions functionality
    console.log('View all transactions clicked');
  };

  return (
    <>
      <CustomHeader />
      <NavBar />
      

      
      <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Bidding Limit Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faCheckCircle} className="text-white text-sm" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Bidding Limit</h2>
              <p className="text-gray-500 text-sm">Your current bidding power</p>
            </div>
          </div>

          {/* Limit Information */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            {/* Available Limit */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Available Limit</h3>
              <p className="text-xl font-bold text-gray-900">
                {formatCurrency(walletData.availableLimit)}
              </p>
            </div>

            {/* Total Limit */}
            <div className="text-right">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Limit</h3>
              <p className="text-xl font-bold text-gray-400">
                {formatCurrency(walletData.totalLimit)}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-600">
                {formatCurrency(walletData.usedAmount)} used
              </span>
              <span className="text-sm text-gray-600">
                {walletData.usedPercentage}% of your limit used
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${walletData.usedPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Increase Limit Button */}
          <button
            onClick={handleIncreaseLimit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-colors duration-200"
          >
            Increase Limit
          </button>
        </div>

        {/* Recent Transactions Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
          <button
            onClick={handleViewAllTransactions}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
          >
            View All
          </button>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              {/* Left Side - Icon and Details */}
              <div className="flex items-center gap-3">
                {/* Status Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  transaction.status === 'Completed' 
                    ? 'bg-green-100' 
                    : 'bg-yellow-100'
                }`}>
                  <FontAwesomeIcon 
                    icon={transaction.status === 'Completed' ? faCheckCircle : faClock}
                    className={`text-lg ${
                      transaction.status === 'Completed' 
                        ? 'text-green-600' 
                        : 'text-yellow-600'
                    }`}
                  />
                </div>

                {/* Transaction Details */}
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">
                    {transaction.type}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {transaction.date}
                  </p>
                </div>
              </div>

              {/* Right Side - Amount and Status */}
              <div className="text-right">
                <p className={`font-semibold text-lg ${
                  transaction.isCredit ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {transaction.isCredit ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
                <span className={`text-sm font-medium ${
                  transaction.status === 'Completed'
                    ? 'text-green-600'
                    : 'text-yellow-600'
                }`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no transactions) */}
        {recentTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faClock} className="text-gray-400 text-xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
            <p className="text-gray-500">Your recent transactions will appear here</p>
          </div>
        )}
        </div>

        {/* Increase Limit Modal */}
        {showIncreaseModal && (
          <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full mx-4 p-6 relative shadow-2xl">
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Increase Bidding Limit
                </h3>
                <p className="text-sm text-gray-600">
                  Select your desired new bidding limit. The amount payable is 10% of your new total limit.
                </p>
              </div>

              {/* Limit Slider */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>LKR 100,000</span>
                  <span>LKR 2,000,000</span>
                </div>
                
                <div className="relative">
                  <input
                    type="range"
                    min="100000"
                    max="2000000"
                    step="50000"
                    value={selectedLimit}
                    onChange={(e) => handleLimitChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((selectedLimit - 100000) / (2000000 - 100000)) * 100}%, #e5e7eb ${((selectedLimit - 100000) / (2000000 - 100000)) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                </div>
              </div>

              {/* Quick Select Buttons */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Select:</h4>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <button
                    onClick={() => handleLimitChange(100000)}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border transition-colors ${
                      selectedLimit === 100000
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    LKR 100,000
                  </button>
                  <button
                    onClick={() => handleLimitChange(200000)}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border transition-colors ${
                      selectedLimit === 200000
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    LKR 200,000
                  </button>
                  <button
                    onClick={() => handleLimitChange(500000)}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border transition-colors ${
                      selectedLimit === 500000
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    LKR 500,000
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleLimitChange(1000000)}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border transition-colors ${
                      selectedLimit === 1000000
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    LKR 1,000,000
                  </button>
                  <button
                    onClick={() => handleLimitChange(2000000)}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border transition-colors ${
                      selectedLimit === 2000000
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    LKR 2,000,000
                  </button>
                </div>
              </div>

              {/* New Limit Display */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-600">New Bidding Limit</span>
                  <span className="text-lg font-bold text-gray-800">
                    {formatCurrency(selectedLimit)}
                  </span>
                </div>
              </div>

              {/* Fee Display */}
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Amount Payable (10% Fee)</span>
                  <span className="text-lg font-bold text-gray-800">
                    {formatCurrency(calculateFee(selectedLimit))}
                  </span>
                </div>
              </div>

              {/* Proceed Button */}
              <button
                onClick={handleProceedToPay}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Wallet;
