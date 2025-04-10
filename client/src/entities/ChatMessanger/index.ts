export {
    chatMessangerSlice,
    chatMessangerActions,
    chatMessangerReducer,
} from './model/slice/chatMessangerSlice';

export type { ChatMessanger } from './model/types/chatMessanger';

export { fetchChatByUserIds } from './model/services/searchChatMessanger/searchChatMessanger';

export {
    getChatMessangerChat,
    getChatMessangerConnectionStatus,
    getChatMessangerError,
    getChatMessangerMessages,
    getChatMessangerIsLoading,
} from './model/selectors/chatMessenger';

export type { Message } from './model/types/chatMessanger';
export { chatSocketModule } from './config/socketHandlers';
