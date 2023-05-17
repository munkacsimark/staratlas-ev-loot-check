import { Page } from "@geist-ui/core";
import Header from "./layout/header/Header";
import Main from "./layout/main/Main";
import Footer from "./layout/footer/Footer";
import ThemeProvider from "./theme/ThemeProvider";

const App = () => {
  return (
    <ThemeProvider>
      <Page dotBackdrop>
        <Header />
        <Main />
        <Footer />
      </Page>
    </ThemeProvider>
  );
};

export default App;
