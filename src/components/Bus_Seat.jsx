
import React, { useState } from "react";

const rows = 10; // Number of rows
const seatsPerRow = ["A", "B", "C", "D"]; // Seat labels

const BusSeatSelector = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = () => {
    let seatLayout = [];

    for (let i = 1; i <= rows; i++) {
      seatLayout.push(
        <div key={i} className="flex gap-4 mb-2">
          {seatsPerRow.map((letter, idx) => {
            const seatId = `${i}${letter}`;
            const isSelected = selectedSeats.includes(seatId);

            return (
              <div
                key={seatId}
                onClick={() => toggleSeat(seatId)}
                className={`w-10 h-10 flex items-center justify-center border rounded cursor-pointer ${
                  isSelected ? "bg-green-500 text-white" : "bg-gray-200"
                }`}
              >
                {seatId}
              </div>
            );
          })}
        </div>
      );
    }

    return seatLayout;
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Bus Seat Selection</h2>
      <div>{renderSeats()}</div>

      {selectedSeats.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Selected Seats:</h3>
          <p>{selectedSeats.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default BusSeatSelector;
