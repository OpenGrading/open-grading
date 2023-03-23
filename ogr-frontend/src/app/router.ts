import { createRouter, RouterConfig } from "@nanostores/router";

export const NAVIGATION = [
  { route: "home", url: "/" },
  {
    url: "/users/:userId",
    children: [
      { route: "userProfile", url: "/profile" },
      { route: "userSettings", url: "/settings" },
    ],
  },
];
// const config: RouterConfig = {};

// export const router = createRouter(
//   NAVIGATION.reduce((nav, route) => {
//     if (!route.children) {
//       nav[route.route] = route.url;
//     } else {
//       route.children.reduce((nav, childRoute) => {
//         nav[childRoute.route] = [route.url, childRoute.url].join("");
//         return nav;
//       }, config);
//     }

//     return nav;
//   }, config)
// );
//
export const router = createRouter({
  home: "/",
  userProfile: "/users/:userId/profile",
  userSettings: "/users/:userId/settings",
} as const);
