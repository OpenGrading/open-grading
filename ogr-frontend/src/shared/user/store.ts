import { createFetcherStore } from "../../app/fetcher/store";
import { ApiError, UserDTO } from "../api";

const $users = createFetcherStore<{ users: UserDTO[] }, ApiError>(["/users"]);

export default $users;
