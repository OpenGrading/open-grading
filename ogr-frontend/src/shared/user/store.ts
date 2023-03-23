import { createFetcherStore } from "../fetcher/store";
import { User } from "./model";

const $users = createFetcherStore<{ users: User[] }, Error>(["/"]);

export default $users;
