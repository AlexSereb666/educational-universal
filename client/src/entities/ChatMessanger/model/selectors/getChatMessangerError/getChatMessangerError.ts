import {StateSchema} from "app/providers/StoreProvider";

export const getChatMessangerError = (state: StateSchema) => state?.chatMessanger?.error;
