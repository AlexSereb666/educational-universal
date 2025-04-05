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
import { uploadFile } from '../services/uploadFile/uploadFile';
import { downloadFile } from '../services/downloadFile/downloadFile';
import { StorageItemType } from '@/shared/const/storage';
import { moveFile } from '../services/moveFile/moveFile';
import { moveFolder } from '@/entities/Storage/model/services/moveFolder/moveFolder';

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
                    state.data.items.push({
                        ...action.payload,
                        type: StorageItemType.FOLDER,
                    });
                },
            )
            .addCase(addFolder.rejected, (state: CloudStorageSchema, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(
                renameFile.fulfilled,
                (state: CloudStorageSchema, action: PayloadAction<File>) => {
                    state.data.items = state.data.items.map((item) =>
                        item.id === action.payload.id &&
                        item.type === StorageItemType.FILE
                            ? { ...action.payload, type: StorageItemType.FILE }
                            : item,
                    );
                },
            )
            .addCase(
                renameFolder.fulfilled,
                (state: CloudStorageSchema, action: PayloadAction<Folder>) => {
                    state.data.items = state.data.items.map((item) =>
                        item.id === action.payload.id &&
                        item.type === StorageItemType.FOLDER
                            ? { ...action.payload, type: StorageItemType.FOLDER }
                            : item,
                    );
                },
            )
            .addCase(
                deleteFile.fulfilled,
                (
                    state: CloudStorageSchema,
                    action: PayloadAction<{ fileId: number }>,
                ) => {
                    state.data.items = state.data.items.filter(
                        (item) =>
                            !(
                                String(item.id) === String(action.payload.fileId) &&
                                item.type === StorageItemType.FILE
                            ),
                    );
                },
            )
            .addCase(
                deleteFolder.fulfilled,
                (
                    state: CloudStorageSchema,
                    action: PayloadAction<{ folderId: number }>,
                ) => {
                    state.data.items = state.data.items.filter(
                        (item) =>
                            !(
                                String(item.id) === String(action.payload.folderId) &&
                                item.type === StorageItemType.FOLDER
                            ),
                    );
                },
            )
            .addCase(
                uploadFile.fulfilled,
                (state: CloudStorageSchema, action: PayloadAction<File>) => {
                    state.data.items.push({
                        ...action.payload,
                        type: StorageItemType.FILE,
                    });
                },
            )
            .addCase(downloadFile.fulfilled, (state, action) => {})
            .addCase(moveFile.fulfilled, (state, action: PayloadAction<File>) => {
                state.data.items = state.data.items.filter(
                    (item) =>
                        !(
                            String(item.id) === String(action.payload.id) &&
                            item.type === StorageItemType.FILE
                        ),
                );
            })
            .addCase(moveFolder.fulfilled, (state, action: PayloadAction<Folder>) => {
                state.data.items = state.data.items.filter(
                    (item) =>
                        !(
                            String(item.id) === String(action.payload.id) &&
                            item.type === StorageItemType.FOLDER
                        ),
                );
            });
    },
});

export const { actions: cloudStorageActions } = cloudStorageSlice;
export const { reducer: cloudStorageReducer } = cloudStorageSlice;
