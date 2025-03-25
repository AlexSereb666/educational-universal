import { CloudStorageSchema } from '../types/CloudStorageSchema';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFolder } from '../services/getFolder/getFolder';
import { CloudStorage } from '../types/CloudStorage';
import { addFolder } from '../services/addFolder/addFolder';
import { Folder } from '../types/folder';
import { File } from '../types/file';
import { renameFile } from '../services/renameFile/renameFile';
import { renameFolder } from '../services/renameFolder/renameFolder';
import { deleteFile } from '../services/deleteFile/deleteFile';
import { deleteFolder } from '../services/deleteFolder/deleteFolder';
import { uploadFile } from '@/entities/Storage/model/services/uploadFile/uploadFile';
import { downloadFile } from '@/entities/Storage/model/services/downloadFile/downloadFile';

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
            })
            .addCase(
                renameFile.fulfilled,
                (state: CloudStorageSchema, action: PayloadAction<File>) => {
                    state.data.files = state.data.files.map((file) =>
                        file.id === action.payload.id ? action.payload : file,
                    );
                },
            )
            .addCase(
                renameFolder.fulfilled,
                (state: CloudStorageSchema, action: PayloadAction<Folder>) => {
                    state.data.folders = state.data.folders.map((folder) =>
                        folder.id === action.payload.id ? action.payload : folder,
                    );
                },
            )
            .addCase(
                deleteFile.fulfilled,
                (
                    state: CloudStorageSchema,
                    action: PayloadAction<{ fileId: number }>,
                ) => {
                    state.data.files = state.data.files.filter(
                        (file) => String(file.id) !== String(action.payload.fileId),
                    );
                },
            )
            .addCase(
                deleteFolder.fulfilled,
                (
                    state: CloudStorageSchema,
                    action: PayloadAction<{ folderId: number }>,
                ) => {
                    state.data.folders = state.data.folders.filter(
                        (folder) => String(folder.id) !== String(action.payload.folderId),
                    );
                },
            )
            .addCase(
                uploadFile.fulfilled,
                (state: CloudStorageSchema, action: PayloadAction<File>) => {
                    state.data.files.push(action.payload);
                },
            )
            .addCase(downloadFile.fulfilled, (state, action) => {});
    },
});

export const { actions: cloudStorageActions } = cloudStorageSlice;
export const { reducer: cloudStorageReducer } = cloudStorageSlice;
