import { useState, FunctionComponent, PropsWithChildren } from "react";
import PageContext, { pageData } from "./pageContext";
import type { PageData, Page } from "./pageContext";

const PageProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageData>(pageData[0]);

  const setPage = (page: Page) => {
    const newPage = pageData.find((data) => data.name === page);

    if (!newPage) {
      console.error(`Page: ${page} is not exists.`);
      return;
    }

    setCurrentPage(newPage);
  };

  return (
    <PageContext.Provider value={{ page: currentPage, setPage }}>
      {children}
    </PageContext.Provider>
  );
};

export default PageProvider;
