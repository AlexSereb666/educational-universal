import {ProfileCardSchema} from "../types/types";
import {findUserById} from '../services/findUserById/findUserById';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "@/entities/User";
import {editDataUser} from "@/features/ProfileCard/model/services/editDataUser/editDataUser";

const initialState: ProfileCardSchema = {
    data: undefined,
    isLoading: false,
}

const profileCardSlice = createSlice({
    name: 'profileCard',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<string>) => {
            state.data.login = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(findUserById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(findUserById.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(findUserById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(editDataUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(editDataUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(editDataUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const {
    actions: profileCardActions,
    reducer: profileCardReducer
} = profileCardSlice;
