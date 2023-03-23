import { nanoquery } from "@nanostores/query";

const api_prefix = import.meta.env.VITE_API_PREFIX || "/api";
console.log("Api prefix is:", api_prefix);

export const [createFetcherStore, createMutatorStore] = nanoquery({
  fetcher: (...keys: string[]) => fetch(api_prefix + keys.join("")).then((r) => r.json()),
});
