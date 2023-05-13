import { useEffect } from "react";
import {
  updateThemeOnDocument,
  watchForThemeChange,
  stoptWatchingForThemeChange,
  getTheme,
  themes,
  setTheme,
  clearTheme,
} from "./theme";

const App = () => {
  // handling theme
  useEffect(() => {
    updateThemeOnDocument();
    watchForThemeChange();
    return stoptWatchingForThemeChange;
  }, []);

  const handleToggleTheme = () => {
    setTheme(getTheme() === themes.DARK ? themes.LIGHT : themes.DARK);
  };

  const handleClearTheme = () => clearTheme();

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white">
      <button
        className="rounded-full border-black bg-blue-400 p-1"
        onClick={handleToggleTheme}
      >
        TOGGLE THEME
      </button>
      <button
        className="rounded-full border-black bg-blue-400 p-1"
        onClick={handleClearTheme}
      >
        CLEAR THEME
      </button>
    </div>
  );
};

export default App;
