import {createAsyncThunk} from "@reduxjs/toolkit";
import {User, userActions} from "@/entities/User";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {USER_LOCALSTORAGE_KEY} from "@/shared/const/localstorage";

interface LoginByUsernameProps {
    username: string;
    password: string;
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
            const response = await extra.api.post<User>('/auth/login',
                {login: authData.username, password: authData.password});

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
