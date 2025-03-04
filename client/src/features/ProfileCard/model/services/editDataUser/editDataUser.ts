import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {User} from "@/entities/User";

interface editDataUserProps {
    id: number;
    login: string;
}

export const editDataUser = createAsyncThunk<
    User,
    editDataUserProps,
    ThunkConfig<string>
>(
    'profileCard/editDataUser',
    async (data, thunkApi) => {
        const {
            extra, rejectWithValue
        } = thunkApi;

        const {
            id,
            login,
        } = data;

        try {
            const response = await extra.api.post<User>(`/users/edit/${id}`, {
                login,
            });

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
