import { useState, useEffect, useRef } from "react";
import { User, History, Wallet, LogOut, Gavel } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { fetchProtectedResource } from "../pages/authApi";


export function UserDropdown() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
        const [name, setName] = useState('Loading...');
        const fetchData = async () => {
          if(!localStorage.getItem("UserData") || JSON.parse(localStorage.getItem("UserData")).username !== localStorage.getItem("username")){
          try {
              const {data} = await fetchProtectedResource(
                      `http://localhost:8083/us/v1/getSelfDetails`,
                        null,
                        'GET'
              );
              localStorage.setItem("UserData", JSON.stringify(data));
              setName(data.firstName + " " + data.lastName);
              // keep username in localStorage for consistency
              if (data.username) localStorage.setItem('username', data.username);
          } catch (error) {
              console.error('Error fetching user info:', error);
          }
        } else {
          const userData = await JSON.parse(localStorage.getItem("UserData"));
          setName(userData.firstName + " " + userData.lastName);
        }
      };

      useEffect(() => {
        fetchData();
      }, [UserDropdown]);

      // Listen for profile updates so header can update immediately
      useEffect(() => {
        const onProfileUpdated = (e) => {
          try {
            const d = e && e.detail ? e.detail : {};
            const f = d.firstName || d.first_name || '';
            const l = d.lastName || d.last_name || '';
            const u = d.username || d.user_name || d.userName || null;
            if (f || l) setName((f + ' ' + l).trim());
            // update cached UserData in localStorage
            const stored = JSON.parse(localStorage.getItem('UserData') || '{}');
            if (f) stored.firstName = f;
            if (l) stored.lastName = l;
            if (u) stored.username = u;
            localStorage.setItem('UserData', JSON.stringify(stored));
            if (u) localStorage.setItem('username', u);
          } catch (err) {
            console.error('Error applying profileUpdated event:', err);
          }
        };

        window.addEventListener('profileUpdated', onProfileUpdated);
        return () => window.removeEventListener('profileUpdated', onProfileUpdated);
      }, []);

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
              onClick={() => {
                navigate("/wallet");
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
            {/* <div
              className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => navigate("/auctionHistory")}
            >
              <History className="h-4 w-4 mr-2 text-green-500" /> Auction
              History
            </div> */}
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
