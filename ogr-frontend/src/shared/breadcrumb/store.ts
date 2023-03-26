import { atom } from "nanostores";
import type { Routes } from "../../app/router";

export const $breadcrumbs = atom<Routes[]>([
]);
