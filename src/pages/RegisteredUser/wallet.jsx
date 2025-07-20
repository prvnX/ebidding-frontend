import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faTimes, faArrowLeft, faUniversity, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import CustomHeader from '../../components/custom-header';
import NavBar from '../../components/navbar';
import Footer from '../../components/footer';

const Wallet = () => {
  const navigate = useNavigate();
  const [showIncreaseModal, setShowIncreaseModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBankTransferModal, setShowBankTransferModal] = useState(false);
  const [selectedLimit, setSelectedLimit] = useState(100000);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('bank');
  const [amountToPay, setAmountToPay] = useState(0);
  
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
    // Calculate the amount to pay and show payment modal
    const paymentAmount = calculateFee(selectedLimit);
    setAmountToPay(paymentAmount);
    setShowIncreaseModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleCompletePayment = () => {
    if (selectedPaymentMethod === 'bank') {
      // Show bank transfer modal instead of navigating
      setShowPaymentModal(false);
      setShowBankTransferModal(true);
    } else {
      // Handle card payment
      console.log('Payment completed with method:', selectedPaymentMethod);
      // Navigate back to wallet or show success message
      setShowPaymentModal(false);
    }
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const handleCloseBankTransferModal = () => {
    setShowBankTransferModal(false);
  };

  const calculateFee = (limit) => {
    return limit * 0.1; // 10% fee
  };

  const handleViewAllTransactions = () => {
    // Handle view all transactions functionality
    console.log('View all transactions clicked');
  };

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <CustomHeader />
      <NavBar />
      
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto ml-0 px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackClick}
              className="p-2 hover:bg-blue-300 rounded-full transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-gray-600 text-lg" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Wallet</h1>
          </div>
        </div>
      </div>

      
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* My Wallet Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">My Wallet</h1>
            <p className="text-gray-600">Manage your funds and track all transactions</p>
          </div>

          {/* Wallet Balance Section - Blue Gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Wallet Balance</h2>
                 
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Available Balance */}
                <div>
                  <p className="text-blue-100 text-sm mb-1">Available Balance</p>
                  <p className="text-3xl font-bold">{formatCurrency(walletData.availableLimit)}</p>
                  <p className="text-blue-200 text-sm">Available for bidding</p>
                </div>

                {/* Total Limit */}
                <div className="text-right">
                  <p className="text-red-100 text-sm mb-1">Total Limit</p>
                  <p className="text-3xl font-bold">{formatCurrency(walletData.totalLimit)}</p>
                  <p className="text-blue-200 text-sm">LKR 35,000 allocated to active bids</p>
                </div>
              </div>

              {/* Usage Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-blue-100 mb-2">
                  <span>Usage: 35%</span>
                  <span>Remaining: 65%</span>
                </div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${walletData.usedPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Add Funds and Increase Limit Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleIncreaseLimit}
                  className="bg-white bg-opacity-20 text-blue-600 py-3 px-86 rounded-xl font-semibold hover:bg-opacity-30 transition-colors border border-white border-opacity-30"
                >
                  Increase Limit
                </button>
                
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Transaction History */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-0">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Transaction History</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search transactions..."
                        className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <select className="py-2 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All Transactions</option>
                      <option>Completed</option>
                      <option>Pending</option>
                    </select>
                  </div>
                </div>

                {/* Transaction Items */}
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.status === 'Completed' ? 'bg-green-100' : 'bg-orange-100'
                        }`}>
                          <FontAwesomeIcon 
                            icon={transaction.status === 'Completed' ? faCheckCircle : faClock}
                            className={`text-sm ${
                              transaction.status === 'Completed' ? 'text-green-600' : 'text-orange-600'
                            }`}
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{transaction.type}</h4>
                          <p className="text-sm text-gray-500">{transaction.date} - NOT COMMERCIAL</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.isCredit ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.isCredit ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          transaction.status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <button 
                    onClick={handleViewAllTransactions}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 mx-auto"
                  >
                    Load More Transactions
                    <span className="text-xs">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
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

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full mx-4 p-6 relative shadow-2xl">
              {/* Close Button */}
              <button
                onClick={handleClosePaymentModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Complete Payment
                </h3>
                <p className="text-sm text-gray-600">
                  Choose your preferred payment method to complete the transaction.
                </p>
              </div>

              {/* Amount to Pay */}
              <div className="text-center py-6 bg-blue-50 rounded-xl mb-6">
                <p className="text-gray-600 text-sm mb-1">Amount to Pay</p>
                <h2 className="text-3xl font-bold text-blue-600">
                  {formatCurrency(amountToPay)}
                </h2>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-4">Select Payment Method:</h4>
                <div className="space-y-3">
                  {/* Bank Transfer Option */}
                  <div
                    onClick={() => handlePaymentMethodSelect('bank')}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPaymentMethod === 'bank'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={faUniversity} className="text-blue-600 text-sm" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Bank Transfer</h4>
                        <p className="text-xs text-gray-500">Pay via direct bank deposit</p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedPaymentMethod === 'bank'
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedPaymentMethod === 'bank' && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>

                  {/* Card Payment Option */}
                  <div
                    onClick={() => handlePaymentMethodSelect('card')}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPaymentMethod === 'card'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={faCreditCard} className="text-purple-600 text-sm" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Card Payment</h4>
                        <p className="text-xs text-gray-500">Visa, MasterCard, Amex</p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedPaymentMethod === 'card'
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedPaymentMethod === 'card' && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <button
                onClick={handleCompletePayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                Continue with {selectedPaymentMethod === 'bank' ? 'Bank Transfer' : 'Card Payment'}
              </button>
            </div>
          </div>
        )}

        {/* Bank Transfer Modal */}
        {showBankTransferModal && (
          <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full mx-4 p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={handleCloseBankTransferModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Bank Transfer Details
                </h3>
                <p className="text-sm text-gray-600">
                  Transfer the amount to the following bank account and upload your deposit slip.
                </p>
              </div>

              {/* Amount to Pay */}
              <div className="text-center py-4 bg-blue-50 rounded-xl mb-6">
                <p className="text-gray-600 text-sm mb-1">Amount to Pay</p>
                <h2 className="text-2xl font-bold text-blue-600">
                  {formatCurrency(amountToPay)}
                </h2>
              </div>

              {/* Bank Account Details */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Bank Account Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank Name:</span>
                    <span className="font-medium">Hatton National Bank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Name:</span>
                    <span className="font-medium">Sri Lanka Customs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Number:</span>
                    <span className="font-medium">038-2-001-1234567</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Branch:</span>
                    <span className="font-medium">Colombo Main Branch</span>
                  </div>
                </div>
              </div>

              {/* Upload Section */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Upload Deposit Slip</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <div className="mb-3">
                    <FontAwesomeIcon icon={faUniversity} className="text-gray-400 text-3xl" />
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    Click to upload or drag and drop your deposit slip
                  </p>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    id="depositSlip"
                  />
                  <label
                    htmlFor="depositSlip"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    Choose File
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={() => {
                  // Handle deposit slip submission
                  console.log('Deposit slip submitted');
                  setShowBankTransferModal(false);
                  // You can add success message or navigation here
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                Submit Payment Proof
              </button>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </>
  );
};

export default Wallet;
