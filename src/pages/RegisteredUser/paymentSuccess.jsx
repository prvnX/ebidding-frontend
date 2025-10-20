import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CustomHeader from '../../components/custom-header';
import NavBar from '../../components/navbar';
import Footer from '../../components/footer';
import useAuthStore from '../../components/useAuthStore';

const PaymentSuccess = () => {

  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();

  const { jwtToken } = useAuthStore.getState();

  useEffect(() => {
    if (!sessionId) return; // no session id
    if (!jwtToken) return; // token not ready yet

    console.log(jwtToken);

    fetch(`http://localhost:8083/api/payment/confirm?session_id=${sessionId}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${jwtToken}`,
      },
    })
      .then(res => res.json())
      .then(data => console.log("Payment confirmed:", data))
      .catch(err => console.error("Error confirming payment:", err));
  }, [sessionId, jwtToken]);;

  const handleContinue = () => {
    navigate('/Bidder/wallet'); // Redirects to http://localhost:5173/wallet
  };

  return (
    <>
      <CustomHeader />
      <NavBar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-green-600 text-5xl mb-4"
            />
            <h1 className="text-2xl font-semibold text-green-600">Payment Successful</h1>
            <p className="text-gray-600 mt-2">Your payment has been processed successfully.</p>
          </div>
          <button
            onClick={handleContinue}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
          >
            Continue
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentSuccess;