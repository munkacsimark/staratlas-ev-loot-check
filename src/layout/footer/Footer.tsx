import { Page } from "@geist-ui/core";

const Footer = () => {
  const currentYear = new Date(Date.now()).getFullYear();

  return <Page.Footer>{currentYear}</Page.Footer>;
};

export default Footer;
