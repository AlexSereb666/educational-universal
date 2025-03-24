import {
    CloudStoragePreferencesSchema,
    UploadFile,
} from '../types/CloudStoragePreferencesSchema';
import { View } from '@/shared/const/view';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: CloudStoragePreferencesSchema = {
    currentFolderId: null,
    view: View.LIST,
    uploadFiles: [],
    isActiveUpload: false,
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
        addFileUploads: (state, action: PayloadAction<UploadFile>) => {
            state.uploadFiles.push(action.payload);
        },
        clearFilesUploads: (state, action: PayloadAction<void>) => {
            state.uploadFiles = [];
        },
        setProgressUploadFile: (state, action: PayloadAction<UploadFile>) => {
            const file = state.uploadFiles.find(
                (f) => f.fileName === action.payload.fileName,
            );
            if (file) {
                file.progress = action.payload.progress;
            }
        },
        setIsActiveUploadFile: (state, action: PayloadAction<boolean>) => {
            state.isActiveUpload = action.payload;
        },
    },
});

export const { actions: cloudStoragePreferencesActions } = cloudStoragePreferencesSlice;
export const { reducer: cloudStoragePreferencesReducer } = cloudStoragePreferencesSlice;
