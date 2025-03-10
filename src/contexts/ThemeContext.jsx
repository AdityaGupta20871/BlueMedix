import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    backgroundColor: "bg-dark bg-gradient",
    sidebarStyle: "dark"
  });

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  // Predefined themes
  const themes = {
    dark: {
      backgroundColor: "bg-dark bg-gradient",
      sidebarStyle: "dark"
    },
    light: {
      backgroundColor: "bg-light",
      sidebarStyle: "light"
    },
    blue: {
      backgroundColor: "bg-primary bg-gradient",
      sidebarStyle: "blue"
    },
    transparent: {
      backgroundColor: "bg-transparent",
      sidebarStyle: "transparent"
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
}; 