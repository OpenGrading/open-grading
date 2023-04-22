import { nanoquery } from "@nanostores/query";
import { atom } from "nanostores";
import { OpenAPI, UserDTO } from "../../shared/api";
import { request } from "../../shared/api/core/request";

const api_prefix = import.meta.env.VITE_API_PREFIX || "/api";

const fetcher = (...keys: string[]) =>
  request(OpenAPI, { url: api_prefix + keys.join(""), method: "GET" });

export const [createFetcherStore, createMutatorStore] = nanoquery({ fetcher });

const $currentUserId = atom("");
const $currentUser = createFetcherStore<UserDTO>(["/user/", $currentUserId]);
