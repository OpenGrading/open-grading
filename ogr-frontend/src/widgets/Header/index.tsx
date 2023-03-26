import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import { useStore } from "@nanostores/react";
import { $breadcrumbs } from "../../shared/breadcrumb/store";
import { getPagePath } from "@nanostores/router";
import { NAVIGATION, router } from "../../app/router";
import { HamburgerIcon } from "@chakra-ui/icons";
import Navigation from "../Navigation";
import useNarrowLayout from "../../shared/hooks/useNarrowLayout";

function Header({ children }: { children: JSX.Element | string }) {
  const breadcrumbs = useStore($breadcrumbs);
  const isNarrow = useNarrowLayout();

  return (
    <>
      <Flex padding="8px 0 0px">
        <header>
          <Heading>{children}</Heading>
        </header>
        <Spacer />
        {isNarrow ? (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <Navigation isHamburger />
            </MenuList>
          </Menu>
        ) : null}
      </Flex>
      <Breadcrumb padding="8px 0 16px" fontSize="sm">
        <BreadcrumbItem>
          <BreadcrumbLink href={getPagePath(router, "home")}>{">"} Home</BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.map((item) => {
          return (
            <BreadcrumbItem key={item}>
              <BreadcrumbLink href={getPagePath(router, item)}>{item}</BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </>
  );
}

export default Header;
