import {StateSchema} from "app/providers/StoreProvider";

export const getChatMessangerMessages = (state: StateSchema) => state?.chatMessanger?.messages;
