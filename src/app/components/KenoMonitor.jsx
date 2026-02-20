import React, { useState, useEffect, useCallback, useRef } from "react";
import { useWebSocket } from "../hooks/useWebSocket";

// The new, valid WebSocket URL you provided
const WS_URL =
  "wss://tvbetframe.com/proxy-game/game?default-client=5730&access_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IkQyNTk5NTU5REMxNkI5NkZGNkU5OTI2NkQ2MTdBMDgyQjk2MjdDNUEiLCJ0eXAiOiJKV1QiLCJ4NXQiOiIwbG1WV2R3V3VXXzI2WkptMWhlZ2dybGlmRm8ifQ.eyJuYmYiOjE3NzE1NjYyMTksImV4cCI6MTc3MTU2ODAxOSwiaXNzIjoiaHR0cHM6Ly9hcGkubmV0L2lkZW50aXR5LWFwaS8iLCJhdWQiOlsiYmV0cy1hcGkiLCJmZWVkcy1hcGkiLCJzaWduYWxyLWZlZWQtYXBpIiwiZXh0ZXJuYWwtY2xpZW50LWFwaSIsInBhcnRuZXJzLWFwaSIsIndlYiIsInNpZ25hbHItYXBpIiwiY2hhdHMtc2lnbmFsci1hcGkiLCJwcm9tb2NvZGVzLWFwaSIsImh0dHBzOi8vYXBpLm5ldC9pZGVudGl0eS1hcGkvcmVzb3VyY2VzIl0sInRva2VuIjoiIiwidXNlcl9wYXJhbWV0ZXJzIjoie1widXNlcl9pZFwiOjQyMzU5NzMxLFwicGFydG5lcl9jbGllbnRfaWRcIjo1NzMwLFwidXNlcl9pc3Rlc3RcIjp0cnVlLFwiY3VycmVuY3lfY29kZVwiOlwiRVVSXCIsXCJsYW5ndWFnZVwiOlwiZW5cIixcInVzZXJfcmVnaXN0cmF0aW9uX2RhdGVcIjpcIjIwMjYtMDItMjBUMDU6NDM6MzlaXCIsXCJ0YWdfaWRcIjpudWxsLFwidXNlcl9jbHVzdGVyXCI6bnVsbCxcInBhcnRuZXJfY2xpZW50X2NsdXN0ZXJcIjpcIkxvd1wiLFwiY291bnRyeV9uYW1lXCI6XCJuelwiLFwiZGV2aWNlX25hbWVcIjpcIlwiLFwiZGV2aWNlX29zXCI6XCJXaW5kb3dzXCIsXCJkZXZpY2VfdHlwZVwiOlwiRGVza3RvcFwiLFwiZGV2aWNlX2Jyb3dzZXJcIjpcIkNocm9tZVwiLFwicGFydG5lcl9pZHNcIjpbNDc5NiwyMDAyNDFdLFwidmlzaXRvcl9pZFwiOlwiNDIzNTk3MzFcIn0iLCJ1c2VyX3Nlc3Npb25faWQiOiI2ODlkNWY3MS00OTZmLTQxYTAtODNjNS1kMTgwNzg5NWU0MjQiLCJyb2xlIjoiUGFydG5lclVzZXIiLCJwYXJ0bmVyX2NsaWVudF9pZCI6IjU3MzAiLCJwYXJ0bmVyX3VzZXJfaWQiOiJicmQ3YTNuanEwLVR2QmV0LURlbW9TaXRlLVVzZXItQkVULUVVUiIsImN1cnJlbmN5X2NvZGUiOiJFVVIiLCJjbGllbnRfaWQiOiJQYXJ0bmVyQ2xpZW50VXNlci01NzMwLWJyZDdhM25qcTAtVHZCZXQtRGVtb1NpdGUtVXNlci1CRVQtRVVSIiwidXNlcl9pZCI6IjQyMzU5NzMxIiwic2NvcGUiOlsiYmV0cy1hcGkiLCJmZWVkcy1hcGkiLCJzaWduYWxyLWZlZWQtYXBpIiwiZXh0ZXJuYWwtY2xpZW50LWFwaSIsInBhcnRuZXJzLWFwaSIsIndlYiIsInNpZ25hbHItYXBpIiwiY2hhdHMtc2lnbmFsci1hcGkiLCJwcm9tb2NvZGVzLWFwaSJdfQ.0LIzJCY1HQleMJxVbcY3vk4DZDMbRe841XHBaH-ha4pvrd0yYuW283MO1-Ypff1GQP5Xm93OuASGvvE5dyjKPOulKB9d6Oc4pdW8CVx-jol3qT9EYbcAiHgreNcOJLsP5mbzPSLh_e8xJqWwx8fe4ih5A6IJ0rjz4nEpNKtJPyDQzd3LRtTqP-xSq2Oqyteu8HQf_x46OKrLheMGteqr6WZYf_HOn4FQMRvbRCRCKGwfjhTi2K-UibF7YLOBaOwxI2bcT1rC0RsYkYHZ89WmBdCQeM5YUWvHrvcpJZ4LvEYIvX9kuAT0DL4SvduTYliQ886NltvMhtdA_rnzvHD4SdJA2Aacw-kT-WheEVSpTlMy2ZVn6CGiJdhlEWhIIf4lDI4doW_1-dABM5goNTbPCgBB42qAdz92uSI0OFCUBkIbwc3rqCh0rHZQVEejZvBHRjoPRjgZBslPKnmC9wf_65THnA8ieIsuXCpXqeBPhH4Jc2itmsemAmsv8HSSn_n4lUGb1tVjdi5uE16LZRmca4-TxltzzInqrGl_6prcM7uQpWHm_8t8LslICpCDG_vU2boZ7vTHo4TspWgtIViWT47sWLlqdpq-5_1y0gjY-dPAkKH4rVsrz9bTlQVVHidercpVaVEx7SmtgmR3QMO3jm2eJzd1mGC1N-D6EKPSYns";

const GAME_EVENT = JSON.stringify({
  target: "CurrentGameResultSubscribe",
  arguments: [{ GameType: 23 }],
  invocationId: "1",
  type: 1,
});

function KenoMonitor() {
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [selectedNumbersDrawn, setSelectedNumbersDrawn] = useState([]);
  const [gameHistory, setGameHistory] = useState([]); // New state for history
  const [isLoading, setIsLoading] = useState(true);
  const { lastMessage, isConnected, sendMessage } = useWebSocket(WS_URL);
  const [handshake, setHandshake] = useState(false);
  const clearBoardTimerRef = useRef(null);
  const [stats, setStats] = useState({
    hot: [],
    cold: [],
    mostCommon: [],
    leastCommon: [],
  });

  const handleNumberClick = (number) => {
    // Prevent selection if the number has already been drawn
    if (drawnNumbers.includes(number)) {
      return;
    }
    setSelectedNumbers((prevSelected) =>
      prevSelected.includes(number)
        ? prevSelected.filter((n) => n !== number)
        : [...prevSelected, number],
    );

    setSelectedNumbersDrawn((prevSelected) =>
      prevSelected.includes(number)
        ? prevSelected.filter((n) => n !== number)
        : [...prevSelected, number],
    );
  };

  // Perform handshake once connected
  useEffect(() => {
    if (isConnected && !handshake) {
      sendMessage(JSON.stringify({ protocol: "json", version: 1 }) + "\u001e");
      sendMessage(GAME_EVENT);
      setHandshake(true);
    }
  }, [isConnected, handshake, sendMessage]);

  // Send heartbeat to keep connection alive
  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        sendMessage(JSON.stringify({ type: 6 }) + "\u001e");
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isConnected, sendMessage]);

  // Process incoming messages
  useEffect(() => {
    if (lastMessage) {
      // Introduce a small delay to handle potential message fragmentation
      const timer = setTimeout(() => {
        const incomingMessages = lastMessage.data.split("\u001e");
        incomingMessages.forEach((message) => {
          if (message) {
            try {
              const parsedMessage = JSON.parse(message);
              console.log("WebSocket Message Received:", parsedMessage);

              if (isLoading) {
                setIsLoading(false);
              }

              if (parsedMessage.type === 3) {
                const items = parsedMessage.result?.data?.results?.items;
                // A type 3 message with 0 items indicates a new game is starting.
                if (Array.isArray(items) && items.length === 0) {
                  // New game signal, clear the board and any pending clear timers
                  if (clearBoardTimerRef.current) {
                    clearTimeout(clearBoardTimerRef.current);
                    clearBoardTimerRef.current = null;
                  }
                  setDrawnNumbers([]);
                  setSelectedNumbers([]); // Clear selections for the new game
                  setSelectedNumbersDrawn([]); // Clear selected drawn numbers for the new game
                }
              }
              // Handle type 1: Live updates AND Final Game Result
              else if (
                parsedMessage.type === 1 &&
                parsedMessage.target === "UpdateCurrentGameResult"
              ) {
                const gameData = parsedMessage.arguments[0]?.data;
                const items = gameData?.results?.items;
                const gameEdition = gameData?.gameEdition; // The unique ID for the game

                if (Array.isArray(items)) {
                  const newNumbers = items
                    .map((item) => parseInt(item.value, 10))
                    .filter((n) => !isNaN(n));

                  // Always update the live grid with the latest numbers
                  setDrawnNumbers(newNumbers);

                  // If we have 20 numbers, the game is over. Save it to history.
                  if (gameEdition && newNumbers.length === 20) {
                    setGameHistory((prevHistory) => {
                      // Avoid adding duplicate entries
                      if (
                        !prevHistory.some((game) => game.id === gameEdition)
                      ) {
                        const newEntry = {
                          id: gameEdition,
                          numbers: newNumbers, // Keep original order
                        };
                        return [newEntry, ...prevHistory].slice(0, 20);
                      }
                      return prevHistory;
                    });

                    // Set a timer to clear the board after 10 seconds
                    if (clearBoardTimerRef.current) {
                      clearTimeout(clearBoardTimerRef.current);
                    }
                    clearBoardTimerRef.current = setTimeout(() => {
                      setDrawnNumbers([]);
                      setSelectedNumbers([]);
                      setSelectedNumbersDrawn([]);
                      clearBoardTimerRef.current = null;
                    }, 10000); // 10 seconds
                  }
                }
              }
            } catch (error) {
              console.error(
                "Error parsing WebSocket message:",
                error,
                "Raw message:",
                message,
              );
            }
          }
        });
      }, 50); // 50ms delay

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [lastMessage, isLoading]);

  useEffect(() => {
    if (gameHistory.length > 0) {
      const allNumbers = gameHistory.flatMap((game) => game.numbers);
      const frequency = allNumbers.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
      }, {});

      const sortedByFrequency = Object.entries(frequency).sort(
        ([, a], [, b]) => b - a,
      );

      const mostCommon = sortedByFrequency
        .slice(0, 5)
        .map(([num]) => parseInt(num, 10));
      const leastCommon = sortedByFrequency
        .slice(-5)
        .map(([num]) => parseInt(num, 10))
        .reverse();

      // Hot/Cold from last 10 games
      const recentHistory = gameHistory.slice(0, 10);
      const recentNumbers = recentHistory.flatMap((game) => game.numbers);
      const recentFrequency = recentNumbers.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
      }, {});

      const sortedByRecentFrequency = Object.entries(recentFrequency).sort(
        ([, a], [, b]) => b - a,
      );

      const hot = sortedByRecentFrequency
        .slice(0, 5)
        .map(([num]) => parseInt(num, 10));
      const cold = sortedByRecentFrequency
        .slice(-5)
        .map(([num]) => parseInt(num, 10))
        .reverse();

      setStats({ mostCommon, leastCommon, hot, cold });
    }
  }, [gameHistory]);

  const connectionStatus = isConnected ? "Connected" : "Disconnected";

  return (
    <div className="bg-[#0f172a] text-white min-h-screen flex grow p-4 md:p-8 font-sans">
      <div className="flex flex-col lg:flex-row gap-8  max-w-screen-2xl mx-auto">
        {/* Left Column: Game History */}
        <div className="w-full lg:w-80 shrink-0">
          <h2 className="text-1xl text-blue-400 font-bold mb-6 flex  gap-2">
            Results
          </h2>
          <div className="space-y-3 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
            {isLoading && gameHistory.length === 0 ? (
              <p className="text-gray-400 animate-pulse">
                Waiting for first game to complete...
              </p>
            ) : gameHistory.length > 0 ? (
              gameHistory.map((game) => (
                <div
                  key={game.id}
                  className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800 transition-colors">
                  <h4 className="font-bold text-sm text-blue-300 mb-2 tracking-widest uppercase">
                    Game ID: {game.id}
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {game.numbers.map((n, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-slate-700 px-2 py-1 rounded text-gray-300">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">
                No game history yet. Completed games will appear here.
              </p>
            )}
          </div>
        </div>

        {/* Middle Column: Keno Grid */}
        <div className="grow flex justify-center">
          <div className="w-full bg-black/40 p-6 md:p-10 rounded-3xl border border-slate-800 shadow-2xl">
            <div
              className={`
                  p-3
                  rounded-xl
                  mb-8
                  text-center
                  font-bold
                  tracking-wider
                  transition-all
                  shadow-inner
                  ${
                    connectionStatus === "Disconnected"
                      ? "bg-red-950/50 text-red-400 border border-red-900"
                      : "bg-green-950/50 text-green-400 border border-green-900"
                  }
                `}>
              <span
                className={`inline-block w-2 h-2 rounded-full mr-2 ${connectionStatus === "Disconnected" ? "bg-red-500 animate-pulse" : "bg-green-500"}`}></span>
              SYSTEM STATUS: {connectionStatus.toUpperCase()}
            </div>

            <div className="grid grid-cols-10 gap-2 md:gap-4 mb-10 place-items-center">
              {Array.from({ length: 80 }, (_, i) => i + 1).map((number) => {
                const isDrawn = drawnNumbers.includes(number);
                const isSelected = selectedNumbers.includes(number);
                const isMatch = isDrawn && isSelected;

                return (
                  <button
                    key={number}
                    onClick={() => handleNumberClick(number)}
                    className={`
                      relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
                      flex items-center justify-center rounded-full
                      transition-all duration-200 active:scale-90
                      ${isMatch ? "ball-selected-drawn" : isDrawn ? "ball-drawn" : isSelected ? "ball-selected" : "ball-standard"}
                    `}>
                    <span
                      className={`z-10 font-black text-xs md:text-base select-none ${isDrawn ? "text-black" : isSelected ? "text-white" : "text-black"}`}>
                      {number}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8">
              <button
                onClick={() =>
                  setSelectedNumbers && setSelectedNumbersDrawn([])
                }
                className="px-12 py-4 rounded-full border border-white/10 bg-white/5 text-gray-400 font-bold uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95 shadow-lg">
                CLEAR
              </button>
              <button className="px-12 py-4 rounded-full bg-linear-to-b from-[#facc15] to-[#a16207] text-black font-black uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                CONFIRM
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Stats Panel */}
        <div className="w-full lg:w-72 shrink-0">
          <h2 className="text-xl text-blue-400 font-bold mb-6">Statistics</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
              <h4 className="font-bold text-sm text-blue-300 mb-2 tracking-widest uppercase">
                Your Selections
              </h4>
              <p className="text-gray-300 wrap-break-word text-sm">
                {selectedNumbers.length > 0
                  ? selectedNumbers.join(", ")
                  : "None"}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
              <h4 className="font-bold text-sm text-red-400 mb-2 tracking-widest uppercase">
                Hot Numbers (Last 10)
              </h4>
              <p className="text-gray-300 wrap-break-word text-sm">
                {stats.hot?.join(", ") || "N/A"}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
              <h4 className="font-bold text-sm text-cyan-400 mb-2 tracking-widest uppercase">
                Cold Numbers (Last 10)
              </h4>
              <p className="text-gray-300 wrap-break-word text-sm">
                {stats.cold?.join(", ") || "N/A"}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
              <h4 className="font-bold text-sm text-gray-300 mb-2 tracking-widest uppercase">
                Most Common (All Time)
              </h4>
              <p className="text-gray-300 wrap-break-word text-sm">
                {stats.mostCommon?.join(", ") || "N/A"}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
              <h4 className="font-bold text-sm text-gray-400 mb-2 tracking-widest uppercase">
                Least Common (All Time)
              </h4>
              <p className="text-gray-300 wrap-break-word text-sm">
                {stats.leastCommon?.join(", ") || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }

        /* Standard Red 3D Ball */
        .ball-standard {
          background: radial-gradient(circle at 35% 35%, #ff5f5f, #cc0000 60%, #660000 100%);
          box-shadow: inset -3px -3px 6px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.5);
        }
        .ball-standard::before {
          content: '';
          position: absolute;
          width: 65%;
          height: 65%;
          background: white;
          border-radius: 50%;
          z-index: 1;
        }

        /* Selected State - Glowing Blue/Dark */
        .ball-selected {
          background: radial-gradient(circle at 35% 35%, #334155, #0f172a 70%, #000 100%);
          box-shadow: 0 0 15px #3b82f6, inset 0 0 10px rgba(255,255,255,0.2);
          border: 2px solid #fff;
        }

        /* Drawn State - Golden/Yellow 3D Ball */
        .ball-drawn {
          background: radial-gradient(circle at 35% 35%, #fde047, #eab308 60%, #854d0e 100%);
          box-shadow: inset -3px -3px 6px rgba(0,0,0,0.4), 0 0 15px rgba(234,179,8,0.5);
        }
        .ball-drawn::before {
          content: '';
          position: absolute;
          width: 65%;
          height: 65%;
          background: rgba(255,255,255,0.8);
          border-radius: 50%;
          z-index: 1;
        }
          /* Selected and Drawn State -  Bright/Green 3D Ball*/
          .ball-selected-drawn {
          background: radial-gradient(circle at 35% 35%, #34d399, #16a34a 60%, #15803d 100%);
          box-shadow: === inset -3px -3px 6px rgba(0,0,0,0.4), 0 0 15px rgba(59,130,246,0.5);
          border: 2px solid green;
        }
          .ball-selected-drawn::before {
          content: '';
          position: absolute;
          width: 65%;
          height: 65%;
          background: 2px solid green;
          border-radius: 50%;
          z-index: 1;
        }



        button:hover.ball-standard {
          filter: brightness(1.2);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}

export default KenoMonitor;
