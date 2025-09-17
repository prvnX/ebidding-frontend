// src/contexts/WebSocketContext.js
import React, { createContext, useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

// Create a context to hold the STOMP client
const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);
  const stompClientRef = useRef(null);

  useEffect(() => {
    console.log('User is logged in. Connecting WebSocket...');
    const socket = new SockJS('http://localhost:8081/ws');
    const client = new Client({
    webSocketFactory: () => socket,
    onConnect: () => {
        console.log('Connected to WebSocket!');
        setStompClient(client);
    },
    onDisconnect: () => {
        console.log('Disconnected from WebSocket.');
        setStompClient(null);
    },
    onStompError: (frame) => {
        console.error('Broker reported error: ', frame);
    },
    });

    client.activate();
    stompClientRef.current = client;

    // Cleanup function
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, []); // Re-run this effect only when the user's login status changes

  return (
    <WebSocketContext.Provider value={stompClient}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketContext;