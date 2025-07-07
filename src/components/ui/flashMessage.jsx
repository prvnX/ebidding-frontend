import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

/**
 * FlashMessage Component
 *
 * Displays a temporary success or error message based on React Router's `location.state`.
 * Designed for showing feedback after actions like form submissions or updates.
 *
 * This component:
 * - Accepts a `locationState` prop (typically from `useLocation().state`)
 * - Detects and displays `success` or `error` messages
 * - Auto-dismisses after 3 seconds or when clicked
 * - Clears only the message from the state, keeping other data intact
 *
 * ✅ How to use with navigation:
 *
 * To show a message when redirecting a user:
 *
 *   navigate('/target-page', {
 *     state: { success: 'Your changes were saved.' }
 *   });
 *
 * To show an error:
 *
 *   navigate('/login', {
 *     state: { error: 'Invalid credentials.' }
 *   });
 *
 * ✅ How to use with <Link>:
 *
 * You can also pass the state using the `state` prop in a Link:
 *
 *   <Link to="/profile" state={{ success: 'Profile updated!' }}>
 *     Go to Profile
 *   </Link>
 *
 * - Requires FontAwesome for icons
 */
const MessageToast = ({ locationState }) => {
  const [visible, setVisible] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (locationState?.success) {
      setMessage({ type: 'success', text: locationState.success });
      clearMessageFromState();
    } else if (locationState?.error) {
      setMessage({ type: 'error', text: locationState.error });
      clearMessageFromState();
    }

    function clearMessageFromState() {
        setVisible(true)
        const state = { ...window.history.state };

        if (state?.usr?.success || state?.usr?.error) {
            const newState = { ...state.usr };
            delete newState.success;
            delete newState.error;

            window.history.replaceState({ ...state, usr: newState }, document.title);
        }
    }

  }, [locationState]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setVisible(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if(visible) return;
    setTimeout(() => {
        setMessage(null);
    }, 1000)
  }, [visible])

  if (!message) return null;

  return (
    <>
         <div
            className={`fixed inset-0 bg-black/30 z-40 ${visible ? '' : 'hidden'}`}
            onClick={() => setVisible(false)}
        />
        <div
        className={`
            fixed top-25 left-1/2 transform -translate-x-1/2
            min-w-[280px] max-w-md
            flex items-center justify-between gap-3
            px-5 py-3 rounded-lg shadow-lg select-none
            transition-all duration-300
            z-50
            ${
            message.type === 'success'
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-red-500 text-white hover:bg-red-600'
            }
            ${ visible ? 'translate-y-0 opacity-100' : 'translate-y-[-100px] opacity-0' }
        `}
        role="alert" //marks this div as an alert box.
        aria-live="assertive" //tells screen readers to announce the message immediately.
        >
            <div className="flex items-center gap-3">
                <FontAwesomeIcon
                icon={message.type === 'success' ? faCheckCircle : faTimesCircle}
                className="text-xl"
                />
                <span className="font-semibold">{message.text}</span>
            </div>
        <FontAwesomeIcon 
            icon={faTimes} 
            className="text-xl cursor-pointer"
            onClick={() => setVisible(false)}
            />
        </div>
    </>
  );
};

export default MessageToast;