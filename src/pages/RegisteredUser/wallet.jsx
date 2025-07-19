import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons';

const Wallet = () => {
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
    // Handle increase limit functionality
    console.log('Increase limit clicked');
  };

  const handleViewAllTransactions = () => {
    // Handle view all transactions functionality
    console.log('View all transactions clicked');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Bidding Limit Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faCheckCircle} className="text-white text-sm" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Bidding Limit</h2>
            <p className="text-gray-500 text-sm">Your current bidding power</p>
          </div>
        </div>

        {/* Limit Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Available Limit */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Available Limit</h3>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(walletData.availableLimit)}
            </p>
          </div>

          {/* Total Limit */}
          <div className="text-left md:text-right">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Limit</h3>
            <p className="text-3xl font-bold text-gray-400">
              {formatCurrency(walletData.totalLimit)}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-600">
              {formatCurrency(walletData.usedAmount)} used
            </span>
            <span className="text-sm text-gray-600">
              {walletData.usedPercentage}% of limit used
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${walletData.usedPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Increase Limit Button */}
        <button
          onClick={handleIncreaseLimit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200"
        >
          Increase Limit
        </button>
      </div>

      {/* Recent Transactions Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
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
            <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              {/* Left Side - Icon and Details */}
              <div className="flex items-center gap-4">
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
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {transaction.type}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {transaction.date}
                  </p>
                </div>
              </div>

              {/* Right Side - Amount and Status */}
              <div className="text-right">
                <p className={`font-semibold text-lg mb-1 ${
                  transaction.isCredit ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {transaction.isCredit ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  transaction.status === 'Completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
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
    </div>
  );
};

export default Wallet;
