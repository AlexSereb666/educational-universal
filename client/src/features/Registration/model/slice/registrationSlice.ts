import {RegistrationSchema} from "../../model/types/registrationSchema";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {registrationByUser} from "../../model/services/registrationByUser/RegistrationByUser";

const initialState: RegistrationSchema = {
    isLoading: false,
    username: '',
    email: '',
    password: '',
};

export const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registrationByUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(registrationByUser.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(registrationByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: registrationActions } = registrationSlice;
export const { reducer: registrationReducer } = registrationSlice;
