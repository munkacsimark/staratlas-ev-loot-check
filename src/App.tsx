import { useLayoutEffect } from "react";
import {
  updateThemeOnDocument,
  watchForThemeChange,
  stoptWatchingForThemeChange,
} from "./theme";
import Header from "./layout/header/Header";
import Main from "./layout/main/Main";
import Footer from "./layout/footer/Footer";

const App = () => {
  // handling theme
  useLayoutEffect(() => {
    updateThemeOnDocument();
    watchForThemeChange();

    return stoptWatchingForThemeChange;
  }, []);

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default App;
