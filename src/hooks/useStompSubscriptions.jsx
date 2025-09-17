import { useEffect, useRef, useContext } from 'react';
import WebSocketContext from '../contexts/WebSocketContext';

export default (topic, onMessage, abortIf = false) => {
  const stompClient = useContext(WebSocketContext);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    // If there's no stomp client or no topic, do nothing
    if (abortIf || !stompClient || !topic) {
      return;
    }

    console.log(`Subscribing to new topic: ${topic}`);
    
    // Subscribe to the new topic and store the subscription object
    subscriptionRef.current = stompClient.subscribe(topic, (message) => {
      const payload = JSON.parse(message.body);
      onMessage(payload);
    });

    // Cleanup function to unsubscribe when the component unmounts or topic changes
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, [stompClient, topic, onMessage]); // Effect runs when the stompClient, topic, or onMessage change
};