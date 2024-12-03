import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {User, userActions} from "@/entities/User";
import {USER_LOCALSTORAGE_KEY} from "@/shared/const/localstorage";

interface RegistrationByUserProps {
    username: string;
    email: string;
    password: string;
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
            const response = await extra.api.post<User>('/auth/registration',
                {login: data.username, password: data.password, email: data.email});

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
