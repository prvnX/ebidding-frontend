import { useState, useEffect, useRef } from "react";
import { User, History, Wallet, LogOut, Gavel } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const userName = "John Doe"; // Replace with actual user name from props/context if available

export function UserDropdown() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Import useNavigate from react-router-dom
  const navigate = useNavigate();

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center text-white text-sm px-3 py-2 rounded hover:bg-white/10 transition"
      >
        <User className="h-5 w-5 mr-2" />
        {userName}
      </button>
      {open && (
        <div className="absolute right-0 mt-7 w-56 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <span
              className="block text-gray-700 font-semibold text-base"
              style={{ color: "#7e8ba3" }}
            >
              {userName}
            </span>
          </div>
          <div className="py-1">
            <div
              className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => navigate("/profile")}
            >
              <User className="h-4 w-4 mr-2 text-blue-500" /> Profile
            </div>
            <div
              className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                /* Navigate to wallet */
              }}
            >
              <Wallet className="h-4 w-4 mr-2 text-yellow-500" /> Wallet
            </div>
            <div
              className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => navigate("/myBiddingHistory")}
            >
              <Gavel className="h-4 w-4 mr-2 text-purple-500" /> My Bidding
              History
            </div>
            <div
              className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => navigate("/auctionHistory")}
            >
              <History className="h-4 w-4 mr-2 text-green-500" /> Auction
              History
            </div>
            <hr className="my-2 border-gray-200" />
            <div
              className="flex items-center px-4 py-2 text-sm text-red-600 cursor-pointer hover:bg-red-50"
              onClick={() => {
                /* Handle logout */
              }}
            >
              <LogOut className="h-4 w-4 mr-2 text-red-500" /> Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
