// SeatContext.js
import React, { createContext, useState } from "react";

export const SeatContext = createContext();

export const SeatProvider = ({ children }) => {
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [storeSeats, setStoreSeats] = useState([]);

  return (
    <SeatContext.Provider
      value={{ numberOfSeats, setNumberOfSeats, storeSeats, setStoreSeats }}
    >
      {children}
    </SeatContext.Provider>
  );
};
