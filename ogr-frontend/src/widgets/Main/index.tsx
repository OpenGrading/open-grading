import { useStore } from "@nanostores/react";
import { $currentRoute, NAVIGATION, router } from "../../app/router";
import HomePage from "../../pages/HomePage";
import UserProfile from "../../pages/UserProfile";
import { $breadcrumbs } from "../../shared/breadcrumb/store";

function Main() {
  const page = useStore(router);


  if (page) {
    $currentRoute.set(page.route);
    if (NAVIGATION.map(n => n.route).includes(page.route)) $breadcrumbs.set([page?.route])
  }
  console.log(page)
  
  switch (page?.route) {
    case "home":
      return <HomePage />;
    case "userProfile":
      return <UserProfile {...page.params} />
    default:
      return <div>Not found</div>;
  }
}

export default Main;
