import { createElement } from "react";
import { Tabs, Text } from "@geist-ui/core";
import { pageData, pages } from "../../pages/pageContext";
import type { Page } from "../../pages/pageContext";
import usePage from "../../pages/usePage";

const isPage = (value: string): value is Page =>
  Object.values(pages)
    .map((page) => page.toString())
    .includes(value);

const HeaderMenu = () => {
  const { setPage } = usePage();

  const handleChange = (value: string) => {
    if (!isPage(value)) {
      console.error(`${value} is an unknown page.`);
      return;
    }

    setPage(value);
  };

  return (
    <Tabs
      initialValue={pageData[0].name}
      onChange={handleChange}
      align="center"
    >
      {pageData.map(({ name, icon }) => (
        <Tabs.Item
          key={name}
          label={
            <>
              {createElement(icon)} <Text span>{name}</Text>
            </>
          }
          value={name}
        />
      ))}
    </Tabs>
  );
};

export default HeaderMenu;
