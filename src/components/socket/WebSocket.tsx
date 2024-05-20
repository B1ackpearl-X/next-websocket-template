"use client";

import { useWebSocket } from "@/hooks/useWebSocket";
import React from "react";

export default function WebSocket() {
  const { isConnected, messages } = useWebSocket();
  return (
    <main>
      <h1>Socket connect at {process.env.NEXT_PUBLIC_SOCKET_URL}</h1>
      <h3>Socket connection : {`${isConnected}`}</h3>
      <ul>
        {messages.map((message, index) => {
          return <li key={`websocket key ${index}`}>{message}</li>;
        })}
      </ul>
    </main>
  );
}
