import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "@/entities/User";
import {fetchUserById} from "../service/fetchUserById/fetchUserById";
import {ProfileSchema} from "../types/profileSchema";

const initialState: ProfileSchema = {
    data: null,
    isLoading: false,
    error: undefined,
};

const profileSlice = createSlice({
    name: "profileSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchUserById.fulfilled, (
                state,
                action: PayloadAction<User>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
