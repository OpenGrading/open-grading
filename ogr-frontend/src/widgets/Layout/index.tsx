import { Container, Grid, GridItem } from "@chakra-ui/react";

interface Layout {
  header: JSX.Element;
  sidebar: JSX.Element;
  main: JSX.Element;
  footer: JSX.Element;
}

function Layout({ header, sidebar, main, footer }: Layout) {
  return (
    <Grid
      templateAreas={`"header header"
                    "nav main"
                    "nav footer"`}
      gridTemplateRows={"50fr 1fr 30px"}
      gridTemplateColumns={"150px 1fr"}
      h="0.5"
      gap="1"
    >
      {" "}
      <GridItem pl="2" bg="orange.300" area={"header"}>
        {header}
      </GridItem>
      <GridItem pl="2" bg="pink.300" area={"nav"}>
        {sidebar}
      </GridItem>
      <GridItem pl="2" bg="green.300" area={"main"}>
        <Container>{main}</Container>
      </GridItem>
      <GridItem pl="2" bg="blue.300" area={"footer"}>
        {footer}
      </GridItem>
    </Grid>
  );
}

export default Layout;
