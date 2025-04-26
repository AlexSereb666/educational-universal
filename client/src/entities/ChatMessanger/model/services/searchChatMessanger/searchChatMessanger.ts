import { createAsyncThunk } from '@reduxjs/toolkit';
import { Chat } from '../../types/chatMessanger';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ACCESS_TOKEN_KEY } from '@/shared/const/localstorage';
import { User } from '@/entities/User';

interface FetchChatProps {
    otherUserId: number;
}

interface fetchChatByUserIdsAttrs {
    chat: Chat;
    participants: User[];
}

export const fetchChatByUserIds = createAsyncThunk<
    fetchChatByUserIdsAttrs,
    FetchChatProps,
    ThunkConfig<string>
>('chats/between-users', async ({ otherUserId }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
        return rejectWithValue('Не найден токен');
    }

    const parsedToken = JSON.parse(atob(token.split('.')[1]));
    const currentUserId = parsedToken.id;

    try {
        const response = await extra.api.get<fetchChatByUserIdsAttrs>(
            `/chats/between-users`,
            {
                params: {
                    userId1: currentUserId,
                    userId2: otherUserId,
                },
            },
        );

        if (!response.data) {
            throw new Error('Нет данных');
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('Ошибка при поиске чата');
    }
});
