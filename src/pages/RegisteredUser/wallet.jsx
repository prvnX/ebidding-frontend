import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faTimes, faArrowLeft, faUniversity, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import CustomHeader from '../../components/custom-header';
import NavBar from '../../components/navbar';
import Footer from '../../components/footer';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe } from '@stripe/react-stripe-js'; // Import Elements and useStripe
import useAuthStore from '../../components/useAuthStore';

// Initialize stripePromise outside the component
const stripePromise = loadStripe('pk_test_51SJ8x8HqZtjJD6uKJqHP6zLPnFYfK89FPoIeTz75LXQOxkHiTo78JtpNNCQqbHWuk75toh6KquAeEVC68dOxYDmM0046j493vO');

const Wallet = () => {
  const navigate = useNavigate();
  const stripe = useStripe(); // Use the useStripe hook to access the Stripe instance
  const [showIncreaseModal, setShowIncreaseModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBankTransferModal, setShowBankTransferModal] = useState(false);
  const [selectedLimit, setSelectedLimit] = useState(50000);
  const [customAmountInput, setCustomAmountInput] = useState('');
  const [customAmountError, setCustomAmountError] = useState('');
  const [modalJustOpened, setModalJustOpened] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [amountToPay, setAmountToPay] = useState(0);
  const [checkoutAmount, setCheckoutAmount] = useState(0); // full LKR amount user will pay/checkout
  const [proceedLoading, setProceedLoading] = useState(false);

  const { jwtToken } = useAuthStore.getState();
  console.log(jwtToken);

  // Sample data - replace with actual data from your API/store
  const walletData = {
    availableLimit: 65000,
    totalLimit: 100000,
    usedAmount: 35000,
    usedPercentage: 35,
  };

  const recentTransactions = [
    {
      id: 1,
      type: 'Bank Transfer - HNB',
      date: '2024-07-11',
      amount: 50000.00,
      status: 'Completed',
      isCredit: true,
    },
    {
      id: 2,
      type: 'Bid placed - Luxury Watch',
      date: '2024-07-10',
      amount: 25000.00,
      status: 'Pending',
      isCredit: false,
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
      .format(amount)
      .replace('LKR', 'LKR');
  };

  const handleIncreaseLimit = () => {
    setShowIncreaseModal(true);
    setCustomAmountInput('');
    setCustomAmountError('');
    setModalJustOpened(true);
  };

  const handleCloseModal = () => {
    setShowIncreaseModal(false);
    setModalJustOpened(false);
  };

  const handleLimitChange = (value) => {
    // snap and clamp to allowed range/step (50k steps)
    const v = Math.round(value / 50000) * 50000;
    const min = 50000;
    const max = 1000000;
    setSelectedLimit(Math.min(Math.max(v, min), max));
    // clear custom input when slider/quick-select is used
    setCustomAmountInput('');
    setCustomAmountError('');
    setModalJustOpened(false);
  };

  const createCheckoutSession = async (amountLKR) => {
    try {
      const { jwtToken } = useAuthStore.getState();
      if (!jwtToken) {
        alert('You are not logged in or your session expired. Please login and try again.');
        console.warn('createCheckoutSession aborted: missing jwtToken');
        return;
      }
      const amountInCents = Math.round(amountLKR);
      // include both representations so backend can pick the expected one
      const payload = {
        amount: amountInCents, // legacy: cents
        amountInCents, // explicit cents
        amountLKR: amountLKR, // explicit LKR unit
        currency: 'LKR',
      };
      console.log('createCheckoutSession -> sending payload', payload);
      const response = await fetch('http://localhost:8083/api/payment/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(payload),
      });
      console.log('createCheckoutSession -> response status', response.status, response.statusText);
      // log response headers (helpful to see content-type)
      try {
        const headers = {};
        response.headers.forEach((v, k) => headers[k] = v);
        console.log('createCheckoutSession -> response headers', headers);
      } catch (hErr) {
        console.warn('Could not read response headers', hErr);
      }
      if (!response.ok) {
        // If 403, try a safe one-time retry: send amount as LKR (not cents) and include currency
        if (response.status === 403) {
          console.warn('createCheckoutSession -> received 403, attempting alternate payload (LKR units)');
          try {
            const altPayload = {
              // alt attempt: send explicit LKR field plus cents to be safe
              amount: amountInCents,
              amountInCents,
              amountLKR: amountLKR,
              currency: 'LKR',
            };
            const altRes = await fetch('http://localhost:8083/api/payment/create-checkout-session', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
              },
              body: JSON.stringify(altPayload),
            });
            console.log('createCheckoutSession -> alt response status', altRes.status, altRes.statusText);
            try {
              const altHeaders = {};
              altRes.headers.forEach((v, k) => altHeaders[k] = v);
              console.log('createCheckoutSession -> alt response headers', altHeaders);
            } catch (_) {}
            if (altRes.ok) {
              const sessionAlt = await altRes.json();
              console.log('createCheckoutSession -> alt session', sessionAlt);
              if (sessionAlt.url) {
                window.location.href = sessionAlt.url;
                return;
              }
            } else {
              // parse alt response body for diagnostics
              let altErr = `Alt request returned ${altRes.status} ${altRes.statusText}`;
              try {
                const ct = altRes.headers.get('content-type') || '';
                if (ct.includes('application/json')) {
                  const b = await altRes.json();
                  altErr = b.message || JSON.stringify(b) || altErr;
                } else {
                  const t = await altRes.text();
                  if (t) altErr = t;
                }
              } catch (e) {
                console.error('Failed to parse alt response body', e);
              }
              console.error('createCheckoutSession -> alt attempt failed:', altErr);
            }
          } catch (altErr) {
            console.error('createCheckoutSession -> alt request error', altErr);
          }
        }

        // try to parse server error body (prefer JSON, then text)
        let errText = `Server returned ${response.status} ${response.statusText}`;
        try {
          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const body = await response.json();
            console.error('createCheckoutSession -> error body (json)', body);
            errText = body.message || JSON.stringify(body) || errText;
          } else {
            const txt = await response.text();
            console.error('createCheckoutSession -> error body (text)', txt);
            if (txt) errText = txt;
          }
        } catch (e) {
          console.error('createCheckoutSession -> failed to parse error body', e);
        }
        throw new Error(errText);
      }
      const session = await response.json();
      console.log('createCheckoutSession -> session', session);
      if (session.url) window.location.href = session.url;
    } catch (err) {
      console.error('Auto checkout failed', err);
      // Surface the server error to the user (no bank-transfer fallback)
      alert('Card checkout failed: ' + (err && err.message ? err.message : 'Unknown error'));
    }
  };

  const handleQuickSelect = (value) => {
    // set the selected limit (snap/clamp) and clear custom input.
    // Do NOT start checkout here — user will click "Proceed to Pay" to continue.
    const v = Math.round(value / 50000) * 50000;
    const min = 50000;
    const max = 1000000;
    const amount = Math.min(Math.max(v, min), max);
    setSelectedLimit(amount);
    setCustomAmountInput('');
    setCustomAmountError('');
    setModalJustOpened(false);
  };

  const handleCustomAmountChange = (e) => {
    setModalJustOpened(false);
    // allow the user to type any desired amount (no auto-fill). Only validate range and show error.
    const MIN = 10000; // allow custom amounts from 10,000
    const MAX = 1000000;
    const raw = e.target.value;
    // allow empty string (user clearing field)
    if (raw === '') {
      setCustomAmountInput('');
      setCustomAmountError('');
      return;
    }
    // keep only digits and optional decimal point
    const cleaned = raw.replace(/[^0-9.]/g, '');
    setCustomAmountInput(cleaned);

    const parsed = parseFloat(cleaned);
    if (isNaN(parsed) || !isFinite(parsed)) {
      setCustomAmountError('Please enter a valid number');
      return;
    }
    const rounded = Math.round(parsed);
    if (rounded < MIN || rounded > MAX) {
      setCustomAmountError(`Amount must be between LKR ${MIN.toLocaleString()} and LKR ${MAX.toLocaleString()}`);
    } else {
      setCustomAmountError('');
    }
  };

  const handleProceedToPay = async () => {
    const MIN = 10000; // allow proceeding with custom amounts from 10,000
    const MAX = 1000000;
    // choose amount: prefer custom input if provided
    let amountToUse = selectedLimit;
    if (customAmountInput !== '') {
      const parsed = Math.round(parseFloat(customAmountInput) || 0);
      if (isNaN(parsed) || parsed < MIN || parsed > MAX) {
        setCustomAmountError(`Please enter an amount between LKR ${MIN.toLocaleString()} and LKR ${MAX.toLocaleString()}`);
        return;
      }
      amountToUse = parsed;
    }
    setModalJustOpened(false);
    setProceedLoading(true);
    try {
      // set local state for UI and then start checkout
      setAmountToPay(calculateFee(amountToUse));
      setCheckoutAmount(amountToUse);
      // close increase modal immediately
      setShowIncreaseModal(false);
      // start card checkout directly
      await createCheckoutSession(amountToUse);
    } finally {
      setProceedLoading(false);
    }
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleCompletePayment = async () => {
    if (selectedPaymentMethod === 'bank') {
      setShowPaymentModal(false);
      setShowBankTransferModal(true);
    } else {
      try {
        // Use checkoutAmount (full LKR) and convert to cents
        const amountInCents = Math.round(checkoutAmount);

        const { jwtToken } = useAuthStore.getState();

        const response = await fetch('http://localhost:8083/api/payment/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({ amount: amountInCents }),
        });

        if (!response.ok) {
          throw new Error('Failed to create checkout session');
        }

        const session = await response.json();
        console.log('Session response:', session);

        // Redirect to Stripe Checkout using useStripe
        if (session.url) {
          window.location.href = session.url; // or window.location.assign(session.url)
        } else {
          console.error('No Checkout URL returned');
        }

      } catch (err) {
        console.error('Payment failed:', err);
        // Surface error to the user (no fallback)
        alert('Card checkout failed: ' + (err && err.message ? err.message : 'Unknown error'));
      }
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
    return limit; // 10% fee
  };

  const handleViewAllTransactions = () => {
    console.log('View all transactions clicked');
  };

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  // display value: show LKR 0 when modal just opened and custom input empty; otherwise prefer custom input when provided
  const displayAmount = (modalJustOpened && customAmountInput === '')
    ? 0
    : (customAmountInput !== '' ? Math.round(parseFloat(customAmountInput) || 0) : selectedLimit);

  // JSX remains unchanged
  return (
    <>
      <CustomHeader />
      <NavBar />
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
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">My Wallet</h1>
            <p className="text-gray-600">Manage your funds and track all transactions</p>
          </div>
          <div className="bg-gradient-to-r bg-[#1e3a5f] to-blue-700 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Wallet Balance</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-blue-100 text-sm mb-1">Current Balance</p>
                  <p className="text-3xl font-bold">{formatCurrency(walletData.availableLimit)}</p>
                  <p className="text-blue-200 text-sm">Available for bidding</p>
                </div>
                 
              </div>
              
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.status === 'Completed' ? 'bg-green-100' : 'bg-orange-100'
                          }`}
                        >
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
                        <p
                          className={`font-semibold ${
                            transaction.isCredit ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {transaction.isCredit ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            transaction.status === 'Completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}
                        >
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
        {showIncreaseModal && (
          <div className="fixed inset-0 bg-black/70 bg-opacity-500 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full mx-4 p-6 relative shadow-2xl">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Increase Wallet Limit</h3>
                
              </div>
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>LKR 50,000</span>
                  <span>LKR 1,000,000</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="50000"
                    max="1000000"
                    step="50000"
                    value={selectedLimit}
                    onChange={(e) => handleLimitChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #2563eb 0%, #2563eb ${
                        ((selectedLimit - 100000) / (2000000 - 100000)) * 100
                      }%, #e5e7eb ${((selectedLimit - 100000) / (2000000 - 100000)) * 100}%, #e5e7eb 100%)`,
                    }}
                  />
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Select:</h4>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <button
                    onClick={() => handleQuickSelect(50000)}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border transition-colors ${
                      selectedLimit === 50000
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    LKR 50,000
                  </button>
                  <button
                    onClick={() => handleQuickSelect(100000)}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border transition-colors ${
                      selectedLimit === 100000
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    LKR 100,000
                  </button>
                  <button
                    onClick={() => handleQuickSelect(200000)}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border transition-colors ${
                      selectedLimit === 200000
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    LKR 200,000
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleQuickSelect(400000)}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border transition-colors ${
                      selectedLimit === 400000
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    LKR 400,000
                  </button>
                  <button
                    onClick={() => handleQuickSelect(600000)}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border transition-colors ${
                      selectedLimit === 600000
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    LKR 600,000
                  </button>
                  <button
                    onClick={() => handleQuickSelect(800000)}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border transition-colors ${
                      selectedLimit === 800000
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    LKR 800,000
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Or enter custom amount</label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">LKR</span>
                  <input
                    type="number"
                    step={1}
                    placeholder={modalJustOpened && customAmountInput === '' ? '0' : undefined}
                    value={modalJustOpened && customAmountInput === '' ? '' : (customAmountInput !== '' ? customAmountInput : selectedLimit)}
                    onChange={handleCustomAmountChange}
                    className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] ${customAmountError ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </div>
                {customAmountError && (
                  <p className="text-xs text-red-600 mt-1">{customAmountError}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">Enter any amount you want (LKR). The slider still shows quick ranges.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-600">New wallet blance</span>
                  <span className="text-lg font-bold text-gray-800">{formatCurrency(displayAmount)}</span>
                </div>
              </div>
               
              <button
                onClick={handleProceedToPay}
                disabled={proceedLoading}
                className={`w-full ${proceedLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200`}
              >
                {proceedLoading ? 'Processing...' : 'Proceed to Pay'}
              </button>
            </div>
          </div>
        )}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full mx-4 p-6 relative shadow-2xl">
              <button
                onClick={handleClosePaymentModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Complete Payment</h3>
                <p className="text-sm text-gray-600">Choose your preferred payment method to complete the transaction.</p>
              </div>
              <div className="text-center py-6 bg-blue-50 rounded-xl mb-6">
                <p className="text-gray-600 text-sm mb-1">Amount to Pay</p>
                <h2 className="text-3xl font-bold text-blue-600">{formatCurrency(checkoutAmount)}</h2>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-4">Payment Method</h4>
                <div className="space-y-3">
                  <div
                    onClick={() => handlePaymentMethodSelect('card')}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPaymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
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
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedPaymentMethod === 'card' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                      {selectedPaymentMethod === 'card' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCompletePayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                Continue with Card Payment
              </button>
            </div>
          </div>
        )}
        {showBankTransferModal && (
          <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full mx-4 p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={handleCloseBankTransferModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Bank Transfer Details</h3>
                <p className="text-sm text-gray-600">
                  Transfer the amount to the following bank account and upload your deposit slip.
                </p>
              </div>
              <div className="text-center py-4 bg-blue-50 rounded-xl mb-6">
                <p className="text-gray-600 text-sm mb-1">Amount to Pay</p>
                <h2 className="text-2xl font-bold text-blue-600">{formatCurrency(checkoutAmount)}</h2>
              </div>
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
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Upload Deposit Slip</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <div className="mb-3">
                    <FontAwesomeIcon icon={faUniversity} className="text-gray-400 text-3xl" />
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Click to upload or drag and drop your deposit slip</p>
                  <input type="file" accept="image/*,.pdf" className="hidden" id="depositSlip" />
                  <label
                    htmlFor="depositSlip"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    Choose File
                  </label>
                </div>
              </div>
              <button
                onClick={() => {
                  console.log('Deposit slip submitted');
                  setShowBankTransferModal(false);
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

// Wrap Wallet component with Elements to provide Stripe context
const WalletWithStripe = (props) => (
  <Elements stripe={stripePromise}>
    <Wallet {...props} />
  </Elements>
);

export default WalletWithStripe;