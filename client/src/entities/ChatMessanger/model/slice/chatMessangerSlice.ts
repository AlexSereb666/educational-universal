import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessanger } from "@/entities/ChatMessanger";
import { fetchChatByUserIds } from "@/entities/ChatMessanger/model/services/searchChatMessanger/searchChatMessanger";
import { Chat, Message } from "@/entities/ChatMessanger/model/types/chatMessanger";

const initialState: ChatMessanger = {
    chat: null,
    messages: [],
    isLoading: false,
};

export const chatMessangerSlice = createSlice({
    name: 'chatMessanger',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
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
