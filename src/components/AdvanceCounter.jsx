import React, { useState } from "react";

const AdvanceCounter = () => {
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(2);
  const [incdec, setIncDec] = useState(1);
  const [lowerupper, setLowerUpper] = useState({ lower: -1000, upper: 1000 });

  const increment = () => {
    setCount((prev)=>{
        if(prev+incdec<=lowerupper.upper) return prev+incdec
        return prev
    })
  };
  const decrement = () => {
    setCount((prev) => {
        if(prev-incdec>=lowerupper.lower) return prev-incdec
        return prev
    });
  };
  const asyncincrement = () => {
    setTimeout(() => {
      setCount((prev)=>{
        if(prev+incdec<=lowerupper.upper) return prev+incdec
        return prev
    })
    }, duration * 1000);
  };
  const asyncdecremnt = () => {
    setTimeout(() => {
      setCount((prev) => {
        if(prev-incdec>=lowerupper.lower) return prev-incdec
        return prev
    });
    }, duration * 1000);
  };

  const lowerupperhandler = (e) => {
    const { name, value } = e.target;
    const numericValue = Number(value);

    setLowerUpper((prev) => {
      const updated = { ...prev };
      if (name === "lower") {
        if (numericValue <= -1 && numericValue >=-1000) {
          updated.lower = numericValue;
        }
      }
      if (name === "upper") {
        if (numericValue >= 1 && numericValue <= 1000) {
          updated.upper = numericValue;
        }
      }

      return updated;
    });
  };

  const resethandler=()=>{
    setCount(0)
    setDuration(2)
    setIncDec(1)
    setLowerUpper((prev)=>{
        let value = {...prev}
        return {...value,lower:-1000,upper:1000}
    })
  }

  return (
    <div className="flex flex-1 justify-center items-center h-screen">
      <div className="flex flex-col gap-4">
        <div>Count: {count}</div>
        <div className="flex gap-4">
          <button onClick={() => decrement()} className="border w-12">
            -
          </button>
          <button onClick={() => increment()} className="border w-12">
            +
          </button>
        </div>
        <div className="flex gap-4">
          <button onClick={() => asyncdecremnt()} className="border w-16">
            - Async
          </button>
          <button onClick={() => asyncincrement()} className="border w-16">
            + Async
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="delay">Delay</label>
            <input
              type="range"
              id="delay"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min={0}
              max={3}
              className="w-24"
            />
            {duration}s
          </div>
          <div>
            <label htmlFor="inputval">Increment/decrement by </label>
            <input
              type="text"
              id="inputval"
              value={incdec}
              className="border"
              onChange={(e) => setIncDec(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="lowerlimit">Lower Limit </label>
            <input
              type="text"
              id="lowerlimit"
              className="border"
              name="lower"
              value={lowerupper.lower}
              onChange={(e) => lowerupperhandler(e)}
            />
          </div>
          <div>
            <label htmlFor="upperlimit">Upper Lower </label>
            <input
              type="text"
              id="upperlimit"
              className="border"
              name="upper"
              value={lowerupper.upper}
              onChange={(e) => lowerupperhandler(e)}
            />
          </div>
          <button className="border" onClick={()=>resethandler()}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default AdvanceCounter;
