// components/SeatDisplay.js
import React, { useContext } from "react";
import { SeatContext } from "./SeatContext";
import { useNavigate } from "react-router-dom";

const SeatDisplay = () => {
  const { storeSeats } = useContext(SeatContext);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center flex-col h-screen items-center">
      <h2 className="text-xl font-bold mb-4">Selected Seats</h2>
      <p>Number of seats: {storeSeats.length}</p>
      <div className=" flex gap-4 mt-2 text-2xl font-bold">
        <p className="font-bold text-xl">Selected Seats :</p>
        {storeSeats.map((seat, idx) => (
          <h5 key={idx}>{seat}</h5>
        ))}
      </div>
      <div className="flex gap-6">
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white"
          onClick={() => navigate("/")}
        >
          Modification
        </button>
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white">Final</button>
      </div>
    </div>
  );
};

export default SeatDisplay;
