import { Box, Container, Link, MenuItem, VStack } from "@chakra-ui/react";
import { useStore } from "@nanostores/react";
import { openPage } from "@nanostores/router";
import { $currentRoute, NAVIGATION, router } from "../../app/router";

export default function Navigation({ isHamburger = false }: { isHamburger?: boolean }) {
  const currentRoute = useStore($currentRoute);

  const renderLink = (page: any) =>
    currentRoute !== page.route ? <Link href={page.url}>{page.text}</Link> : page.text;

  return (
    <>
      {NAVIGATION.map((page) => {
        return isHamburger ? (
          <MenuItem
            key={page.route}
            onClick={() => openPage(router, page.route)}
            isDisabled={currentRoute === page.route}
          >
            {page.text}
          </MenuItem>
        ) : (
          <Box padding="8px 0" key={page.route}>{renderLink(page)}</Box>
        );
      })}
    </>
  );
}
