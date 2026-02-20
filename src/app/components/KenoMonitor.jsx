import React, { useState, useEffect, useCallback } from "react";
import { useWebSocket } from "../hooks/useWebSocket";

// The new, valid WebSocket URL you provided
const WS_URL =
  "wss://tvbetframe.com/proxy-game/game?default-client=5730&access_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IkQyNTk5NTU5REMxNkI5NkZGNkU5OTI2NkQ2MTdBMDgyQjk2MjdDNUEiLCJ0eXAiOiJKV1QiLCJ4NXQiOiIwbG1WV2R3V3VXXzI2WkptMWhlZ2dybGlmRm8ifQ.eyJuYmYiOjE3NzE1NDUyNzYsImV4cCI6MTc3MTU0NzA3NiwiaXNzIjoiaHR0cHM6Ly9hcGkubmV0L2lkZW50aXR5LWFwaS8iLCJhdWQiOlsiYmV0cy1hcGkiLCJmZWVkcy1hcGkiLCJzaWduYWxyLWZlZWQtYXBpIiwiZXh0ZXJuYWwtY2xpZW50LWFwaSIsInBhcnRuZXJzLWFwaSIsIndlYiIsInNpZ25hbHItYXBpIiwiY2hhdHMtc2lnbmFsci1hcGkiLCJwcm9tb2NvZGVzLWFwaSIsImh0dHBzOi8vYXBpLm5ldC9pZGVudGl0eS1hcGkvcmVzb3VyY2VzIl0sInRva2VuIjoiIiwidXNlcl9wYXJhbWV0ZXJzIjoie1widXNlcl9pZFwiOjQyMzU0MTAzLFwicGFydG5lcl9jbGllbnRfaWRcIjo1NzMwLFwidXNlcl9pc3Rlc3RcIjp0cnVlLFwiY3VycmVuY3lfY29kZVwiOlwiRVVSXCIsXCJsYW5ndWFnZVwiOlwiZW5cIixcInVzZXJfcmVnaXN0cmF0aW9uX2RhdGVcIjpcIjIwMjYtMDItMTlUMjM6NTQ6MzZaXCIsXCJ0YWdfaWRcIjpudWxsLFwidXNlcl9jbHVzdGVyXCI6bnVsbCxcInBhcnRuZXJfY2xpZW50X2NsdXN0ZXJcIjpcIkxvd1wiLFwiY291bnRyeV9uYW1lXCI6XCJuelwiLFwiZGV2aWNlX25hbWVcIjpcIlwiLFwiZGV2aWNlX29zXCI6XCJXaW5kb3dzXCIsXCJkZXZpY2VfdHlwZVwiOlwiRGVza3RvcFwiLFwiZGV2aWNlX2Jyb3dzZXJcIjpcIkNocm9tZVwiLFwicGFydG5lcl9pZHNcIjpbNDc5NiwyMDAyNDFdLFwidmlzaXRvcl9pZFwiOlwiNDIzNTQxMDNcIn0iLCJ1c2VyX3Nlc3Npb25faWQiOiI5MzZiMGY2Mi0zMmNkLTQxZmUtODAwOS0yYWExMjA4Yjc5OTMiLCJyb2xlIjoiUGFydG5lclVzZXIiLCJwYXJ0bmVyX2NsaWVudF9pZCI6IjU3MzAiLCJwYXJ0bmVyX3VzZXJfaWQiOiIxZGcwdTdrNzYwLVR2QmV0LURlbW9TaXRlLVVzZXItQkVULUVVUiIsImN1cnJlbmN5X2NvZGUiOiJFVVIiLCJjbGllbnRfaWQiOiJQYXJ0bmVyQ2xpZW50VXNlci01NzMwLTFkZzB1N2s3NjAtVHZCZXQtRGVtb1NpdGUtVXNlci1CRVQtRVVSIiwidXNlcl9pZCI6IjQyMzU0MTAzIiwic2NvcGUiOlsiYmV0cy1hcGkiLCJmZWVkcy1hcGkiLCJzaWduYWxyLWZlZWQtYXBpIiwiZXh0ZXJuYWwtY2xpZW50LWFwaSIsInBhcnRuZXJzLWFwaSIsIndlYiIsInNpZ25hbHItYXBpIiwiY2hhdHMtc2lnbmFsci1hcGkiLCJwcm9tb2NvZGVzLWFwaSJdfQ.m-4vJosVUN0l-jTfTnP24OWJNnOwV1-LWbgcb1VbN_WXBME63eeECB6xJID6YHJbHQ5Kodn8taqTLKOTHetRzTce1ZFct2EX-ndsAAf3fL8P_bLU9AgRD1zLRPIV9fD-ip5yUEKld4mB8b0-IN96NppOh7P616Cyy_ZmsnqX_TzfrIC1IF-jNnzUnFQDF0MeYyONWbEVHxO9jAzyt9NB4szptxHXaDFPlLIDt7dyWlW_EhOFjYFHDB5CQG4WEej4OMOKbKbMYXnFL6E7XHk9cp6Zv9xBYUB8qle5DLi_ZQSWdCVJv5SZbUD4t5XNMgLv-_aTEu9ojHiXNjF4mcsdpIfEdhvaQPId02xrVGce_s3Fe_mHRY-gqa8Wpam9G_O91hYxDBX_QeuqmtMZH57Z409odi5JiRSHSluOyieoQ40hYkOjC4BTWM436uYytxtsCwV70velya2509REftv2QEVcyvoPAfpf5MHcmanGK79Dni0k6VSFAuMKqvdrIU-E0IZ5btjaFJclZ8L-gujltXg6KDc5He9OBZyRJ0qlYn8NlxuWhTqA6thi3b8nf8V5WBHrhtfWuLHO8_3cvcgIMa5xmXTr3gKe05Ejs7s9LnMfEdHj2VLwPq6rAlKDhFdQRGkSvweIlHc748yp_o8ErHQuzTJH8QJcEaYVJvyRyDs";

const GAME_EVENT = JSON.stringify({
  target: "CurrentGameResultSubscribe",
  arguments: [{ GameType: 23 }],
  invocationId: "1",
  type: 1,
});

function KenoMonitor() {
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [gameHistory, setGameHistory] = useState([]); // New state for history
  const [isLoading, setIsLoading] = useState(true);
  const { lastMessage, isConnected, sendMessage } = useWebSocket(WS_URL);
  const [handshake, setHandshake] = useState(false);

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
      }, 1000);

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

              // Handle type 3: Primarily for Game Start messages
              if (parsedMessage.type === 3) {
                const items = parsedMessage.result?.data?.results?.items;
                // A type 3 message with 0 items indicates a new game is starting.
                if (Array.isArray(items) && items.length === 0) {
                  setDrawnNumbers([]);
                  setSelectedNumbers([]); // Clear selections for the new game
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
                          numbers: newNumbers.sort((a, b) => a - b),
                        };
                        return [newEntry, ...prevHistory].slice(0, 20);
                      }
                      return prevHistory;
                    });
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
      }, 250); // 250ms delay

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [lastMessage, isLoading]);

  const connectionStatus = isConnected ? "Connected" : "Disconnected";

  return (
    <div className=" bg-gray-700">
      <main className="container mx-auto p-4 border-4 border-gray-500 ">
        <div
          className={`
          p-2.5
          rounded
          mb-4
          text-center
          ${
            connectionStatus === "Disconnected"
              ? "bg-red-50 text-red-900"
              : "bg-green-50 text-green-800"
          }
        `}>
          Connection Status: {connectionStatus}
        </div>

        <div className="grid grid-cols-10 gap-1.5 mb-6 ">
          {Array.from({ length: 80 }, (_, i) => i + 1).map((number) => (
            <div
              key={number}
              onClick={() => handleNumberClick(number)}
              className={`
              w-full 
              h-11.25 
              text-white 
              text-lg 
              font-bold 
              flex 
              items-center 
              justify-center 
              rounded 
              cursor-pointer
              ${
                drawnNumbers.includes(number)
                  ? "bg-red-500"
                  : selectedNumbers.includes(number)
                    ? "bg-blue-500"
                    : "bg-black"
              }
            `}>
              {number}
            </div>
          ))}
        </div>
      </main>

      {/* Game History Section */}
      <div className="absolute right-16 top-8 mt-8 mx-8  overflow-x-auto">
        <h2 className="text-2xl text-blue-500 font-bold mb-4">Results</h2>
        <div className="space-y-4">
          {isLoading && gameHistory.length === 0 ? (
            <p className="text-gray-500">
              Waiting for the first game to complete...
            </p>
          ) : gameHistory.length > 0 ? (
            gameHistory.map((game) => (
              <div
                key={game.id}
                className="p-0 border bg-gray-50 dark:bg-gray-800">
                <h4 className="font-semibold text-lg mb-0">Game: {game.id}</h4>
                <p className="text-gray-700 dark:text-gray-300 ">
                  {game.numbers.join(", ")}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No game history yet. Completed games will appear here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default KenoMonitor;
