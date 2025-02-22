export {
   getChatMessangerIsLoading,
} from './model/selectors/getChatMessangerIsLoading/getChatMessangerIsLoading';

export {
    getChatMessangerError,
} from './model/selectors/getChatMessangerError/getChatMessangerError';

export {
    getChatMessangerMessages,
} from './model/selectors/getChatMessangerMessages/getChatMessangerMessages';

export {
    getChatMessangerChat,
} from './model/selectors/getChatMessangerChat/getChatMessangerChat';

export {
    chatMessangerSlice,
    chatMessangerActions,
    chatMessangerReducer,
    socket,
} from './model/slice/chatMessangerSlice';

export type {
    ChatMessanger
} from './model/types/chatMessanger';

export {
    fetchChatByUserIds
} from './model/services/searchChatMessanger/searchChatMessanger';
