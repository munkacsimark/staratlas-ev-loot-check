const LOCAL_STORAGE_THEME_KEY = "theme";
const THEME_ATTRIBUTE_NAME = "data-theme";

const themes = {
  DARK: "dark",
  LIGHT: "light",
} as const;

type Theme = (typeof themes)[keyof typeof themes];

const getTheme = () =>
  localStorage.theme === themes.DARK ||
  (!(LOCAL_STORAGE_THEME_KEY in localStorage) &&
    window.matchMedia(`(prefers-color-scheme: ${themes.DARK})`).matches)
    ? themes.DARK
    : themes.LIGHT;

const updateThemeOnDocument = () =>
  getTheme() === themes.DARK
    ? document.documentElement.setAttribute(THEME_ATTRIBUTE_NAME, themes.DARK)
    : document.documentElement.removeAttribute(THEME_ATTRIBUTE_NAME);

const setTheme = (theme: Theme) => {
  localStorage.theme = theme;

  updateThemeOnDocument();
};

const clearTheme = () => {
  localStorage.removeItem("theme");
  updateThemeOnDocument();
};

const watchForThemeChange = () => {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", updateThemeOnDocument);
};

const stoptWatchingForThemeChange = () => {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .removeEventListener("change", updateThemeOnDocument);
};

export {
  themes,
  getTheme,
  setTheme,
  clearTheme,
  watchForThemeChange,
  stoptWatchingForThemeChange,
  updateThemeOnDocument,
};
