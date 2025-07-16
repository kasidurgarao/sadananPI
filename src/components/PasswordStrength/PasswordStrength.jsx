import React from 'react';
import { usePasswordStrength } from './usePasswordStrength';

const PasswordStrength = () => {
  const [password, strength, score, indicators, handleChange] = usePasswordStrength();

  const getBarColor = () => {
    if (score > 8) return 'bg-green-600';
    if (score > 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };


  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gray-100 p-6">
      <input
        type="text"
        placeholder="Enter the password"
        // maxLength={16}
        value={password}
        onChange={handleChange}
        className="border px-3 py-2 rounded-md w-80 text-sm outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex gap-4 text-sm">
        <span className={indicators.lowercase ? "text-green-600" : "text-gray-400"}>Lowercase</span>
        <span className={indicators.uppercase ? "text-green-600" : "text-gray-400"}>Uppercase</span>
        <span className={indicators.number ? "text-green-600" : "text-gray-400"}>Number</span>
        <span className={indicators.symbol ? "text-green-600" : "text-gray-400"}>Symbol</span>
      </div>

      <div className="w-80 h-4 rounded-full bg-gray-300 overflow-hidden">
        <div
          className={`h-full ${getBarColor()} transition-all duration-300`}
          style={{ width: `${score * 10}%` }}
        ></div>
      </div>

      <p className="text-sm">Password has <strong>{password.length}</strong> characters</p>
      <p className="text-sm">Your password is <strong>{strength}</strong></p>
    </div>
  );
};

export default PasswordStrength;
