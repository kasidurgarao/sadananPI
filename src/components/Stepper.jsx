import React, { useState } from 'react';
import { Check } from 'lucide-react'; 

let stages = ["Contact Details", "Shipping Address", "Payment", "Delivered"];
let details = [
  "Add contact details for further communications.",
  "Add your shipping address to receive the order.",
  "Complete the payment for your order.",
  "Order is ready to be delivered.",
  "Order delivered successfully.",
];

const Stepper = () => {
  const [currentStage, setCurrentStage] = useState(0);

  return (
    <div className="max-w-xl mx-auto py-6">
      <div className="flex items-center justify-between mb-6 relative">
        {stages.map((stage, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center flex-1 relative">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center font-bold z-10 border-2
                  ${idx < currentStage
                    ? "bg-green-600 text-white border-green-600"
                    : idx === currentStage
                    ? "bg-blue-700 text-white border-blue-700"
                    : "bg-white text-black border-black"}
                `}
              >
                {idx < currentStage ? <Check size={16} /> : idx + 1}
              </div>
              <div className="mt-2 text-sm text-center">{stage}</div>
            </div>
            {idx < stages.length - 1 && (
              <div className="absolute top-4 left-[calc(12.5%+1rem)] w-[calc(75%-2rem)] h-1 bg-gray-300 z-0">
                <div
                  className={`h-1 ${
                    idx < currentStage ? "bg-green-600" : ""
                  }`}
                  style={{ width: "100%" }}
                ></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="text-center font-semibold text-lg mb-6">
        {details[currentStage]}
      </div>

      <div className="flex justify-center gap-6">
        <button
          className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
          onClick={() => setCurrentStage((prev) => Math.max(prev - 1, 0))}
          disabled={currentStage === 0}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-gray-400 text-black rounded disabled:opacity-50"
          onClick={() =>
            setCurrentStage((prev) =>
              Math.min(prev + 1, stages.length)
            )
          }
          disabled={currentStage === stages.length }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Stepper;
