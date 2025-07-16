import { useState } from 'react';

export const usePasswordStrength = () => {
  const [password, setPassword] = useState('');
  const hasNumber = /\d/;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasSpecial = /[^A-Za-z0-9]/;

  const getPasswordStrength = (text, score) => {
  const meetsAllCriteria =
    hasLowerCase.test(text) &&
    hasUpperCase.test(text) &&
    hasNumber.test(text) &&
    hasSpecial.test(text);

  if (score > 8 && meetsAllCriteria) return 'Strong';
  if (score > 5) return 'Medium';
  return 'Weak';
};


  const getPasswordScore = (text) => {
    let score = 0;
    if (text.length > 3) {
      score = Math.min(6, Math.floor(text.length / 3));
      score += +hasNumber.test(text) + +hasUpperCase.test(text) + +hasLowerCase.test(text) + +hasSpecial.test(text);
    }
    return score;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const passwordScore = getPasswordScore(password);
  const passwordStrength = getPasswordStrength(password,passwordScore);
  const passwordIndicators = {
    lowercase: hasLowerCase.test(password),
    uppercase: hasUpperCase.test(password),
    number: hasNumber.test(password),
    symbol: hasSpecial.test(password),
  };

  return [password, passwordStrength, passwordScore, passwordIndicators, handlePasswordChange];
};
