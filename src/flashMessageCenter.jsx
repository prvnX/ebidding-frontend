import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

/**
 * FlashMessageCenter - a global message UI with context
 * - Supports multiple stacked messages
 * - Full-screen semi-transparent backdrop
 * - Auto dismiss after 8s or on close
 * - Add new messages from anywhere using exported `addMessage(type, text)`
 */

// Create context
const FlashMessageContext = createContext();
let addMessageExternal = null;

// Main exported UI component
const FlashMessageCenter = () => {
  const [messages, setMessages] = useState([]);

  const timersRef = useRef([]);

  const addMessage = (type, text) => {
    setMessages(prev => [...prev, { type, text }]);
  };

  const removeMessage = (index) => {
    setMessages(prev => prev.filter((_, i) => i !== index));
  };

  // Expose the function to use outside
  addMessageExternal = addMessage;

  // Auto-remove after 8s
  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = messages.map((_, i) =>
      setTimeout(() => removeMessage(i), 8000)
    );
    return () => timersRef.current.forEach(clearTimeout);
  }, [messages]);

  if (!messages.length) return null;

  return (
    <FlashMessageContext.Provider value={{ addMessage }}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-40" />

      {/* Messages */}
      <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`min-w-[280px] max-w-md px-5 py-3 rounded-lg shadow-lg flex items-center justify-between gap-3 select-none transition-all duration-300
              ${msg.type === 'success' ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-500 text-white hover:bg-red-600'}
            `}
          >
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={msg.type === 'success' ? faCheckCircle : faTimesCircle}
                className="text-xl"
              />
              <span className="font-semibold">{msg.text}</span>
            </div>
            <FontAwesomeIcon
              icon={faTimes}
              className="text-xl cursor-pointer"
              onClick={() => removeMessage(i)}
            />
          </div>
        ))}
      </div>
    </FlashMessageContext.Provider>
  );
};

export default FlashMessageCenter;

// Global access function to add messages
export const addFlashMessage = (type, text) => {
  if (typeof addMessageExternal === 'function') {
    addMessageExternal(type, text);
  } else {
    console.warn('FlashMessageCenter is not mounted yet.');
  }
};