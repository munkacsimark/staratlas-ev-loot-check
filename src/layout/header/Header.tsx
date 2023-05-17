import { Page, Grid, Text } from "@geist-ui/core";
import ThemeToggle from "../../components/theme-selector/ThemeSelector";

const Header = () => {
  return (
    <Page.Header>
      <Grid.Container gap={2} justify="space-between" alignItems="center">
        <Grid>
          <Text h1>Title</Text>
        </Grid>
        <Grid>
          <ThemeToggle />
        </Grid>
      </Grid.Container>
    </Page.Header>
  );
};

export default Header;
