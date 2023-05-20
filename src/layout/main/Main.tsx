import { lazy, Suspense } from "react";
import { Loading, Page } from "@geist-ui/core";
import usePage from "../../pages/usePage";
import { pages } from "../../pages/pageContext";

const DynamicAboutPage = lazy(() => import("../../pages/about/About"));
const DynamicHomePage = lazy(() => import("../../pages/home/Home"));

const Main = () => {
  const { page } = usePage();

  const getPageComponent = () => {
    switch (page.name) {
      case pages.ABOUT:
        return <DynamicAboutPage />;

      default:
        return <DynamicHomePage />;
    }
  };

  return (
    <Page.Content pt={"1rem"}>
      <Suspense fallback={<Loading>Loading page</Loading>}>
        {getPageComponent()}
      </Suspense>
    </Page.Content>
  );
};

export default Main;
