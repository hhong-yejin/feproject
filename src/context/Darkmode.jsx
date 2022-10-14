import React, { createContext, useState } from "react";

const DarkModeContext = createContext();

const DarkMode = (props) => {
  const [darkMode, setDarkMode] = useState(false);
  const darkModeBtn = () => {
    setDarkMode(!darkMode);
  };
  const darkModeClass = darkMode ? "dark-mode" : "light-mode";
  return (
    <DarkModeContext.Provider value={{ darkMode, darkModeBtn, darkModeClass }}>
      {props.children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext, DarkMode };
