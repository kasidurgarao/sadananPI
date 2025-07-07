import React, { useEffect, useState } from "react";

const ColumnTable = () => {
  const [row, setRow] = useState(2);
  const [col, setCol] = useState(2);
  const [matrix, setMatrix] = useState([]);
  useEffect(() => {
    const setRomCol = () => {
      let temp = Array.from({ length: row }, () => new Array(col).fill(0));
      console.log("init", temp);
      let num = 1;
      for (let c = 0; c < col; c++) {
        if (c % 2 === 0) {
          for (let r = 0; r < row; r++) {
            temp[r][c] = num++;
          }
        } else {
          for (let r = row - 1; r >= 0; r--) {
            temp[r][c] = num++;
          }
        }
      }
      console.log(temp);
      setMatrix(temp);
    };
    setRomCol();
  }, [row, col]);
  return (
    <div className="flex justify-center mt-4 flex-col items-center">
      <div className="flex gap-4">
        <div>
        <label htmlFor="row">Row</label>
        <input
          type="range"
          id="row"
          min={0}
          max={5}
          onChange={(e) => setRow(Number(e.target.value))}
          value={row}
        />
        </div>
        <div>
        <label htmlFor="col">Col</label>
        <input
          type="range"
          id="col"
          min={0}
          max={5}
          onChange={(e) => setCol(Number(e.target.value))}
          value={col}
        />
        </div>
      </div>
      <div>
        {matrix.map((row, idx) => (
            <div className="flex">
          {row.map((ele, index) => <div className="w-10 h-10 border text-center">{ele}</div>)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnTable;
