import { Page, Grid, Text } from "@geist-ui/core";
import ThemeToggle from "../../components/theme-selector/ThemeSelector";
import HeaderMenu from "../../components/header-menu/HeaderMenu";

const Header = () => {
  return (
    <Page.Header>
      <Grid.Container gap={2} justify="space-between" alignItems="center">
        <Grid xs={6}>
          <Text h1>Title</Text>
        </Grid>
        <Grid xs={12}>
          <HeaderMenu />
        </Grid>
        <Grid xs={6}>
          <ThemeToggle />
        </Grid>
      </Grid.Container>
    </Page.Header>
  );
};

export default Header;
