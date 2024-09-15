import { ThemeProvider } from "@mui/material";
import { useState, createContext, useEffect, useContext } from "react";
import { darkTheme, lightTheme } from "../theme";

// Define the ThemeContext
const ThemeContext = createContext({
  mode: "light",
  handleSetTheme: (newMode) => {
    return newMode;
  },
});
export const useThemeContext = () =>{
    return useContext(ThemeContext);
}
const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const themeMap = {
    light: lightTheme,
    dark: darkTheme,
  };

  const handleSetTheme = (newMode) => {
    setMode(newMode);
    localStorage.setItem("chatAppTheme", newMode);
  };
  useEffect(() => {
    const localMode = localStorage.getItem("chatAppTheme");
    if (localMode) {
      setMode(localMode);
    } else {
      setMode("dark");
    }
  }, []);
  return (
    <ThemeContext.Provider value={{ mode, handleSetTheme }}>
      <ThemeProvider theme={themeMap[mode]}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
