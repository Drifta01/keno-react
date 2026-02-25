"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import KenoTicket from "./KenoTicket";

import { useWebSocket } from "./useWebSocket";
const WS_URL =
  "wss://tvbetframe.com/proxy-game/game?default-client=5730&access_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IkQyNTk5NTU5REMxNkI5NkZGNkU5OTI2NkQ2MTdBMDgyQjk2MjdDNUEiLCJ0eXAiOiJKV1QiLCJ4NXQiOiIwbG1WV2R3V3VXXzI2WkptMWhlZ2dybGlmRm8ifQ.eyJuYmYiOjE3NzE5OTg2NDMsImV4cCI6MTc3MjAwMDQ0MywiaXNzIjoiaHR0cHM6Ly9hcGkubmV0L2lkZW50aXR5LWFwaS8iLCJhdWQiOlsiYmV0cy1hcGkiLCJmZWVkcy1hcGkiLCJzaWduYWxyLWZlZWQtYXBpIiwiZXh0ZXJuYWwtY2xpZW50LWFwaSIsInBhcnRuZXJzLWFwaSIsIndlYiIsInNpZ25hbHItYXBpIiwiY2hhdHMtc2lnbmFsci1hcGkiLCJwcm9tb2NvZGVzLWFwaSIsImh0dHBzOi8vYXBpLm5ldC9pZGVudGl0eS1hcGkvcmVzb3VyY2VzIl0sInRva2VuIjoiIiwidXNlcl9wYXJhbWV0ZXJzIjoie1widXNlcl9pZFwiOjQyNDkxMjgwLFwicGFydG5lcl9jbGllbnRfaWRcIjo1NzMwLFwidXNlcl9pc3Rlc3RcIjp0cnVlLFwiY3VycmVuY3lfY29kZVwiOlwiRVVSXCIsXCJsYW5ndWFnZVwiOlwiZW5cIixcInVzZXJfcmVnaXN0cmF0aW9uX2RhdGVcIjpcIjIwMjYtMDItMjVUMDU6NTA6NDNaXCIsXCJ0YWdfaWRcIjpudWxsLFwidXNlcl9jbHVzdGVyXCI6bnVsbCxcInBhcnRuZXJfY2xpZW50X2NsdXN0ZXJcIjpcIkxvd1wiLFwiY291bnRyeV9uYW1lXCI6XCJuelwiLFwiZGV2aWNlX25hbWVcIjpcIlwiLFwiZGV2aWNlX29zXCI6XCJXaW5kb3dzXCIsXCJkZXZpY2VfdHlwZVwiOlwiRGVza3RvcFwiLFwiZGV2aWNlX2Jyb3dzZXJcIjpcIkNocm9tZVwiLFwicGFydG5lcl9pZHNcIjpbNDc5NiwyMDAyNDFdLFwidmlzaXRvcl9pZFwiOlwiNDI0OTEyODBcIn0iLCJ1c2VyX3Nlc3Npb25faWQiOiIwZmY0ZjUxZC03YWQ2LTQ3OGEtYTVjMy00YzlkNjJjZGI2ZDEiLCJyb2xlIjoiUGFydG5lclVzZXIiLCJwYXJ0bmVyX2NsaWVudF9pZCI6IjU3MzAiLCJwYXJ0bmVyX3VzZXJfaWQiOiI2dWFsMWJyamF1LVR2QmV0LURlbW9TaXRlLVVzZXItQkVULUVVUiIsImN1cnJlbmN5X2NvZGUiOiJFVVIiLCJjbGllbnRfaWQiOiJQYXJ0bmVyQ2xpZW50VXNlci01NzMwLTZ1YWwxYnJqYXUtVHZCZXQtRGVtb1NpdGUtVXNlci1CRVQtRVVSIiwidXNlcl9pZCI6IjQyNDkxMjgwIiwic2NvcGUiOlsiYmV0cy1hcGkiLCJmZWVkcy1hcGkiLCJzaWduYWxyLWZlZWQtYXBpIiwiZXh0ZXJuYWwtY2xpZW50LWFwaSIsInBhcnRuZXJzLWFwaSIsIndlYiIsInNpZ25hbHItYXBpIiwiY2hhdHMtc2lnbmFsci1hcGkiLCJwcm9tb2NvZGVzLWFwaSJdfQ.HXcGNGWAxgasXVlayQk7zXVhAwbsCVNNo5r1TfAHvSA2oWxD3Bv8g-WhGPXSCtzocDW1ymdequ23tEnq41sO6g9BmzMFvZWihILz3Enr1BIJumRlWsVYB66SbeyG-7ZijqkgBCR4LB_MTsy1bbF0MLfOa9JER9TbfzyninfNDWQOHYZH7g3ChfLijYDHUEeEC0xLiJI6gfTNfLSBreTS3BSF0j48zGE5mhnPbBTitJB_sbiE-mPdPfnRccC9j_hl6tYH_yMBrIYVwcfuNcr4pDnim1u4FwJ51isUmM902JbYYPcFdquCG_vaxLSa8WSmCSi5b4SzPDaLl_O-7AUrjgRClJJhAHFlWLJwvtl8nBnWxJJ1m-TATgz7S5dZKl-Kf3L2xYsjmk72ClpwatWzQ_CAs9CJaK3vTaQ2qbyxKmt5Mp5QzjYy8JypXQ5iHP9aBC8tnxHackdfqIm-yAhyu6chdERBMCXdi8mX2d304tR7Bksr-7wLIcxbDcpDbjeLNjW3T1GaeSz9XrMlJz65JhYARORYHxCCXjVptHhvRR1QFELVZFFcul5SfZKtGpmsOQ2i0ZqhcqrbFq6DA98QbnBZ9XkzgoTSZccXX8QHMqnwAIGirvyNKzKY6LW-BKvjq8Ke94uib0Ftr5CO9clzH8Zz5XT0sTjxVF13kyKS8pQ";

const GAME_EVENT = JSON.stringify({
  target: "CurrentGameResultSubscribe",
  arguments: [{ GameType: 23 }],
  invocationId: "1",
  type: 1,
});

function KenoMonitor() {
  const [activeTab, setActiveTab] = useState("slip");
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [selectedNumbersDrawn, setSelectedNumbersDrawn] = useState([]);
  const [confirmedTickets, setConfirmedTickets] = useState([]);
  const [winLog, setWinLog] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
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
                    }, 20000);
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

  const connectionStatus = isConnected ? "" : "";

  return (
    <div className="flex h-screen overflow-hidden bg-[#080c14] text-white font-sans">
      {/* ── LEFT PANEL: Connection + Results + Stats ── */}
      <div className="w-100 shrink-0 flex flex-col border-r border-slate-800 bg-[#0d1420] overflow-hidden">
        {/* Connection badge */}
        <div className="px-4 py-3 border-b border-slate-800 flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              connectionStatus === "Disconnected"
                ? "bg-red-500 animate-pulse"
                : "bg-green-500"
            }`}
          />
          <span
            className={`text-sm font-mono font-bold tracking-widest uppercase ${
              connectionStatus === "Disconnected"
                ? "text-red-400"
                : "text-green-400"
            }`}>
            {connectionStatus}connected
            <div className="mb-4 px-4 py-3 border-b mt-0 w-80  border-slate-800 space-y-2">
              {[
                {
                  label: "Hot Last 10",
                  color: "text-red-400",
                  value: stats.hot?.join(", ") || "N/A",
                },
                {
                  label: "Cold Last 10",
                  color: "text-cyan-400",
                  value: stats.cold?.join(", ") || "N/A",
                },
                {
                  label: "Most Drawn",
                  color: "text-gray-300",
                  value: stats.mostCommon?.join(", ") || "N/A",
                },
                {
                  label: "Least Drawn",
                  color: "text-gray-500",
                  value: stats.leastCommon?.join(", ") || "N/A",
                },
              ].map(({ label, color, value }) => (
                <div
                  key={label}
                  className="px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/40">
                  <p
                    className={`text-[14px] justify-self-center font-mono uppercase tracking-wider mb-0.5 ${color}`}>
                    {label}
                  </p>
                  <p className="text-xs text-gray-300 font-mono wrap-break-word">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </span>
        </div>

        {/* Results header + list */}
        <div className="  px-4 pt-3 pb-1 border-b border-slate-800">
          <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-2">
            Results
          </h2>
          <div className="space-y-2 overflow-y-auto max-h-screen pr-1 custom-scrollbar">
            {isLoading && gameHistory.length === 0 ? (
              <p className="text-gray-500 text-xs italic animate-pulse">
                Waiting for first game to complete...
              </p>
            ) : gameHistory.length > 0 ? (
              gameHistory.map((game) => (
                <div
                  key={game.id}
                  className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/40  hover:bg-slate-800 transition-colors">
                  <p className="text-[10px] font-mono text-blue-300 uppercase tracking-wider mb-1">
                    {game.id}
                  </p>
                  <div className="grid grid-cols-10 gap-1 ">
                    {game.numbers.map((n, idx) => (
                      <span
                        key={idx}
                        className="text-[20px] font-mono bg-slate-700 px-1 py-0.5 rounded text-gray-300">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 italic text-xs">
                No game history yet.
              </p>
            )}
          </div>
        </div>

        {/* Stats */}

        {/* Hit History */}
        <div className="hidden flex-1 overflow-y-auto px-4 py-3 custom-scrollbar">
          <h4 className="text-[10px] font-mono text-green-400 uppercase tracking-widest mb-2">
            Hit History
          </h4>
          <div className="space-y-1">
            {winLog.length > 0 ? (
              winLog.map((log, index) => (
                <div
                  key={index}
                  className="text-xs p-2 rounded-lg bg-green-900/20 border border-green-800/30">
                  <p className="font-bold text-green-300 font-mono">
                    Ticket {log.ticketId} — {log.hits} hit
                    {log.hits > 1 ? "s" : ""}
                  </p>
                  <p className="text-[10px] text-gray-500 font-mono">
                    {log.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 italic text-xs">
                No wins recorded yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── CENTER: Keno Grid ── */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#080c14] border border-white">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-[#0d1420]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
              Numbers Drawn
            </span>
            <span className="text-amber-400 font-mono font-bold text-lg">
              {drawnNumbers.length} / 20
            </span>
          </div>
          <div className="hidden sm:flex gap-4 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full ball-standard-sm inline-block" />{" "}
              Standard
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#1e3a5f] border border-white inline-block" />{" "}
              Selected
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />{" "}
              Drawn
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />{" "}
              Hit
            </span>
          </div>
        </div>

        {/* Ball grid */}
        <div className="flex-1 flex items-center justify-center px-2 py-2 overflow-auto">
          <div className="grid grid-cols-10 gap-2 place-items-center">
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
                    relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11
                    flex items-center justify-center rounded-full
                    transition-all duration-200 active:scale-90
                    ${isMatch ? "ball-selected-drawn" : isDrawn ? "ball-drawn" : isSelected ? "ball-selected" : "ball-standard"}
                  `}>
                  <span
                    className={`z-10 font-black text-xs select-none
                      ${isMatch || isDrawn ? "text-black" : isSelected ? "text-white" : "text-black"}
                    `}>
                    {number}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action buttons */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#0d1420] flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedNumbers([]);
              setSelectedNumbersDrawn([]);
            }}
            className="px-8 py-2.5 rounded-lg border border-slate-600 bg-slate-800 text-gray-400 text-sm font-mono font-bold uppercase tracking-widest hover:bg-slate-700 transition-all active:scale-95">
            Clear
          </button>
          <button
            onClick={() => {
              if (selectedNumbers.length > 0) {
                setConfirmedTickets((prev) => [...prev, selectedNumbers]);
                setSelectedNumbers([]);
              }
            }}
            className="px-10 py-2.5 rounded-lg bg-linear-to-b from-yellow-400 to-amber-600 text-black text-sm font-black uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-amber-900/40">
            Confirm
          </button>
        </div>
      </div>

      {/* ── RIGHT PANEL: Selected + Tickets ── */}
      <div className="w-100 shrink-0 flex flex-col border-l border-slate-800 bg-[#0d1420] overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-800">
          <button
            onClick={() => setActiveTab?.("slip")}
            className={`flex-1 py-3 text-[10px] font-mono uppercase tracking-widest transition-colors
              ${
                !activeTab || activeTab === "slip"
                  ? "text-amber-400 border-b-2 border-amber-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}>
            Bet Slip
          </button>
          <button
            onClick={() => setActiveTab?.("tickets")}
            className={`flex-1 py-3 text-[10px] font-mono uppercase tracking-widest transition-colors
              ${
                activeTab === "tickets"
                  ? "text-amber-400 border-b-2 border-amber-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}>
            Tickets
          </button>
        </div>

        {/* Selected numbers preview */}
        <div className="px-4 py-3 border-b border-slate-800">
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">
            Selected Numbers
          </p>
          <div className="flex flex-wrap gap-1 min-h-8">
            {selectedNumbers.length > 0 ? (
              [...selectedNumbers]
                .sort((a, b) => a - b)
                .map((n) => (
                  <span
                    key={n}
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-mono font-bold
                    bg-linear-to-b from-slate-600 to-slate-800 border border-white text-white">
                    {n}
                  </span>
                ))
            ) : (
              <p className="text-xs text-gray-600 italic">None selected</p>
            )}
          </div>
        </div>

        {/* Confirmed Tickets */}
        <div className="flex-1 overflow-y-auto px-4 py-3 custom-scrollbar">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
              Confirmed Tickets
            </h4>
            {confirmedTickets.length > 0 && (
              <button
                onClick={() => setConfirmedTickets([])}
                className="text-[10px] font-mono bg-red-900/50 hover:bg-red-800/60 text-red-400 py-0.5 px-2 rounded border border-red-800/50 transition-colors">
                Clear All
              </button>
            )}
          </div>

          <div className="space-y-2">
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
              <p className="text-gray-600 italic text-xs">
                No tickets confirmed.
              </p>
            )}
          </div>
        </div>
      </div>
      {/* <div className="mt-8 w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-0 text-white">
          Historical Results from DB
        </h2>
        {loading && <p>Loading results...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {results && (
          <pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-auto">
            {JSON.stringify(results, null, 2)}
          </pre>
        )}
      </div> */}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }

        .ball-standard {
          background: radial-gradient(circle at 35% 35%, #ff5f5f, #cc0000 60%, #660000 100%);
          box-shadow: inset -3px -3px 6px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.5);
        }
        .ball-standard::before {
          content: '';
          position: absolute;
          width: 65%; height: 65%;
          background: white;
          border-radius: 50%;
          z-index: 1;
        }

        .ball-standard-sm {
          background: radial-gradient(circle at 35% 35%, #ff5f5f, #cc0000 60%, #660000 100%);
        }

        .ball-selected {
          background: radial-gradient(circle at 35% 35%, #334155, #0f172a 70%, #000 100%);
          box-shadow: 0 0 15px #3b82f6, inset 0 0 10px rgba(255,255,255,0.2);
          border: 2px solid #fff;
        }

        .ball-drawn {
          background: radial-gradient(circle at 35% 35%, #fde047, #eab308 60%, #854d0e 100%);
          box-shadow: inset -3px -3px 6px rgba(0,0,0,0.4), 0 0 15px rgba(234,179,8,0.5);
        }
        .ball-drawn::before {
          content: '';
          position: absolute;
          width: 65%; height: 65%;
          background: rgba(255,255,255,0.8);
          border-radius: 50%;
          z-index: 1;
        }

        .ball-selected-drawn {
          background: radial-gradient(circle at 35% 35%, #86efac, #16a34a 70%, #14532d 100%);
          box-shadow: inset -3px -3px 6px rgba(0,0,0,0.4), 0 0 20px #34d399, 0 0 10px #10b981;
          border: 2px solid #f0fdf4;
        }
        .ball-selected-drawn::before {
          content: '';
          position: absolute;
          width: 65%; height: 65%;
          background: white;
          border-radius: 50%;
          z-index: 1;
        }

        button:hover.ball-standard { filter: brightness(1.2); }
      `}</style>
    </div>
  );
}

export default KenoMonitor;
