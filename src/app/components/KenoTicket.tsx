import React from "react";
import { useWebSocket } from "./hooks/useWebSocket";

interface KenoTicketProps {
  ticketId?: string;
  selectedNumbers?: number[];
  hitsCount?: number;
  drawnNumbers?: number[];
}

const KenoTicket = (props: KenoTicketProps) => {
  const {
    ticketId = "N/A",
    selectedNumbers = [],
    hitsCount = 0,
    drawnNumbers = [],
  } = props;

  return (
    <div className="bg-slate-700/80 p-3 rounded-lg w-full shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h5 className="font-bold text-sm text-amber-300 uppercase">
          Ticket {ticketId}
        </h5>
        <p className="text-xs font-bold text-white bg-green-800/70 px-2 py-1 rounded-full">
          Hits: {hitsCount}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedNumbers.length > 0 ? (
          selectedNumbers.map((num) => {
            const isDrawn = drawnNumbers.includes(num);
            return (
              <span
                key={num}
                className={`
                  font-mono font-bold px-2.5 py-1 text-xs rounded-md
                  transition-colors duration-300
                  ${
                    isDrawn
                      ? "bg-sky-400 text-black"
                      : "bg-slate-800 text-gray-300"
                  }
                `}>
                {num}
              </span>
            );
          })
        ) : (
          <p className="text-xs text-gray-400 italic">Empty ticket</p>
        )}
      </div>
    </div>
  );
};

export default KenoTicket;
