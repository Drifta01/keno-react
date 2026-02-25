require('dotenv').config();
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

console.log('Socket proxy server started on port 8080');

wss.on('connection', (clientWs) => {
    console.log('Client connected to proxy');

    const token = process.env.TVBET_API_TOKEN;
    if (!token) {
        console.error("TVBET_API_TOKEN not found in .env.local. Make sure the environment variable is set.");
        clientWs.close();
        return;
    }

    const tvbetUrl = `wss://tvbetframe.com/proxy-game/game?default-client-id=5730&default-language=en&token=${token}`;
    const targetSocket = new WebSocket(tvbetUrl);

    targetSocket.on('open', () => {
        console.log('Proxy connected to TVBet WebSocket');
    });

    targetSocket.on('message', (data) => {
        // Forward message from TVBet to the client
        clientWs.send(data);
    });

    targetSocket.on('close', () => {
        console.log('Connection to TVBet WebSocket closed');
        clientWs.close();
    });

    targetSocket.on('error', (error) => {
        console.error('Error on TVBet WebSocket connection:', error);
        clientWs.close();
    });

    clientWs.on('message', (data) => {
        // Forward message from the client to TVBet
        if (targetSocket.readyState === WebSocket.OPEN) {
            targetSocket.send(data);
        }
    });

    clientWs.on('close', () => {
        console.log('Client disconnected from proxy');
        if (targetSocket.readyState === WebSocket.OPEN) {
            targetSocket.close();
        }
    });

    clientWs.on('error', (error) => {
        console.error('Error on client WebSocket connection:', error);
        if (targetSocket.readyState === WebSocket.OPEN) {
            targetSocket.close();
        }
    });
});