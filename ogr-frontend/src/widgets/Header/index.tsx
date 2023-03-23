import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading } from "@chakra-ui/react";
import { useStore } from "@nanostores/react";
import { $breadcrumbs } from "../../shared/breadcrumb/store";

function Header({ children }: { children: JSX.Element | string }) {
  const breadcrumbs = useStore($breadcrumbs);
  return (
    <>
      <header>
        <Heading>{children}</Heading>
      </header>
      <Breadcrumb>
        {breadcrumbs.map((item) => {
          return (
            <BreadcrumbItem key={item.url}>
              <BreadcrumbLink href={item.url}>{item.text}</BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </>
  );
}

export default Header;
