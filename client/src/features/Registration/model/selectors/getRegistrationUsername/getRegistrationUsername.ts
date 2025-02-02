import {StateSchema} from "app/providers/StoreProvider";

export const getRegistrationUsername = (state: StateSchema) => state?.registration?.username;
