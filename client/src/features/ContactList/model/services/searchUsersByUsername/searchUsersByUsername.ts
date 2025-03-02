import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {User} from "@/entities/User";

interface SearchUsersByUsernameProps {
    search: string;
    limit: number;
    offset: number;
}

export interface SearchUsersResponse {
    rows: User[];
    count: number;
}

export const searchUsersByUsername = createAsyncThunk<
    SearchUsersResponse,
    SearchUsersByUsernameProps,
    ThunkConfig<string>
>(
    'users/searchByLogin',
    async (searchData, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;
        try {
            const response = await extra.api.get<SearchUsersResponse>('/users/searchByLogin', {
                params: {
                    limit: searchData.limit,
                    offset: searchData.offset,
                    search: searchData.search
                }
            });

            if (!response.data) {
                throw new Error('Нет данных');
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Ошибка при поиске пользователей');
        }
    }
);
