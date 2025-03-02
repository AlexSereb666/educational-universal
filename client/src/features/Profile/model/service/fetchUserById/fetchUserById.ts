import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "@/entities/User";
import {ThunkConfig} from "@/app/providers/StoreProvider";

export const fetchUserById = createAsyncThunk<
    User,
    number,
    ThunkConfig<string>
>(
    'modalProfiles/fetchUserById',
    async (userId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;
        try {
            const response = await extra.api.get<User>(`/users/${userId}`);

            if (!response.data) {
                throw new Error('Нет данных');
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Ошибка при поиске пользователя');
        }
    }
);
