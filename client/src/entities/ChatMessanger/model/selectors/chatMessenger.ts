import { StateSchema } from '@/app/providers/StoreProvider';

export const getChatMessangerMessages = (state: StateSchema) =>
    state?.chatMessanger?.messages;
export const getChatMessangerIsLoading = (state: StateSchema) =>
    state?.chatMessanger?.isLoading;
export const getChatMessangerError = (state: StateSchema) => state?.chatMessanger?.error;
export const getChatMessangerChat = (state: StateSchema) => state?.chatMessanger?.chat;
export const getChatMessangerConnectionStatus = (state: StateSchema) =>
    state?.chatMessanger?.connectionStatus;
export const getChatMessangerParticipants = (state: StateSchema) =>
    state?.chatMessanger?.participants;
