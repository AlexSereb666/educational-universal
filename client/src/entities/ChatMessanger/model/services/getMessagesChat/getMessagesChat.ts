import { Message } from '../../types/chatMessanger';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

interface getMessagesChatProps {
    chatId: number;
}

export const getMessagesChat = createAsyncThunk<
    Message[],
    getMessagesChatProps,
    ThunkConfig<string>
>('chats/getMessagesChat', async ({ chatId }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<Message[]>(`/chat-messages/${chatId}`);

        if (!response.data) {
            throw new Error('Ошибка при загрузке сообщений');
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('Ошибка при загрузке сообщений');
    }
});
