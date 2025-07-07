import React, { useState } from "react";

const Box = ({ row, col, selectedTile, onClick }) => {
  let bgColor = (row + col) % 2 === 0 ? "bg-white" : "bg-black";

  if (selectedTile) {
    const isDiagonal =
      row - col === selectedTile.row - selectedTile.col ||
      row + col === selectedTile.row + selectedTile.col;
    const isClicked = row === selectedTile.row && col === selectedTile.col;

    if (isDiagonal) bgColor = "bg-red-500";
    if (isClicked) bgColor = "bg-red-800";
  }

  return (
    <button
      className={`flex-1 h-full ${bgColor} focus:outline-none transition-colors duration-300`}
      data-row={row}
      data-col={col}
      onClick={onClick}
    ></button>
  );
};

const gridSize = 8;

const Chessboard = () => {
  const [selectedTile, setSelectedTile] = useState(null);

  const colorDiagonally = (e) => {
    const target = e.target;
    setSelectedTile({
      row: Number(target.dataset.row),
      col: Number(target.dataset.col),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <p className="mb-4 text-lg font-semibold">
        Click on any cell to color diagonally
      </p>
      <div className="flex flex-col border-4 border-black w-[min(90vw,90vh)] h-[min(90vw,90vh)]">
        {Array.from({ length: gridSize }, (_, row) => (
          <div className="flex flex-1" key={row}>
            {Array.from({ length: gridSize }, (_, col) => (
              <Box
                key={col}
                row={row}
                col={col}
                selectedTile={selectedTile}
                onClick={colorDiagonally}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chessboard;
