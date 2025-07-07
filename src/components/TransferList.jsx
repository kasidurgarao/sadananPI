import { useState } from 'react';

function TransferList() {
  const [leftSide, setLeftSide] = useState(["java", "Python", "C++", "JS"]);
  const [rightSide, setRightSide] = useState(["HTML", "CSS", "ReactJS", "VueJS"]);
  const [selectedLeft, setSelectedLeft] = useState([]);
  const [selectedRight, setSelectedRight] = useState([]);

  const moveAllRight = () => {
    setRightSide(prev => [...prev, ...leftSide]);
    setLeftSide([]);
    setSelectedLeft([]);
  };

  const moveAllLeft = () => {
    setLeftSide(prev => [...prev, ...rightSide]);
    setRightSide([]);
    setSelectedRight([]);
  };

  const moveRight = () => {
    const selectedItems = selectedLeft.map(idx => leftSide[idx]);
    setRightSide(prev => [...prev, ...selectedItems]);
    setLeftSide(prev => prev.filter((_, idx) => !selectedLeft.includes(idx)));
    setSelectedLeft([]);
  };

  const moveLeft = () => {
    const selectedItems = selectedRight.map(idx => rightSide[idx]);
    setLeftSide(prev => [...prev, ...selectedItems]);
    setRightSide(prev => prev.filter((_, idx) => !selectedRight.includes(idx)));
    setSelectedRight([]);
  };

  const toggleSelectLeft = (idx) => {
    setSelectedLeft(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const toggleSelectRight = (idx) => {
    setSelectedRight(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="flex justify-center items-center h-screen gap-4">
      {/* Left Side List */}
      <div>
        {leftSide.map((ele, idx) => (
          <div key={idx}>
            <input
              type="checkbox"
              checked={selectedLeft.includes(idx)}
              onChange={() => toggleSelectLeft(idx)}
              className="mr-2"
            />
            <label>{ele}</label>
          </div>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex flex-col gap-2">
        <button onClick={moveAllRight} className="border px-2 py-1">MoveAllRight</button>
        <button onClick={moveRight} disabled={selectedLeft.length === 0} className="border px-2 py-1 disabled:opacity-50">
          MoveRight
        </button>
        <button onClick={moveLeft} disabled={selectedRight.length === 0} className="border px-2 py-1 disabled:opacity-50">
          MoveLeft
        </button>
        <button onClick={moveAllLeft} className="border px-2 py-1">MoveAllLeft</button>
      </div>

      {/* Right Side List */}
      <div>
        {rightSide.map((ele, idx) => (
          <div key={idx}>
            <input
              type="checkbox"
              checked={selectedRight.includes(idx)}
              onChange={() => toggleSelectRight(idx)}
              className="mr-2"
            />
            <label>{ele}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransferList;
