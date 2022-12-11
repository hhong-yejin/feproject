import React, { createContext, useState } from "react";

const DarkModeContext = createContext();

const DarkMode = (props) => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkmode"));
  let darkModeClass =
    darkMode === true || darkMode === "true" ? "dark-mode" : null;
  const darkModeBtn = (e) => {
    localStorage.setItem("darkmode", e);
    setDarkMode(e);
  };

  if (localStorage.getItem("darkmode") === null) {
    const { matches } = window.matchMedia("(prefers-color-scheme: dark)");
    localStorage.setItem("darkmode", matches);
    setDarkMode(localStorage.getItem("darkmode") === "true");
  }

  return (
    <DarkModeContext.Provider value={{ darkMode, darkModeBtn, darkModeClass }}>
      {props.children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext, DarkMode };
