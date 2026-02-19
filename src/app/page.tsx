"use client";

import React, { useState, useEffect } from "react";
import { useWebSocket } from "./hooks/useWebSocket";
import Value from "../../results.json";

const WS_URL =
  "wss://tvbetframe.com/proxy-game/game?default-client=5730&access_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IkQyNTk5NTU5REMxNkI5NkZGNkU5OTI2NkQ2MTdBMDgyQjk2MjdDNUEiLCJ0eXAiOiJKV1QiLCJ4NXQiOiIwbG1WV2R3V3VXXzI2WkptMWhlZ2dybGlmRm8ifQ.eyJuYmYiOjE3NzE1MDgyMDksImV4cCI6MTc3MTUxMDAwOSwiaXNzIjoiaHR0cHM6Ly9hcGkubmV0L2lkZW50aXR5LWFwaS8iLCJhdWQiOlsiYmV0cy1hcGkiLCJmZWVkcy1hcGkiLCJzaWduYWxyLWZlZWQtYXBpIiwiZXh0ZXJuYWwtY2xpZW50LWFwaSIsInBhcnRuZXJzLWFwaSIsIndlYiIsInNpZ25hbHItYXBpIiwiY2hhdHMtc2lnbmFsci1hcGkiLCJwcm9tb2NvZGVzLWFwaSIsImh0dHBzOi8vYXBpLm5ldC9pZGVudGl0eS1hcGkvcmVzb3VyY2VzIl0sInRva2VuIjoiIiwidXNlcl9wYXJhbWV0ZXJzIjoie1widXNlcl9pZFwiOjQyMzQxMjk5LFwicGFydG5lcl9jbGllbnRfaWRcIjo1NzMwLFwidXNlcl9pc3Rlc3RcIjp0cnVlLFwiY3VycmVuY3lfY29kZVwiOlwiRVVSXCIsXCJsYW5ndWFnZVwiOlwiZW5cIixcInVzZXJfcmVnaXN0cmF0aW9uX2RhdGVcIjpcIjIwMjYtMDItMTlUMTM6MzY6NDlaXCIsXCJ0YWdfaWRcIjpudWxsLFwidXNlcl9jbHVzdGVyXCI6bnVsbCxcInBhcnRuZXJfY2xpZW50X2NsdXN0ZXJcIjpcIkxvd1wiLFwiY291bnRyeV9uYW1lXCI6XCJuelwiLFwiZGV2aWNlX25hbWVcIjpcIlwiLFwiZGV2aWNlX29zXCI6XCJXaW5kb3dzXCIsXCJkZXZpY2VfdHlwZVwiOlwiRGVza3RvcFwiLFwiZGV2aWNlX2Jyb3dzZXJcIjpcIkNocm9tZVwiLFwicGFydG5lcl9pZHNcIjpbNDc5NiwyMDAyNDFdLFwidmlzaXRvcl9pZFwiOlwiNDIzNDEyOTlcIn0iLCJ1c2VyX3Nlc3Npb25faWQiOiJjN2ZhZjQ4ZS0wZTg3LTRkNzYtYmU0Mi0wYTk2MDljMWQyMDciLCJyb2xlIjoiUGFydG5lclVzZXIiLCJwYXJ0bmVyX2NsaWVudF9pZCI6IjU3MzAiLCJwYXJ0bmVyX3VzZXJfaWQiOiJuODAyc3FwZWt0LVR2QmV0LURlbW9TaXRlLVVzZXItQkVULUVVUiIsImN1cnJlbmN5X2NvZGUiOiJFVVIiLCJjbGllbnRfaWQiOiJQYXJ0bmVyQ2xpZW50VXNlci01NzMwLW44MDJzcXBla3QtVHZCZXQtRGVtb1NpdGUtVXNlci1CRVQtRVVSIiwidXNlcl9pZCI6IjQyMzQxMjk5Iiwic2NvcGUiOlsiYmV0cy1hcGkiLCJmZWVkcy1hcGkiLCJzaWduYWxyLWZlZWQtYXBpIiwiZXh0ZXJuYWwtY2xpZW50LWFwaSIsInBhcnRuZXJzLWFwaSIsIndlYiIsInNpZ25hbHItYXBpIiwiY2hhdHMtc2lnbmFsci1hcGkiLCJwcm9tb2NvZGVzLWFwaSJdfQ.0fzEbT2TXZJUcABM53Po6qsa7wMZnTapeeeVJOeg8iBg-3WQ_N_JGvzZZG9wYcEDCqLD9hM8xgmhnRdiYUoCBMvWPagGHehms-oirEWWT5SqIMjmCWrKWLY5BM-Qo5OBHBd8afYqHvtci2HsJm4MmJY5odo4BuNH2MinYExzUx0i8Ic7J7CM1TkoToGLwCNePvQA98kI0ylAK5Zr2O90IcUD-jz7H8jAPMTQ9EBLZevXHz2HcP-qGEUiVkddyqWrkhdE0yoyY07gCn7YwJdTczTDwA_Jg2FqibyCO0oidq9LzApnAAiXuQ5FJOnQPq-higuiJwIjrbWmZ3t0ifwuSvc72SIoxeCFPuDBoQ1aNYPlNqK90fiEIS9qMYWC2NwVhotU8EUQGjLkHO-PYHwmrH-b9lD-Tei19mUM01dd2e03Vzk--O0D7pkhskBH97ZYgFcJ4Z0tPoiFxBKYmgj2hEy0vcaM5H5dO2Q_fEpXJYTo29c_RRHOB4780k66cD8r04SZG7qWQHqf2_k4lPM8yE5KV_Anu6y1opQs3HXdl8dmDwUlORSRdxIGvgDMTS96Kjggl2c-kD04WadttRERnNCnWeU3uwgHYo60gLidcg2kbuaNlNAI7zjxyRNhxzpyR_Wd-1x94hh8yF42dPkwWcXDvlKfG-Dh88FY6dKTylk";

const SUBSCRIBE = JSON.stringify({
  target: "CurrentGameStateSubscribe",
  arguments: [{ GameType: 23 }],
  invocationId: "0",
  type: 1,
});

const GAME_EVENT = JSON.stringify({
  target: "CurrentGameResultSubscribe",
  arguments: [{ GameType: 23 }],
  invocationId: "1",
  type: 1,
});

export default function Home() {
  const [socketData, setSocketData] = useState<any>(null);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const { lastMessage, isConnected, sendMessage } = useWebSocket(WS_URL);
  const [handshake, setHandshake] = useState(false);
  const [results, setResults] = useState(Value);

  useEffect(() => {
    if (isConnected && !handshake) {
      sendMessage(JSON.stringify({ protocol: "json", version: 1 }) + "\u001e");
      sendMessage(GAME_EVENT);
      setHandshake(true);
    }
  }, [isConnected, handshake, sendMessage]);

  // Heartbeat
  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        sendMessage(JSON.stringify({ type: 6 }) + "\u001e");
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isConnected, sendMessage]);

  useEffect(() => {
    if (lastMessage) {
      try {
        const messages = (lastMessage as MessageEvent).data.split("\u001e");
        messages.forEach((message: string) => {
          if (message) {
            const result = JSON.parse(message);
            if (result.arguments) {
              const items = result.arguments[0]?.data?.results;
              if (items) {
                setSocketData(items);
              }
            }
          }
        });
      } catch (e) {
        console.error("Error parsing WebSocket message:", e);
      }
    }
  }, [lastMessage]);
  const valueString = Value.value.Value.GameResults[0].Value;

  // useEffect(() => {
  //   if (socketData && Array.isArray(socketData)) {
  //     const numbers = (socketData as any[])
  //       .map((item: any) => item.value || item.number || item.result)
  //       .filter((n) => n !== undefined);
  //     if (numbers.length > 0) {
  //       setDrawnNumbers(numbers);
  //     }
  //   }
  // }, [socketData]);
  // useState(() => {
  // if (results && Array.isArray(results)) {
  //   const resultsArray = (<results className="json"></results>map.((results: Value) => results.value

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {isConnected ? (
          <div className="text-center">
            <p className="text-green-500 mb-2">WebSocket Connected!</p>
            {socketData && (
              <div>
                <h3 className="text-lg mb-2">Data:</h3>

                <div className="whitespace-normal font-semibold text-sm overflow-auto wrap-break-word">
                  {JSON.stringify(socketData, null, 2)}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-red-500 mb-2">Connecting to WebSocket...</p>
          </div>
        )}

        {}
        <div className="grid grid-cols-10 gap-1 mb-8 w-full justify-center">
          {Array.from({ length: 80 }, (_, i) => i + 1).map((number) => (
            <div
              key={number}
              className={`flex items-center justify-center rounded text-white font-bold text-lg h-12 ${
                drawnNumbers.includes(number) ? "bg-red-500" : "bg-black"
              }`}>
              {number}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
