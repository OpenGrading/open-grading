import { atom } from "nanostores";
import Breadcrumb from "./model";

export const $breadcrumbs = atom<Breadcrumb[]>([
  {url: "/", text: "Home"},
  {url: "/user", text: "User"}
]);
