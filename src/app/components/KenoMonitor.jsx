import React, { useState, useEffect, useCallback, useRef } from "react";
import KenoTicket from "./KenoTicket";

import { useWebSocket } from "../hooks/useWebSocket";

const WS_URL =
  "wss://tvbetframe.com/proxy-game/game?default-client=5730&access_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IkQyNTk5NTU5REMxNkI5NkZGNkU5OTI2NkQ2MTdBMDgyQjk2MjdDNUEiLCJ0eXAiOiJKV1QiLCJ4NXQiOiIwbG1WV2R3V3VXXzI2WkptMWhlZ2dybGlmRm8ifQ.eyJuYmYiOjE3NzE2MDc0NTUsImV4cCI6MTc3MTYwOTI1NSwiaXNzIjoiaHR0cHM6Ly9hcGkubmV0L2lkZW50aXR5LWFwaS8iLCJhdWQiOlsiYmV0cy1hcGkiLCJmZWVkcy1hcGkiLCJzaWduYWxyLWZlZWQtYXBpIiwiZXh0ZXJuYWwtY2xpZW50LWFwaSIsInBhcnRuZXJzLWFwaSIsIndlYiIsInNpZ25hbHItYXBpIiwiY2hhdHMtc2lnbmFsci1hcGkiLCJwcm9tb2NvZGVzLWFwaSIsImh0dHBzOi8vYXBpLm5ldC9pZGVudGl0eS1hcGkvcmVzb3VyY2VzIl0sInRva2VuIjoiIiwidXNlcl9wYXJhbWV0ZXJzIjoie1widXNlcl9pZFwiOjQyMzcxNTc2LFwicGFydG5lcl9jbGllbnRfaWRcIjo1NzMwLFwidXNlcl9pc3Rlc3RcIjp0cnVlLFwiY3VycmVuY3lfY29kZVwiOlwiRVVSXCIsXCJsYW5ndWFnZVwiOlwiZW5cIixcInVzZXJfcmVnaXN0cmF0aW9uX2RhdGVcIjpcIjIwMjYtMDItMjBUMTc6MTA6NTRaXCIsXCJ0YWdfaWRcIjpudWxsLFwidXNlcl9jbHVzdGVyXCI6bnVsbCxcInBhcnRuZXJfY2xpZW50X2NsdXN0ZXJcIjpcIkxvd1wiLFwiY291bnRyeV9uYW1lXCI6XCJuelwiLFwiZGV2aWNlX25hbWVcIjpcIlwiLFwiZGV2aWNlX29zXCI6XCJXaW5kb3dzXCIsXCJkZXZpY2VfdHlwZVwiOlwiRGVza3RvcFwiLFwiZGV2aWNlX2Jyb3dzZXJcIjpcIkNocm9tZVwiLFwicGFydG5lcl9pZHNcIjpbNDc5NiwyMDAyNDFdLFwidmlzaXRvcl9pZFwiOlwiNDIzNzE1NzZcIn0iLCJ1c2VyX3Nlc3Npb25faWQiOiIyN2FlNDliYi00OWYyLTQ4YjctODIwNy05NGE1MTNmZDI5N2IiLCJyb2xlIjoiUGFydG5lclVzZXIiLCJwYXJ0bmVyX2NsaWVudF9pZCI6IjU3MzAiLCJwYXJ0bmVyX3VzZXJfaWQiOiJobWNyZGtlN3FjLVR2QmV0LURlbW9TaXRlLVVzZXItQkVULUVVUiIsImN1cnJlbmN5X2NvZGUiOiJFVVIiLCJjbGllbnRfaWQiOiJQYXJ0bmVyQ2xpZW50VXNlci01NzMwLWhtY3Jka2U3cWMtVHZCZXQtRGVtb1NpdGUtVXNlci1CRVQtRVVSIiwidXNlcl9pZCI6IjQyMzcxNTc2Iiwic2NvcGUiOlsiYmV0cy1hcGkiLCJmZWVkcy1hcGkiLCJzaWduYWxyLWZlZWQtYXBpIiwiZXh0ZXJuYWwtY2xpZW50LWFwaSIsInBhcnRuZXJzLWFwaSIsIndlYiIsInNpZ25hbHItYXBpIiwiY2hhdHMtc2lnbmFsci1hcGkiLCJwcm9tb2NvZGVzLWFwaSJdfQ.b4Nf_PRKpZCDr0KxVQfcR4Vsewx8matl76zOrt2U9Ur-tFXscUU5dMC6EQujGiyCPqpWMWl_On0Ovui1ilEORKgpufjDSwzANiYMPjNDFG-ClKHdZp1xhRNsTqiopC6iLZGUEi_LIAR9yt2OXXCQV3EaETONeUAc0WKK1dHQileaxi2BepMqBEPdoi7iioWFfKLdUKMJfKEr3WCiQ-rT68lZjdQipw6pYFkTQw85Rwm8sT9tFVwSetum6zAvN6T4ipOOr_nCBIDtT_o9T_nHz9gWp0bkb1_91D59b6vUFSrpNQRpiSFTf531GPVspiEqe9QHbGwQbioGGH4OQRdQFEAZvaJ62IL8uprpq7ZV3tofwdx8sLwsHVitZHFAdkE6hD2dc-vzCNp2RfNd2ydLueJKO44QMAAaXL9lzj0ZpceplRjo_TTM_Klo3Mkr-tP6MOkdemfaRItv-S7C220ZPd8yrk0YUBiyWWNbX4uoVZdAiyV2KWXF-aseb5MErttE4fF-g00l40_B3vdXa67gSKns5nGOrHxvzMROFO-x0FidS3kSygTWxcACk7D0tGFGrjOAGrqN5zpy_MhurayaqysHkzidQvybZwKDQERx5MvaPWfRAYrnSx86J-sA-i0LHKkYOemCsSfMs829py2TP8KQ53R5NDfbgKTM_bhz0EA";

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
  const [confirmedTickets, setConfirmedTickets] = useState([]);
  const [winLog, setWinLog] = useState([]); // New state for the win log
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

  useEffect(() => {
    if (isConnected && !handshake) {
      sendMessage(JSON.stringify({ protocol: "json", version: 1 }) + "\u001e");
      sendMessage(GAME_EVENT);
      setHandshake(true);
    }
  }, [isConnected, handshake, sendMessage]);

  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        sendMessage(JSON.stringify({ type: 6 }) + "\u001e");
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isConnected, sendMessage]);

  useEffect(() => {
    if (lastMessage) {
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

                if (Array.isArray(items) && items.length === 0) {
                  if (clearBoardTimerRef.current) {
                    clearTimeout(clearBoardTimerRef.current);
                    clearBoardTimerRef.current = null;
                  }
                  setDrawnNumbers([]);
                  setSelectedNumbers([]);
                  setSelectedNumbersDrawn([]);
                }
              } else if (
                parsedMessage.type === 1 &&
                parsedMessage.target === "UpdateCurrentGameResult"
              ) {
                const gameData = parsedMessage.arguments[0]?.data;
                const items = gameData?.results?.items;
                const gameEdition = gameData?.gameEdition;

                if (Array.isArray(items)) {
                  const newNumbers = items
                    .map((item) => parseInt(item.value, 10))
                    .filter((n) => !isNaN(n));

                  setDrawnNumbers(newNumbers);

                  if (gameEdition && newNumbers.length === 20) {
                    setGameHistory((prevHistory) => {
                      if (
                        !prevHistory.some((game) => game.id === gameEdition)
                      ) {
                        const newEntry = {
                          id: gameEdition,
                          numbers: newNumbers,
                        };
                        // Check for wins on confirmed tickets
                        confirmedTickets.forEach((ticket, index) => {
                          const hits = ticket.filter((number) =>
                            newNumbers.includes(number),
                          ).length;
                          // A "win" is logged only when all numbers on a ticket match
                          if (ticket.length > 0 && hits === ticket.length) {
                            setWinLog((prevLog) => [
                              {
                                ticketId: `#${index + 1}`,
                                hits,
                                timestamp: new Date(),
                              },
                              ...prevLog,
                            ]);
                          }
                        });

                        return [newEntry, ...prevHistory].slice(0, 50); // Increased history to 50
                      }
                      return prevHistory;
                    });

                    if (clearBoardTimerRef.current) {
                      clearTimeout(clearBoardTimerRef.current);
                    }
                    clearBoardTimerRef.current = setTimeout(() => {
                      setDrawnNumbers([]);
                      setSelectedNumbers([]);
                      setSelectedNumbersDrawn([]);
                      clearBoardTimerRef.current = null;
                    }, 10000);
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
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [lastMessage, isLoading]);

  useEffect(() => {
    if (gameHistory.length > 0) {
      const allNumbers = gameHistory.reduce(
        (acc, game) => acc.concat(game.numbers),
        [],
      );
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

      const recentHistory = gameHistory.slice(0, 10);
      const recentNumbers = recentHistory.reduce(
        (acc, game) => acc.concat(game.numbers),
        [],
      );
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
        {/* Results */}
        <div className="w-full md:w-100 shrink-0">
          <h2 className="text-1xl text-blue-400 font-bold mb-0 flex gap-0">
            Results
          </h2>
          <div className="space-y-1 overflow-y-auto max-h-[90vh] pr-2 custom-scrollbar">
            {isLoading && gameHistory.length === 0 ? (
              <p className="text-gray-400 animate-pulse">
                Waiting for first game to complete...
              </p>
            ) : gameHistory.length > 0 ? (
              gameHistory.map((game) => (
                <div
                  key={game.id}
                  className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800 transition-colors">
                  <h4 className="font-bold text-sm text-blue-300 mb-2 tracking-widest uppercase r">
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
        <div className="flex flex-row-reverse w-fit ">
          <div className="w-full px-4 bg-black/40 p-2 rounded-3xl border: border-slate-800 shadow-2xl">
            {/* Statistics  */}
            <div className="grid grid-cols-2 gap-2 mb-2 ">
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
            <div className="grid grid-cols-10 gap-2 md:gap-3 mb-10 place-items-center">
              {Array.from({ length: 80 }, (_, i) => i + 1).map((number) => {
                const isDrawn = drawnNumbers.includes(number);
                const isSelected = selectedNumbers.includes(number);

                let isInConfirmed = false;
                for (const ticket of confirmedTickets) {
                  if (ticket.includes(number)) {
                    isInConfirmed = true;
                    break;
                  }
                }

                const isMatch = isDrawn && isInConfirmed;

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
                onClick={() => {
                  setSelectedNumbers([]);
                  setSelectedNumbersDrawn([]);
                }}
                className="px-12 py-4 rounded-full border border-white/10 bg-white/5 text-gray-400 font-bold uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95 shadow-lg">
                CLEAR
              </button>
              <button
                onClick={() => {
                  if (selectedNumbers.length > 0) {
                    setConfirmedTickets((prev) => [...prev, selectedNumbers]);
                    setSelectedNumbers([]);
                  }
                }}
                className="px-12 py-4 rounded-full bg-linear-to-b from-[#facc15] to-[#a16207] text-black font-black uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                CONFIRM
              </button>
            </div>

            <div className="text-center mt-6">
              <p className="text-xl font-semibold text-gray-300">
                Numbers Drawn:{" "}
                <span className="text-white font-bold">
                  {drawnNumbers.length} / 20
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
              <p className="text-gray-300 wrap-break-word text-sm">
                {selectedNumbers.length > 0
                  ? selectedNumbers.join(", ")
                  : "selected numbers will appear here."}
              </p>
            </div>
            {/* Confirmed Tickets */}
            <h4 className="font-bold text-sm text-amber-400 tracking-widest uppercase float-r">
              Confirmed Tickets
            </h4>
            <div className="flex justify-between items-center mb-2 ">
              {confirmedTickets.length > 0 && (
                <button
                  onClick={() => setConfirmedTickets([])}
                  className="text-xs bg-red-800 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transition-colors">
                  Clear All
                </button>
              )}
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm ">
              <div className="space-y-3 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
                {confirmedTickets.length > 0 ? (
                  confirmedTickets.map((ticket, index) => {
                    const hits = ticket.filter((number) =>
                      drawnNumbers.includes(number),
                    );
                    return (
                      <KenoTicket
                        key={index}
                        ticketId={`#${index + 1}`}
                        selectedNumbers={ticket}
                        drawnNumbers={drawnNumbers}
                        hitsCount={hits.length}
                      />
                    );
                  })
                ) : (
                  <p className="text-gray-500 italic">No tickets confirmed.</p>
                )}
              </div>
            </div>

            {/* Win Log */}
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
              <h4 className="font-bold text-sm text-green-400 tracking-widest uppercase mb-3">
                Hit History
              </h4>
              <div className="space-y-2 overflow-y-auto max-h-[150px] pr-2 custom-scrollbar">
                {winLog.length > 0 ? (
                  winLog.map((log, index) => (
                    <div
                      key={index}
                      className="text-sm p-2 rounded-lg bg-green-900/30">
                      <p className="font-bold text-green-300">
                        Ticket {log.ticketId} scored {log.hits} hit
                        {log.hits > 1 ? "s" : ""}!
                      </p>
                      <p className="text-xs text-gray-400">
                        {log.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic text-sm">
                    No wins recorded yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`
          fixed
          bottom-6
          right-6
          p-2
          rounded-lg
          text-xs
          font-bold
          tracking-wider
          transition-all
          shadow-lg
          z-50
          ${
            connectionStatus === "Disconnected"
              ? "bg-red-950/80 text-red-400 border border-red-900"
              : "bg-green-950/80 text-green-400 border border-slate-500"
          }
        `}>
        <span
          className={`inline-block w-2 h-2 rounded-full mr-2 ${connectionStatus === "Disconnected" ? "bg-red-500 animate-pulse" : "bg-green-500"}`}></span>
        STATUS: {connectionStatus.toUpperCase()}
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
        /* Selected & Drawn State - Glowing Green "Win" Ball */
        .ball-selected-drawn {
          background: radial-gradient(circle at 35% 35%, #86efac, #16a34a 70%, #14532d 100%); /* Light green to dark green */
          box-shadow: inset -3px -3px 6px rgba(0,0,0,0.4), 0 0 20px #34d399, 0 0 10px #10b981; /* Inner shadow + green glow */
          border: 2px solid #f0fdf4; /* A very light green/white border */
        }
        .ball-selected-drawn::before {
          content: '';
          position: absolute;
          width: 65%;
          height: 65%;
          background: white; /* The inner circle for the number */
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
