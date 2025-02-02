import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessanger } from "../types/chatMessanger";
import { fetchChatByUserIds } from "../../model/services/searchChatMessanger/searchChatMessanger";
import { Chat, Message } from "../../model/types/chatMessanger";
import {io, Socket} from "socket.io-client";
import {ACCESS_TOKEN_KEY} from "shared/const/localstorage";

const initialState: ChatMessanger = {
    chat: null,
    messages: [],
    isLoading: false,
};

export let socket: Socket | null = null;

export const chatMessangerSlice = createSlice({
    name: 'chatMessanger',
    initialState,
    reducers: {
        connectToChat: (state, action: PayloadAction<number>) => {
            const chatId = action.payload;

            socket = io(`${__API__}/chat`);

            socket.on('connect', () => {
                console.log('Connected to WebSocket server');
            });

            socket.emit('joinChat', chatId);
        },
        disconnectFromChat: (state) => {
            if (socket) {
                socket.disconnect();
                socket = null;
                console.log('Disconnected from WebSocket server');
            }
        },
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        sendMessage: (state, action: PayloadAction<{ chatId: number; text: string; }>) => {
            if (socket) {
                const { chatId, text} = action.payload;

                const token = localStorage.getItem(ACCESS_TOKEN_KEY);
                const parsedToken = JSON.parse(atob(token.split('.')[1]));
                const userId = parsedToken.id;

                socket.emit('sendMessage', { chatId, userId, text });
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatByUserIds.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchChatByUserIds.fulfilled, (state, action: PayloadAction<{ chat: Chat; messages: Message[] }>) => {
                state.chat = action.payload.chat;
                state.messages = action.payload.messages;
                state.isLoading = false;
            })
            .addCase(fetchChatByUserIds.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: chatMessangerActions } = chatMessangerSlice;
export const { reducer: chatMessangerReducer } = chatMessangerSlice;
