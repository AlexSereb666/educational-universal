import {StateSchema} from "app/providers/StoreProvider";

export const getChatMessangerChat = (state: StateSchema) => state?.chatMessanger?.chat;
