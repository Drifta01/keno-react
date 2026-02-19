import React, { useState, useEffect, useCallback } from "react";
import { useWebSocket } from "../hooks/useWebSocket";

function KenoMonitor() {
  const [messages, setMessages] = useState([]);
  const [drawnNumbers, setDrawnNumbers] = useState(Array(80).fill(false)); // Track drawn numbers
  const [url, setUrl] = useState(null);
  const { lastMessage, isConnected } = useWebSocket(url);

  const addMessage = useCallback((text) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      `[${new Date().toLocaleTimeString()}] ${text}`,
    ]);
  }, []);

  useEffect(() => {
    if (lastMessage) {
      try {
        const data = JSON.parse(lastMessage.data);
        if (data.drawnNumbers && Array.isArray(data.drawnNumbers)) {
          // Update drawnNumbers state array
          const newDrawn = [...drawnNumbers];
          data.drawnNumbers.forEach((num) => {
            newDrawn[num - 1] = true; // Mark as drawn (adjust index)
          });
          setDrawnNumbers(newDrawn); // Update state
          addMessage(`New drawn numbers: ${data.drawnNumbers.join(", ")}`);
        } else {
          addMessage(`Received: ${lastMessage.data}`);
        }
      } catch (error) {
        addMessage(
          `Error parsing message: ${lastMessage.data} | Error: ${error.message}`
        );
      }
    }
  }, [lastMessage, addMessage]);

  useEffect(() => {
    if (url) {
        if (isConnected) {
            addMessage(`Connected to ${url}`);
        } else {
            addMessage(`Disconnected from ${url}`);
        }
    }
  }, [isConnected, url, addMessage]);

  const connectWebSocket = () => {
    setUrl("wss://backend.bcdprod.net");
  };

  const connectionStatus = isConnected ? "Connected" : "Disconnected";

  return (
    <div>
      <h1>Keno Bet WebSocket Monitor</h1>
      <p>Monitoring WebSocket messages from backend.bcdprod.net</p>

      <div
        style={{
          padding: "10px",
          borderRadius: "4px",
          marginBottom: "15px",
          textAlign: "center",
          backgroundColor:
            connectionStatus === "Disconnected" ? "#ffebee" : "#e8f5e9",
          color: connectionStatus === "Disconnected" ? "#b71c1c" : "#2e7d32",
        }}
      >
        Connection Status: {connectionStatus}
      </div>

      <button
        onClick={connectWebSocket}
        style={{
          display: "block",
          margin: "0 auto 25px auto",
          padding: "10px 25px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#2196f3",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Connect
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gap: "6px",
          marginBottom: "25px",
        }}
      >
        {Array.from({ length: 80 }, (_, i) => i + 1).map((number) => (
          <div
            key={number}
            style={{
              width: "100%",
              height: "45px",
              backgroundColor: drawnNumbers[number - 1] ? "#f44336" : "#000", // Red if newly drawn, black otherwise
              color: "#fff",
              fontSize: "18px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              cursor: "default",
            }}
          >
            {number}
          </div>
        ))}
      </div>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "4px",
        }}
      >
        <h3>Recent Messages:</h3>
        <div style={{ marginTop: "10px", lineHeight: "1.5" }}>
          {messages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default KenoMonitor;