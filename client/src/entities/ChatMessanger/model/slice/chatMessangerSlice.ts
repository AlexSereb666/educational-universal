import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessanger } from '../types/chatMessanger';
import { fetchChatByUserIds } from '../../model/services/searchChatMessanger/searchChatMessanger';
import { Chat, Message } from '../../model/types/chatMessanger';
import { ConnectionStatus } from '@/shared/const/connectionStatus';

const initialState: ChatMessanger = {
    chat: null,
    messages: [],
    isLoading: false,
    error: undefined,
    connectionStatus: ConnectionStatus.IDLE,
    connectionError: null,
};

export const chatMessangerSlice = createSlice({
    name: 'chatMessanger',
    initialState,
    reducers: {
        startConnecting: (state, action: PayloadAction<number>) => {
            state.connectionStatus = ConnectionStatus.PENDING;
        },
        disconnect: (state) => {},
        sendMessageRequest: (
            state,
            action: PayloadAction<{ chatId: number; text: string }>,
        ) => {},
        setConnectionStatus: (state, action: PayloadAction<ConnectionStatus>) => {
            state.connectionStatus = action.payload;
            if (action.payload !== ConnectionStatus.ERROR) {
                state.connectionError = null;
            }
        },
        connectionError: (state, action: PayloadAction<string>) => {
            state.connectionError = action.payload;
            state.connectionStatus = ConnectionStatus.ERROR;
        },
        messageReceived: (state, action: PayloadAction<Message>) => {
            if (!state.messages.some((msg) => msg.id === action.payload.id)) {
                state.messages.push(action.payload);
            }
        },
        clearChatData: (state) => {
            state.chat = null;
            state.messages = [];
            state.isLoading = false;
            state.error = undefined;
            state.connectionStatus = ConnectionStatus.IDLE;
            state.connectionError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatByUserIds.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchChatByUserIds.fulfilled,
                (state, action: PayloadAction<{ chat: Chat; messages: Message[] }>) => {
                    state.chat = action.payload.chat;
                    state.messages = action.payload.messages;
                    state.isLoading = false;
                    state.connectionStatus = ConnectionStatus.IDLE;
                },
            )
            .addCase(fetchChatByUserIds.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.connectionStatus = ConnectionStatus.IDLE;
            });
    },
});

export const { actions: chatMessangerActions } = chatMessangerSlice;
export const { reducer: chatMessangerReducer } = chatMessangerSlice;
