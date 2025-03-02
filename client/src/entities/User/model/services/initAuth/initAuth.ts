import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {User} from "../../types/user";

export interface InitAuthResponse {
    accessToken: string;
    user: User;
}

export const initAuth = createAsyncThunk<
    InitAuthResponse,
    void,
    ThunkConfig<string>
>(
    'auth/refresh',
    async (_, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<InitAuthResponse>('/auth/refresh');

            if (!response.data) {
                throw new Error('Нет данных в ответе');
            }

            return response.data;
        } catch (e) {
            console.error('Ошибка обновления данных:', e);
            return rejectWithValue('Ошибка обновления данных');
        }
    }
);
