import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '@/entities/User';
import { Folder } from '../../types/folder';

interface moveFolderAttrs {
    folderId: number;
    targetParentId: number | null;
}

export const moveFolder = createAsyncThunk<Folder, moveFolderAttrs, ThunkConfig<string>>(
    'storage/move/folder',
    async ({ folderId, targetParentId }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const user = getUserAuthData(getState());

        try {
            const response = await extra.api.patch<Folder>(`folders/move`, {
                userId: user.id,
                folderId,
                targetParentId,
            });

            if (!response.data) {
                return rejectWithValue('Ошибка при перемещении папки');
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Ошибка при перемещении папки');
        }
    },
);
