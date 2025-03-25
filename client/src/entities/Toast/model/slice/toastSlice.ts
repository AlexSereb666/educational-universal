import { ToastSchema } from '../types/toastSchema';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Toast } from '../types/toast';

const initialState: ToastSchema = {
    toasts: [],
};

export const toastSlice = createSlice({
    name: 'toastSlice',
    initialState,
    reducers: {
        addToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
            state.toasts.unshift({ id: Date.now().toString(), ...action.payload });
        },
        removeToast: (state, action: PayloadAction<string>) => {
            state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
        },
    },
});

export const { actions: toastActions } = toastSlice;
export const { reducer: toastReducer } = toastSlice;
