import { createRouter } from "@nanostores/router";
import { atom, WritableStore } from "nanostores";

const PAGES = [
  { route: "home", text: "Home", url: "/", hideFromNavigation: false },
  { route: "ownProfile", text: "Profile", url: "/profile", hideFromNavigation: false },
  {
    route: "userProfile",
    text: "Profile",
    url: "/users/:userId/profile",
    hideFromNavigation: true,
  },
  {
    route: "userSettings",
    text: "Settings",
    url: "/users/:userId/settings",
    hideFromNavigation: true,
  },
] as const;

export const NAVIGATION = PAGES.filter((page) => !page.hideFromNavigation);

export type Routes = (typeof PAGES)[number]["route"];
type MapRoutesToUrls<T extends typeof PAGES> = { [K in T[number] as K["route"]]: K["url"] };
type RoutesToUrls = MapRoutesToUrls<typeof PAGES>;

const NAV: RoutesToUrls = PAGES.reduce<RoutesToUrls>((config, page) => {
  return { ...config, [page.route]: page.url };
}, {} as RoutesToUrls);

export const router = createRouter(NAV);
export const $currentRoute: WritableStore<Routes> = atom(null);
