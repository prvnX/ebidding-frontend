import React, { useState } from 'react';

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileClick = () => {
    // Redirect to profile page (replace with actual route)
    window.location.href = '/profile';
  };

  const handleLogoutClick = () => {
    // Handle logout logic (e.g., clear auth token, redirect to login)
    console.log('Logout clicked');
    window.location.href = '/login';
  };

  return (
    <div className="fixed top-0 left-0 h-full w-16 bg-gray-800 text-white flex flex-col items-center py-4">
      {/* Profile Icon */}
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="p-2 rounded-full hover:bg-gray-700 focus:outline-none"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute left-16 top-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10">
            <div className="py-1">
              <button
                onClick={handleProfileClick}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                Profile
              </button>
              <button
                onClick={handleLogoutClick}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;