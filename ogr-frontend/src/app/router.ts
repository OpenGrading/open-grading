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

export const NAVIGATION = PAGES.filter(page => !page.hideFromNavigation);

export type Routes = (typeof PAGES)[number]["route"];
type Urls = (typeof PAGES)[number]["url"];
type RoutesToUrls<T extends typeof PAGES> = { [K in T[number] as K["route"]]: K["url"] };
type B = RoutesToUrls<typeof PAGES>;

const NAV = PAGES.reduce<{ [K in Routes]: Urls }>((config, page) => {
  config[page.route] = page.url;
  return config;
}, {} as { [K in Routes]: Urls });

export const router = createRouter(NAV as B);
export const $currentRoute: WritableStore<Routes> = atom(null);
