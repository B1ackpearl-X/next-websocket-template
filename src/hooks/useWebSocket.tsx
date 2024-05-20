"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type TWebSocket = {
  isConnected: boolean;
  messages: string[];
};

const WebSocketContext = createContext<TWebSocket>({
  isConnected: false,
  messages: [],
});

export default function WebSocketContextProvider(props: {
  children: ReactNode;
}) {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      setIsConnected(true);
    };
    socket.onmessage = (event) => {
      const newMessage = event.data;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
      setIsConnected(false);
    };
    return () => socket.close();
  }, []);

  return (
    <WebSocketContext.Provider value={{ isConnected, messages }}>
      {props.children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  if (!process.env.NEXT_PUBLIC_SOCKET_URL) {
    throw "Socket url not provided";
  }

  const context = useContext<TWebSocket>(WebSocketContext);

  if (!context) {
    throw new Error("useWebSocket must be use in WebSocketContext");
  }

  return context;
}
