import WebSocketContextProvider from "@/hooks/useWebSocket";
import React from "react";

export default function GlobalContextProvider(props: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <SocketContextProvider> */}
      <WebSocketContextProvider>{props.children}</WebSocketContextProvider>
      {/* </SocketContextProvider> */}
    </>
  );
}
