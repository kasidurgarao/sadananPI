import React, { useEffect, useState } from "react";

function Pagination() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalpages, setTotalPages] = useState(0);
  async function fetchData() {
    let result = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`
    );
    let res = await result.json();
    if (res && res.products) {
      setData(res.products);
      setTotalPages(Math.floor(res.total / 10));
    }
  }
  useEffect(() => {
    fetchData();
  }, [page]);
  return (
    <div className="flex flex-wrap justify-start w-auto">
      {data.length > 0 &&
        data.map((ele, index) => {
          return (
            <div key={index} className="w-1/3 p-2 ">
              <div className="flex flex-col items-center border p-2">
                <img
                  src={ele.thumbnail}
                  alt={ele.title}
                  className="h-24 object-cover"
                />
                <span className="mt-2 text-center">{ele.title}</span>
              </div>
            </div>
          );
        })}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center bg-white py-2 z-10 shadow-md">
        {totalpages > 0 &&
          [...Array(totalpages)].map((_, index) => {
            return (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`cursor-pointer border pl-4 pr-4 mb-4 ${page === index+1 ? "bg-blue-500":"bg-white"}`}
              >
                {index + 1}
              </button>
            );
          })}
      </div>
    </div>
  );
}

export default Pagination;
