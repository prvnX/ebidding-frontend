import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUniversity, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import CustomHeader from '../../components/custom-header';
import NavBar from '../../components/navbar';
import Footer from '../../components/footer';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('bank');
  
  // Get the amount from navigation state or use default
  const amountToPay = location.state?.amount || 15000;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount).replace('LKR', 'LKR');
  };

  const handleBackClick = () => {
    navigate('/wallet');
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleCompletePayment = () => {
    if (selectedPaymentMethod === 'bank') {
      // Navigate to bank transfer page with amount
      navigate('/bankTransfer', { 
        state: { 
          amount: amountToPay 
        } 
      });
    } else {
      // Handle card payment
      console.log('Payment completed with method:', selectedPaymentMethod);
      // Navigate back to wallet or show success message
      navigate('/wallet');
    }
  };

  return (
    <> 
    <CustomHeader />
    <NavBar />
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-gray-600 text-lg" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Complete Payment</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Amount to Pay */}
        <div className="text-center py-8 bg-white rounded-2xl shadow-lg">
          <p className="text-gray-500 text-base mb-2">Amount to Pay</p>
          <h2 className="text-4xl font-bold text-blue-600">
            {formatCurrency(amountToPay)}
          </h2>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select a Payment Method</h3>
          
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
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faUniversity} className="text-blue-600 text-lg" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Bank Transfer</h4>
                  <p className="text-sm text-gray-500">Pay via a direct bank deposit.</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedPaymentMethod === 'bank'
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {selectedPaymentMethod === 'bank' && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
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
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faCreditCard} className="text-purple-600 text-lg" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Card Payment via Payhere</h4>
                  <p className="text-sm text-gray-500">Visa, MasterCard, Amex</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedPaymentMethod === 'card'
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {selectedPaymentMethod === 'card' && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleCompletePayment}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-colors duration-200 shadow-lg"
            >
              Continue with {selectedPaymentMethod === 'bank' ? 'Bank Transfer' : 'Card Payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
     <Footer />
    </>
  );
};

export default Payment;
