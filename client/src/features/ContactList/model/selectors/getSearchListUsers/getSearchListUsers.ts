import {StateSchema} from "app/providers/StoreProvider";

export const getSearchListUsers = (state: StateSchema) => state?.search?.listUsers;
