import { createContext } from "react";

const themes = {
  DARK: "dark",
  LIGHT: "light",
} as const;

type Theme = (typeof themes)[keyof typeof themes];

type ThemeContextProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  clearTheme: () => void;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export default ThemeContext;
export { themes };
export type { Theme, ThemeContextProps };
