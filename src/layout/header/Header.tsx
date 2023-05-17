import { Page, Text } from "@geist-ui/core";
import ThemeSelector from "../../components/theme-selector/ThemeSelector";
import HeaderMenu from "../../components/header-menu/HeaderMenu";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <Page.Header className={styles.header}>
      <div className={styles.headerContent}>
        <Text h1 className={styles.title}>
          StarAtlas EV Reward checker
        </Text>
        <div className={styles.menu}>
          <HeaderMenu />
        </div>
        <div className={styles.themeSelector}>
          <ThemeSelector />
        </div>
      </div>
    </Page.Header>
  );
};

export default Header;
