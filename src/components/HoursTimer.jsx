import React, { useState, useRef } from "react";

const HoursTimer = () => {
  const [time, setTime] = useState({ hour: 0, min: 0, sec: 0 });
  const intervalRef = useRef(null);

  const startHandler = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        let { hour, min, sec } = prev;
        sec++;
        if (sec === 60) {
          sec = 0;
          min++;
        }
        if (min === 60) {
          min = 0;
          hour++;
        }
        return { hour, min, sec };
      });
    }, 1000);
  };

  const stopHandler = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const resetHandler = () => {
    stopHandler();
    setTime({ hour: 0, min: 0, sec: 0 });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <div className="font-bold text-3xl flex gap-2">
        <h1>{String(time.hour).padStart(2, '0')}</h1>:
        <h1>{String(time.min).padStart(2, '0')}</h1>:
        <h1>{String(time.sec).padStart(2, '0')}</h1>
      </div>
      <div className="flex gap-2">
        <button className="border w-20" onClick={startHandler}>Start</button>
        <button className="border w-20" onClick={stopHandler}>Stop</button>
        <button className="border w-20" onClick={resetHandler}>Reset</button>
      </div>
    </div>
  );
};

export default HoursTimer;
