import { useEffect, useState } from "react";

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

const StatusBar = () => {
  const [inp, setInp] = useState();
  const [wid, setWid] = useState(0);
  let debounceVal = useDebounce(inp, 2000);
  const inputhandler = (e) => {
    let value = Number(e.target.value);
    let result = Math.max(0, Math.min(100, value));
    setInp(result);
  };
  useEffect(() => {
    setWid(inp);
  }, [debounceVal]);
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <input
        type="text"
        value={inp}
        className="border"
        onChange={inputhandler}
      />
      <div className="border w-96 h-4 rounded-full overflow-hidden">
        {wid > 0 && (
          <div
            className="border h-4  bg-amber-800 transition-all duration-500"
            style={{ width: `${wid}%` }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default StatusBar;
