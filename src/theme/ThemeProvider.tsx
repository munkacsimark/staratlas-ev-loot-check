import { useState, FunctionComponent, PropsWithChildren } from "react";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import ThemeContext, { themes } from "./themeContext";
import {
  LOCAL_STORAGE_THEME_KEY,
  removeTheme,
  saveTheme,
  getTheme,
} from "../localStorage";
import type { Theme } from "./themeContext";

// gets theme from localStorage or from system
const getCurrentTheme = () =>
  getTheme() === themes.DARK ||
  (!(LOCAL_STORAGE_THEME_KEY in localStorage) &&
    window.matchMedia(`(prefers-color-scheme: ${themes.DARK})`).matches)
    ? themes.DARK
    : themes.LIGHT;

const ThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getCurrentTheme());

  const setTheme = (theme: Theme) => {
    saveTheme(theme);
    setCurrentTheme(theme);
  };

  const clearTheme = () => {
    removeTheme();
    setCurrentTheme(getCurrentTheme());
  };

  return (
    <ThemeContext.Provider
      value={{ theme: currentTheme, setTheme, clearTheme }}
    >
      <GeistProvider themeType={currentTheme}>
        <CssBaseline />
        {children}
      </GeistProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
