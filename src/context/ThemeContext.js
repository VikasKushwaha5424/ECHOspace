import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
export const ThemeContext = createContext();

// Create a custom hook to use the context easily
export const useTheme = () => useContext(ThemeContext);

// Create the provider component
export const ThemeContextProvider = ({ children }) => {
  // Default to 'light' or get preference from localStorage
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  // Effect to update the body class and localStorage when theme changes
  useEffect(() => {
    document.body.className = ''; // Clear existing classes
    document.body.classList.add(theme); // Add the current theme class
    localStorage.setItem('theme', theme); // Save preference
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
