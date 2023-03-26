import { Container, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import useNarrowLayout from "../../shared/hooks/useNarrowLayout";

interface Layout {
  header: JSX.Element;
  sidebar: JSX.Element;
  main: JSX.Element;
  footer: JSX.Element;
}

const wideLayout = `"header header"
                    "nav main"
                    "footer footer"`;
const narrowLayout = `"header"
                    "main"
                    "footer"`;

function Layout({ header, sidebar, main, footer }: Layout) {
  const isNarrow = useNarrowLayout();
  console.log(isNarrow);

  return (
    <Grid
      templateAreas={isNarrow ? narrowLayout : wideLayout}
      gridTemplateRows={"50fr 1fr 30px"}
      gridTemplateColumns={isNarrow ? "1fr" : "150px 1fr"}
      h="1"
      gap="1"
      padding={["16px", null, "32px"]}
    >
      <GridItem pl="2" area={"header"} padding="0">
        {header}
      </GridItem>
      {isNarrow ? null : (
        <GridItem pl="2" area={"nav"} padding="0">
          {sidebar}
        </GridItem>
      )}
      <GridItem pl="2" area={"main"} padding="0">
        {main}
      </GridItem>
      <GridItem pl="2" area={"footer"} padding="0" margin={["0 -16px", null, "0 -32px"]}>
        {footer}
      </GridItem>
    </Grid>
  );
}

export default Layout;
