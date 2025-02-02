import {StateSchema} from "app/providers/StoreProvider";

export const getRegistrationEmail = (state: StateSchema) => state?.registration?.email;
