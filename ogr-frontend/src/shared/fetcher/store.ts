import { nanoquery } from "@nanostores/query";

const api_prefix = import.meta.env.VITE_API_PREFIX || "/api";

export const [createFetcherStore, createMutatorStore] = nanoquery({
  fetcher: (...keys: string[]) => fetch(api_prefix + keys.join("")).then((r) => r.json()),
});
