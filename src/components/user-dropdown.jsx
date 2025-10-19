import { useState, useEffect, useRef } from "react";
import { User, History, Wallet, LogOut, Gavel } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { fetchProtectedResource } from "../pages/authApi";


export function UserDropdown() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [name, setName] = useState("Loading...");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetchProtectedResource(
        `http://localhost:8084/us/v1/getSelfDetails`,
        null,
        "GET"
      );

      const data = response.data;
      setName(`${data.firstName} ${data.lastName}`);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // ✅ Correct dependency
  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Update name on custom profileUpdated event
  useEffect(() => {
    const onProfileUpdated = (e) => {
      try {
        const d = e?.detail || {};
        const f = d.firstName || d.first_name || "";
        const l = d.lastName || d.last_name || "";

        if (f || l) setName((f + " " + l).trim());
      } catch (err) {
        console.error("Error applying profileUpdated event:", err);
      }
    };

    window.addEventListener("profileUpdated", onProfileUpdated);
    return () => window.removeEventListener("profileUpdated", onProfileUpdated);
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center text-white text-sm px-3 py-2 rounded hover:bg-white/10 transition"
      >
        <User className="h-5 w-5 mr-2" />
        {name}
      </button>

      {open && (
        <div className="absolute right-0 mt-7 w-56 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <span
              className="block text-gray-700 font-semibold text-base"
              style={{ color: "#7e8ba3" }}
            >
              {name}
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
              onClick={() => navigate("/wallet")}
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
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2 text-red-500" /> Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
}