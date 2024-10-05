import {StateSchema} from "@/app/providers/StoreProvider";

export const getRegistrationPassword = (state: StateSchema) => state?.registration?.password;
