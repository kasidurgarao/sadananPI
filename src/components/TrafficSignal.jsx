import React, { useEffect, useState } from "react";

const TrafficSignal = () => {
  const [signal, setSignal] = useState("Red");
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    if (timer === 0) {
      if (signal === "Red") {
        setSignal("Green");
        setTimer(4);
      } else if (signal === "Green") {
        setSignal("Yellow");
        setTimer(3);
      } else if (signal === "Yellow") {
        setSignal("Red");
        setTimer(5);
      }
    }

    return () => clearInterval(interval); 
  }, [timer, signal]);

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-32 h-96 bg-gray-700 flex flex-col justify-around items-center rounded-lg p-4">
        <div
          className={`w-20 h-20 rounded-full ${
            signal === "Red" ? "bg-red-500" : "bg-black"
          }`}
        ></div>
        <div
          className={`w-20 h-20 rounded-full ${
            signal === "Yellow" ? "bg-yellow-400" : "bg-black"
          }`}
        ></div>
        <div
          className={`w-20 h-20 rounded-full ${
            signal === "Green" ? "bg-green-500" : "bg-black"
          }`}
        ></div>
        <div className="text-white text-lg mt-4">{signal} ({timer})</div>
      </div>
    </div>
  );
};

export default TrafficSignal;
