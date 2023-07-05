import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

interface ThemeToggleButtonProps {
  isDarkTheme: boolean;
  onToggleTheme: () => void;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  isDarkTheme,
  onToggleTheme,
}) => {
  return (
    <button
      onClick={onToggleTheme}
      className="fixed bottom-4 right-4 p-2 rounded-full bg-gray-300 dark:bg-gray-700 text-yellow-500 dark:text-yellow-300"
    >
      {isDarkTheme ? <FaSun size={20} /> : <FaMoon size={20} color="#6B46C1" />}
    </button>
  );
};

export default ThemeToggleButton;
