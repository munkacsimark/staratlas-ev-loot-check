import { lazy, Suspense } from "react";
import { Page } from "@geist-ui/core";
import ThemeProvider from "./theme/ThemeProvider";
import PageProvider from "./pages/PageProvider";
import { Loader } from "@geist-ui/icons";
import styles from "./App.module.css";

const DynamicHeader = lazy(() => import("./layout/header/Header"));
const DynamicMain = lazy(() => import("./layout/main/Main"));
const DynamicFooter = lazy(() => import("./layout/footer/Footer"));

const App = () => {
  return (
    <ThemeProvider>
      <PageProvider>
        <Page className={styles.page}>
          <Suspense
            fallback={
              <div className={styles.loaderContainer}>
                <Loader size={56} className={styles.loader} />
              </div>
            }
          >
            <DynamicHeader />
            <DynamicMain />
            <DynamicFooter />
          </Suspense>
        </Page>
      </PageProvider>
    </ThemeProvider>
  );
};

export default App;
