import { ConnectionStatus } from '@/shared/const/connectionStatus';

export interface Message {
    id: number;
    chatId: number;
    userId: number;
    text: string;
    isRead: boolean;
    createdAt: string;
}

export interface UserChat {
    id: number;
    chatId: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
}

export interface Chat {
    id: number;
    type: 'private' | 'group';
    createdAt: string;
    updatedAt: string;
    users: UserChat[];
}

export interface ChatMessanger {
    chat: Chat | null;
    messages: Message[];
    isLoading: boolean;
    error?: string;
    connectionStatus: ConnectionStatus;
    connectionError: string | null;
}
