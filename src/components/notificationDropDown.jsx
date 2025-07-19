import React, { useState } from "react"
import { faBell,faClock,faCreditCard,faCheckCircle,faUser,faBullhorn,faGavel,faTag } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const notifications = [
  {
    id: 1,
    title: "Outbid Alert",
    message: "You've been outbid on Luxury Watch Collection by ₨5,000",
    time: "5 minutes ago",
    type: "bid",
    read: false,
    itemId: 1,
  },
  {
    id: 2,
    title: "Auction Ending Soon",
    message: "Electronics Bundle auction ends in 2 hours",
    time: "1 hour ago",
    type: "ending",
    read: false,
    itemId: 2,
  },
  {
    id: 3,
    title: "Payment Reminder",
    message: "Payment due for Designer Clothing Lot - 24 hours remaining",
    time: "2 hours ago",
    type: "payment",
    read: true,
    itemId: 4,
  },
  {
    id: 4,
    title: "New Auction Available",
    message: "Vehicle auction has started - Toyota Prius 2019",
    time: "3 hours ago",
    type: "new_auction",
    read: false,
    itemId: 3,
  },
    {
    id: 41,
    title: "New Auction Available",
    message: "Vehicle auction has started - Toyota Prius 2019",
    time: "3 hours ago",
    type: "bid",
    read: false,
    itemId: 3,
  },
  {
    id: 5,
    title: "Bid Confirmation",
    message: "Your bid of ₨180,000 on Electronics Bundle was successful",
    time: "4 hours ago",
    type: "confirmation",
    read: true,
    itemId: 2,
  },
  {
    id: 6,
    title: "Account Verification",
    message: "Your account has been successfully verified",
    time: "1 day ago",
    type: "account",
    read: true,
    itemId: null,
  },
]

export default function NotificationDropdown() {

  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type) => {
    switch (type) {
      case "bid":
        return <FontAwesomeIcon name={faBell} className="text-red-500" />
      case "ending":
        return <FontAwesomeIcon icon={faClock} className="text-yellow-500" />
      case "payment":
        return <FontAwesomeIcon icon={faCreditCard} className="text-orange-500" />
      case "new_auction":
        return <FontAwesomeIcon icon={faBullhorn} className="text-green-500" />
      case "confirmation":
        return <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500" />
      case "account":
        return <FontAwesomeIcon icon={faUser} className="text-purple-500" />
      default:
        return <FontAwesomeIcon icon={faBell} className="text-gray-500" />
    }
  }

  const markAsRead = (id) => {
    console.log("Marked as read:", id)
  }

  const handleClick = (notification) => {
    markAsRead(notification.id)
    if (notification.itemId) {
      window.location.href = `/item/${notification.itemId}`
    }
  }

  return (
    <div className="relative">
      {/* Dropdown */}
      
        <div className="absolute  mt-1 w-120 max-h-[500px] bg-white border border-gray-200 rounded shadow-lg overflow-y-auto z-50 rounded-lg lg:w-150 lg:right-5">
          <div className="p-3 flex justify-between items-center border-b bg-[#1e3a5f]">
            <span className="text-lg  text-white font-semibold">Notifications ({notifications.length})</span>
            {unreadCount > 0 && (
              <button className="text-xs text-white hover:underline" onClick={() => console.log("Mark all read")}>
                Mark all read
              </button>
            )}
          </div>

          {notifications.length > 0 ? (
            notifications.slice(0, 6).map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-blue-100 cursor-pointer rounded-sm ${
                  !notification.read ? "bg-blue-50 border-l-4 border-blue-500" : ""
                }`}
                onClick={() => handleClick(notification)}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getIcon(notification.type)}</span>
                    <span className="font-medium text-sm">{notification.title}</span>
                  </div>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-xs px-2 py-1 rounded border ${
                      notification.type === "bid"
                        ? "bg-red-50 text-red-600 border-red-200"
                        : notification.type === "ending"
                        ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                        : notification.type === "payment"
                        ? "bg-orange-50 text-orange-600 border-orange-200"
                        : notification.type === "new_auction"
                        ? "bg-green-50 text-green-600 border-green-200"
                        : notification.type === "confirmation"
                        ? "bg-blue-50 text-blue-600 border-blue-200"
                        : "bg-purple-50 text-purple-600 border-purple-200"
                    }`}
                  >
                    {notification.type.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No notifications
            </div>
          )}

          {notifications.length > 6 && (
            <div className="text-center p-3 text-[#1e3a5f] font-sm text-sm cursor-pointer hover:underline">
              View All {notifications.length} Notifications
            </div>
          )}
        </div>
      
    </div>
  )
}