import { File } from '../../types/file';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '@/entities/User';

interface moveFileAttrs {
    fileId: number;
    targetFolderId: number | null;
}

export const moveFile = createAsyncThunk<File, moveFileAttrs, ThunkConfig<string>>(
    'storage/move/file',
    async ({ fileId, targetFolderId }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const user = getUserAuthData(getState());

        try {
            const response = await extra.api.patch<File>(`files/move`, {
                userId: user.id,
                fileId,
                targetFolderId,
            });

            if (!response.data) {
                return rejectWithValue('Ошибка при перемещении файла');
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Ошибка при перемещении файла');
        }
    },
);
