import { useStore } from "@nanostores/react";
import { router } from "../../app/router";
import HomePage from "../../pages/HomePage";
import UserProfile from "../../pages/UserProfile";

function Main() {
  const page = useStore(router);
  
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
