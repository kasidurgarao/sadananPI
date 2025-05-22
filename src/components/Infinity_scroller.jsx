import React, { useEffect, useState } from "react";

const PAGE_NUMBER = 1;

function Infinity_scroller() {
  const [page, setPage] = useState(PAGE_NUMBER);
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        let res = await fetch(
          `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`
        );
        let result = await res.json();
        setData(prev => [...prev, ...result.products]);
      } catch (err) {
        console.log("API request failed: " + err);
      }
      setLoading(false)
    };
    fetchData();
  }, [page]);

  const scrollToEnd = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop  ===
        document.documentElement.scrollHeight
      ) {
        scrollToEnd();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="alignment">
      {data.length > 0 &&
        data.map((ele, i) => (
          <div key={i} style={{ padding: "50px", borderBottom: "1px solid #ccc" }}>
            {ele.title}
          </div>
        ))}
        {
          loading && <div>Loading...</div>
        }
    </div>
  );
}

export default Infinity_scroller;
