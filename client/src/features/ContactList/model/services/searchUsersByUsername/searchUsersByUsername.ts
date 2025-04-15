import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData, User } from '@/entities/User';

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
>('users/searchByLogin', async (searchData, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const user = getUserAuthData(getState());

    try {
        const response = await extra.api.get<SearchUsersResponse>(
            '/users/searchByLogin',
            {
                params: {
                    limit: searchData.limit,
                    offset: searchData.offset,
                    search: searchData.search,
                },
            },
        );

        if (!response.data) {
            throw new Error('Нет данных');
        }

        let modifiedRows = response.data.rows;

        if (user && response.data.rows && response.data.rows.length > 0) {
            modifiedRows = response.data.rows.map((userInList) => {
                if (userInList.id === user.id) {
                    return { ...userInList, login: 'Избранный' };
                }

                return userInList;
            });
        }

        return {
            ...response.data,
            rows: modifiedRows,
        };
    } catch (e) {
        console.log(e);
        return rejectWithValue('Ошибка при поиске пользователей');
    }
});
