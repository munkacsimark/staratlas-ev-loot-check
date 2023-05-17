import { Page } from "@geist-ui/core";
import Header from "./layout/header/Header";
import Main from "./layout/main/Main";
import Footer from "./layout/footer/Footer";
import ThemeProvider from "./theme/ThemeProvider";
import PageProvider from "./pages/PageProvider";

const App = () => {
  return (
    <ThemeProvider>
      <PageProvider>
        <Page>
          <Header />
          <Main />
          <Footer />
        </Page>
      </PageProvider>
    </ThemeProvider>
  );
};

export default App;
