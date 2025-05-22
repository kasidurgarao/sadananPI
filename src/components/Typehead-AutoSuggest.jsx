import React, { useState, useEffect } from "react";

// const titles = [
//   "Apple",
//   "Banana",
//   "Cherry",
//   "Date",
//   "Mango",
//   "Melon",
//   "Papaya",
// ];

// API : https://dummyjson.com/products
const TypeheadAutoSuggest = () => {
  const [input, setInput] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    async function fetchdata() {
      try {
        let res = await fetch("https://dummyjson.com/products");
        let jsonRes = await res.json();
        setData(jsonRes.products);
        console.log(jsonRes.products);
      } catch (err) {
        console.log("Error in" + err);
      }
    }
    fetchdata();
  }, []);

  const handleInput = (e) => {
    const typed = e.target.value;
    setInput(typed);
    if (typed.length > 0) {
      const result = data
        .filter(({ title }) =>
          title.toLowerCase().includes(typed.toLowerCase())
        )
        .map((ele) => ele.title);
      setSuggest(result);
      setActiveIndex(-1);
    } else {
      setSuggest([]);
    }
  };

  const handleSelect = (title) => {
    setInput(title);
    setSuggest([]);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (suggest.length === 0) return;
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % suggest.length);
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev - 1 + suggest.length) % suggest.length);
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        handleSelect(suggest[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setInput("");
      setSuggest([]);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="flex relative">
        <input
          type="text"
          placeholder="Enter title"
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          className="border px-2 py-1 w-80"
        />
        {input && suggest.length === 0 && (
          <span
            className="absolute right-4 top-1 p-1 cursor-pointer text-gray-500"
            onClick={() => {
              setInput("");
              setSuggest([]);
              setActiveIndex(-1);
            }}
          >
            ✕
          </span>
        )}{" "}
      </div>
      {suggest.length > 0 && (
        <div className="border w-64 mt-1 bg-white shadow max-h-48 overflow-auto">
          {suggest.map((title, index) => (
            <div
              key={index}
              onClick={() => handleSelect(title)}
              className={`p-2 cursor-pointer ${
                index === activeIndex ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
            >
              {title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TypeheadAutoSuggest;
