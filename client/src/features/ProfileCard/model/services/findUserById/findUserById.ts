import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "@/entities/User";
import {ThunkConfig} from "@/app/providers/StoreProvider";

export const findUserById = createAsyncThunk<
    User,
    string,
    ThunkConfig<string>
>(
    'profileCard/findUserById',
    async (id, thunkApi) => {
        const {
            extra, rejectWithValue
        } = thunkApi;

        try {
            const response = await extra.api.get<User>(`/users/${id}`);

            if (!response.data) {
                throw new Error('Нет данных');
            }

            return response.data;
        } catch (e) {
            console.error('Ошибка при получения данных пользователя:', e);
            return rejectWithValue('Ошибка при получения данных пользователя');
        }
    }
);
