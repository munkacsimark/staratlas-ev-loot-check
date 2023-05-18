import { Page } from "@geist-ui/core";
import usePage from "../../pages/usePage";

const Main = () => {
  const { page } = usePage();

  return <Page.Content pt={"1rem"}>{page.content()}</Page.Content>;
};

export default Main;
