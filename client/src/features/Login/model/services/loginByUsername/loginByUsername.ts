import {createAsyncThunk} from "@reduxjs/toolkit";
import {User, userActions} from "@/entities/User";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {ACCESS_TOKEN_KEY} from "@/shared/const/localstorage";

interface LoginByUsernameProps {
    username: string;
    password: string;
}

interface LoginResponse {
    accessToken: string;
    user: User;
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>(
    'auth/login',
    async (authData, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<LoginResponse>('/auth/login', {
                    login: authData.username,
                    password: authData.password
                });

            if (!response.data) {
                throw new Error('Нет данных в ответе');
            }

            const { accessToken, user } = response.data;

            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
            dispatch(userActions.setAuthData(user));

            return user;
        } catch (e) {
            console.error('Ошибка при авторизации:', e);
            return rejectWithValue('Ошибка авторизации');
        }
    },
);
