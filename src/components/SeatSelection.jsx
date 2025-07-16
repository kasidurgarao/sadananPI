// components/SeatSelection.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SeatContext } from "./SeatContext";

const SeatSelection = () => {
  const alpha = ["A", "B", "C", "D", "E", "F"];
  const { numberOfSeats, setNumberOfSeats, storeSeats, setStoreSeats } =
    useContext(SeatContext);

  const navigate = useNavigate();

  const seatSelectHandler = (row, col) => {
    const seatId = `${row}${alpha[col]}`;
    if (storeSeats.includes(seatId)) {
      setStoreSeats(storeSeats.filter((seat) => seat !== seatId));
    } else if (storeSeats.length < numberOfSeats) {
      setStoreSeats([...storeSeats, seatId]);
    }
  };

  const numberOfSeatHandler = (e) => {
    const val = parseInt(e.target.value);
    setNumberOfSeats(val);
    setStoreSeats([]);
  };

  const nexthandler = () => {
    if (storeSeats.length === numberOfSeats) {
      navigate("/seats");
    }
  };

  return (
    <div className="h-screen w-full p-4">
      <div className="flex flex-col gap-8 h-full w-screen items-center">
        <div>
          <label htmlFor="seats" className="text-2xl font-bold mr-4">
            Select No Seats
          </label>
          <select
            id="seats"
            onChange={numberOfSeatHandler}
            value={numberOfSeats}
            className="w-20 border-2 text-3xl font-extrabold"
          >
            {/* <option value="0">Select</option> */}
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-6 ml-6">
          {alpha.map((chr, idx) => (
            <div key={idx} className={`${idx === 3 ? "ml-6" : ""} `}>
              {chr}
            </div>
          ))}
        </div>

        <div>
          {Array.from({ length: 10 }, (_, rowIdx) => (
            <div
              key={rowIdx}
              className={`flex items-center gap-1 mb-2 ${
                rowIdx === 7 ? "mb-6" : ""
              }`}
            >
              <span className="w-6 text-right mr-2">{rowIdx}</span>
              {Array.from({ length: 6 }, (_, colIdx) => {
                const seatId = `${rowIdx}${alpha[colIdx]}`;
                const isSelected = storeSeats.includes(seatId);
                return (
                  <div
                    key={colIdx}
                    onClick={() => seatSelectHandler(rowIdx, colIdx)}
                    className={`
                      w-8 h-8 border border-black text-center p-1 text-gray-600 text-sm
                      ${colIdx === 3 ? "ml-4" : ""} 
                      ${isSelected ? "bg-green-500" : "bg-gray-300"}
                      cursor-pointer
                      transition duration-200
                    `}
                    title={seatId}
                  >
                    {seatId}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div>
          <button
            className={`border px-4 py-1 rounded transition 
            ${
              storeSeats.length === numberOfSeats
                ? "bg-blue-500 text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
            }
          `}
            disabled={storeSeats.length !== numberOfSeats}
            onClick={nexthandler}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
