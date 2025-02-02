import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";

interface LogoutResponse {
    message: string;
}

export const logout = createAsyncThunk<
    string,
    void,
    ThunkConfig<string>
>(
    'auth/logout',
    async (_, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<LogoutResponse>('/auth/logout');

            if (!response.data) {
                throw new Error('Нет данных в ответе');
            }

            return response.data.message;
        } catch (e) {
            console.error('Ошибка выхода из аккаунта:', e);
            return rejectWithValue('Ошибка выхода из аккаунта');
        }
    }
);
