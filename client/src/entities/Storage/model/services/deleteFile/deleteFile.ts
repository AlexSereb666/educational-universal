import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '@/entities/User';

interface deleteFileAttrs {
    fileId: number;
}

interface getDeleteFileAttrs {
    fileId: number;
}

export const deleteFile = createAsyncThunk<
    getDeleteFileAttrs,
    deleteFileAttrs,
    ThunkConfig<string>
>('storage/deleteFile', async ({ fileId }, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const user = getUserAuthData(getState());

    try {
        const response = await extra.api.delete<getDeleteFileAttrs>(
            `files/delete/${user.id}/${fileId}`,
        );

        if (!response.data) {
            return rejectWithValue('Ошибка при удалении файла');
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('Ошибка при удалении файла');
    }
});
