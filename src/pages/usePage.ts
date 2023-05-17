import { useContext } from "react";
import PageContext from "./pageContext";
import type { PageContextProps } from "./pageContext";

const usePage = (): PageContextProps => {
  const context = useContext(PageContext);

  if (!context) {
    throw new Error("usePage must be used within a PageProvider");
  }

  return context;
};

export default usePage;
