import {createAsyncThunk} from "@reduxjs/toolkit";
import {Chat, Message} from "@/entities/ChatMessanger/model/types/chatMessanger";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {ACCESS_TOKEN_KEY} from "@/shared/const/localstorage";

interface FetchChatProps {
    otherUserId: number;
}

export const fetchChatByUserIds = createAsyncThunk<
    { chat: Chat; messages: Message[] },
    FetchChatProps,
    ThunkConfig<string>
>(
    'chats/between-users',
    async ({ otherUserId }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (!token) {
            return rejectWithValue('Не найден токен');
        }

        const parsedToken = JSON.parse(atob(token.split('.')[1]));
        const currentUserId = parsedToken.id;

        try {
            const response = await extra.api.get<{ chat: Chat; messages: Message[] }>(
                `/chats/between-users`, {
                    params: {
                        userId1: currentUserId,
                        userId2: otherUserId
                    }
                }
            );

            if (!response.data) {
                throw new Error('Нет данных');
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Ошибка при поиске чата');
        }
    }
)
