
import { createContext, useContext, useState, useEffect } from 'react';

const WsContext = createContext();

export function WsProvider({ children, wsUrl }) {
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    let ws;

    useEffect(() => {
        // Initialize WebSocket
        ws = new WebSocket(wsUrl);

        // Handle connection open
        ws.onopen = () => {
            setIsConnected(true);
            // Send handshake if needed
            ws.send(JSON.stringify({ type: 'handshake', data: 'your-handshake-data' }));
        };

        // Handle incoming messages
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages(prev => [...prev, data]);
        };

        // Handle errors/close
        ws.onerror = (error) => console.error('WS Error:', error);
        ws.onclose = () => setIsConnected(false);

        // Cleanup on unmount
        return () => ws.close();
    }, [wsUrl]);

    return (
        <WsContext.Provider value={{ messages, isConnected }}>
            {children}
        </WsContext.Provider>
    );
}

// Custom hook to access WS state
export function useWs() {
    return useContext(WsContext);
}