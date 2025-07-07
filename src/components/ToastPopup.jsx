import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ToastPopup = () => {
  const [leftRightSides, setLeftRightSides] = useState("Right");
  const [topBottomSides, setTopBottomSides] = useState("Top");
  const [toastType, setToastType] = useState("Normal");
  const [input, setInput] = useState("This is a toast msg!");
  const [duration, setDuration] = useState(5);
  const [toasts, setToasts] = useState([]);

  const toasthandler = () => {
    const id = uuidv4();
    const newToast = {
      id,
      msg: input,
      type: toastType,
      position: { vertical: topBottomSides, horizontal: leftRightSides },
    };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      console.log("Auto removed toast:", id);
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration * 1000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getPositionClasses = () => {
    const vertical = topBottomSides === "Top" ? "top-5" : "bottom-5";
    const horizontal = leftRightSides === "Left" ? "left-5" : "right-5";
    return `fixed z-50 ${vertical} ${horizontal} flex flex-col gap-3`;
  };

  const getTypeClass = (type) => {
    switch (type) {
      case "Success":
        return "bg-green-500";
      case "Error":
        return "bg-red-500";
      case "Warning":
        return "bg-yellow-500";
      case "Info":
        return "bg-blue-500";
      default:
        return "bg-gray-800";
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 justify-center mt-10">
      <select
        className="border w-60 p-2"
        value={leftRightSides}
        onChange={(e) => setLeftRightSides(e.target.value)}
      >
        <option value="Left">Left</option>
        <option value="Right">Right</option>
      </select>

      <select
        className="border w-60 p-2"
        value={topBottomSides}
        onChange={(e) => setTopBottomSides(e.target.value)}
      >
        <option value="Top">Top</option>
        <option value="Bottom">Bottom</option>
      </select>

      <select
        className="border w-60 p-2"
        value={toastType}
        onChange={(e) => setToastType(e.target.value)}
      >
        <option value="Normal">Normal</option>
        <option value="Success">Success</option>
        <option value="Error">Error</option>
        <option value="Warning">Warning</option>
        <option value="Info">Info</option>
      </select>

      <input
        type="text"
        className="border w-60 p-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex items-center gap-2">
        <label>Duration (s):</label>
        <input
          type="range"
          min={1}
          max={10}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
        <span>{duration}s</span>
      </div>

      <button
        className="border bg-amber-800 text-white px-6 py-2 rounded-2xl"
        onClick={toasthandler}
      >
        Show Toast
      </button>

      {/* Toast Container */}
      <div className={getPositionClasses()}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`text-white px-4 py-2 rounded shadow flex justify-between items-center min-w-[200px] max-w-[300px] ${getTypeClass(
              toast.type
            )} animate-slideIn`}
          >
            <span>{toast.msg}</span>
            <button
              className="ml-3 text-white font-bold"
              onClick={() => removeToast(toast.id)}
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToastPopup;
