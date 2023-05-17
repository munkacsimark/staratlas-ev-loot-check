import { useState, FunctionComponent, PropsWithChildren } from "react";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import ThemeContext, { LOCAL_STORAGE_THEME_KEY, themes } from "./themeContext";
import type { Theme } from "./themeContext";

// gets theme from localStorage or from system
const getTheme = () =>
  localStorage.theme === themes.DARK ||
  (!(LOCAL_STORAGE_THEME_KEY in localStorage) &&
    window.matchMedia(`(prefers-color-scheme: ${themes.DARK})`).matches)
    ? themes.DARK
    : themes.LIGHT;

const ThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getTheme());

  const setTheme = (theme: Theme) => {
    localStorage.theme = theme;
    setCurrentTheme(theme);
  };

  const clearTheme = () => {
    localStorage.removeItem(LOCAL_STORAGE_THEME_KEY);
    setCurrentTheme(getTheme());
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
