import { CloudStorageSchema } from '../types/CloudStorageSchema';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFolder } from '../services/getFolder/getFolder';
import { CloudStorage } from '../types/CloudStorage';
import { addFolder } from '../services/addFolder/addFolder';
import { Folder } from '../types/folder';

const initialState: CloudStorageSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const cloudStorageSlice = createSlice({
    name: 'cloudStorageSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFolder.pending, (state: CloudStorageSchema) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                getFolder.fulfilled,
                (state: CloudStorageSchema, action: PayloadAction<CloudStorage>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(getFolder.rejected, (state: CloudStorageSchema, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addFolder.pending, (state: CloudStorageSchema) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                addFolder.fulfilled,
                (state: CloudStorageSchema, action: PayloadAction<Folder>) => {
                    state.isLoading = false;
                    state.data.folders.push(action.payload);
                },
            )
            .addCase(addFolder.rejected, (state: CloudStorageSchema, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: cloudStorageActions } = cloudStorageSlice;
export const { reducer: cloudStorageReducer } = cloudStorageSlice;
