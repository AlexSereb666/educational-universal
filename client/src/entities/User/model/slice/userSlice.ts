import {User, UserSchema} from "../types/user";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ACCESS_TOKEN_KEY} from "@/shared/const/localstorage";
import {logout} from "../services/logout/logout";
import {initAuth} from "@/entities/User/model/services/initAuth/initAuth";

const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logout.fulfilled, (state) => {
                state.authData = undefined;
                localStorage.removeItem(ACCESS_TOKEN_KEY);
            })
            .addCase(initAuth.fulfilled, (state, action) => {
                state.authData = action.payload.user;
                state._inited = true;
                localStorage.setItem(ACCESS_TOKEN_KEY, action.payload.accessToken);
            })
            .addCase(initAuth.rejected, (state, action) => {
                state._inited = true;
            });
    }
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
