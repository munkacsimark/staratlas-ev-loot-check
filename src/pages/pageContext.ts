import { createContext } from "react";
import { Info, Home } from "@geist-ui/icons";
import type { Icon } from "@geist-ui/icons";

const pages = {
  HOME: "home",
  ABOUT: "about",
} as const;

type Page = (typeof pages)[keyof typeof pages];

type PageData = {
  name: Page;
  icon: Icon;
};

const pageData: PageData[] = [
  {
    name: pages.HOME,
    icon: Home,
  },
  {
    name: pages.ABOUT,
    icon: Info,
  },
];

type PageContextProps = {
  page: PageData;
  setPage: (page: Page) => void;
};

const PageContext = createContext<PageContextProps | undefined>(undefined);

export default PageContext;
export { pageData, pages };
export type { PageContextProps, PageData, Page };
