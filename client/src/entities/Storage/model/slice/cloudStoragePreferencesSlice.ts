import { CloudStoragePreferencesSchema } from '../types/CloudStoragePreferencesSchema';
import { View } from '@/shared/const/view';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: CloudStoragePreferencesSchema = {
    currentFolderId: null,
    view: View.BIG,
};

export const cloudStoragePreferencesSlice = createSlice({
    name: 'cloudStoragePreferencesSlice',
    initialState,
    reducers: {
        setCurrentFolderId: (state, action: PayloadAction<number | null>) => {
            state.currentFolderId = action.payload;
        },
        setView: (state, action: PayloadAction<View>) => {
            state.view = action.payload;
        },
    },
});

export const { actions: cloudStoragePreferencesActions } = cloudStoragePreferencesSlice;
export const { reducer: cloudStoragePreferencesReducer } = cloudStoragePreferencesSlice;
