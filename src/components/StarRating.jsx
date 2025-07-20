import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const n = 6;

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(null);

  return (
    <div className="flex justify-center items-center mt-6">
      {Array.from({length:n},(_,idx) => (
        <div
          key={idx}
          className="w-10 h-10 cursor-pointer"
          onClick={() => setRating(idx + 1)}
          onMouseEnter={() => setHovered(idx + 1)}
          onMouseLeave={() => setHovered(null)}
        >
          <FaStar
            className={`w-full h-full ${
              (hovered || rating) > idx ? 'text-yellow-400' : 'text-gray-400'
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default StarRating;
