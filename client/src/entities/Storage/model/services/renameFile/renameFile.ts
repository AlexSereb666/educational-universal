import { createAsyncThunk } from '@reduxjs/toolkit';
import { File } from '../../types/file';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '@/entities/User';

interface renameFileAttrs {
    fileId: number;
    newName: string;
}

export const renameFile = createAsyncThunk<File, renameFileAttrs, ThunkConfig<string>>(
    'storage/renameFile',
    async ({ fileId, newName }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        const user = getUserAuthData(getState());

        try {
            const response = await extra.api.patch<File>('/files/rename', {
                userId: user.id,
                fileId,
                newName,
            });

            if (!response.data) {
                return rejectWithValue('Ошибка переименования файла');
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Ошибка переименования файла');
        }
    },
);
