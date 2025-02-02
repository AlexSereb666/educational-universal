import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {User, userActions} from "entities/User";
import {ACCESS_TOKEN_KEY} from "shared/const/localstorage";

interface RegistrationByUserProps {
    username: string;
    email: string;
    password: string;
}

interface RegistrationResponse {
    accessToken: string;
    user: User;
}

export const registrationByUser = createAsyncThunk<
    User,
    RegistrationByUserProps,
    ThunkConfig<string>
>(
    'auth/registration',
    async (data, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<RegistrationResponse>('/auth/registration',
                {login: data.username, password: data.password, email: data.email});

            if (!response.data) {
                throw new Error('Нет данных в ответе');
            }

            const { accessToken, user } = response.data;

            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
            dispatch(userActions.setAuthData(user));

            return user;
        } catch (e) {
            console.error('Ошибка при регистрации:', e);
            return rejectWithValue('Ошибка регистрации');
        }
    },
);
