import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '@/entities/User';

interface deleteFolderAttrs {
    folderId: number;
}

interface getDeleteFolderAttrs {
    folderId: number;
}

export const deleteFolder = createAsyncThunk<
    getDeleteFolderAttrs,
    deleteFolderAttrs,
    ThunkConfig<string>
>('storage/deleteFolder', async ({ folderId }, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const user = getUserAuthData(getState());

    try {
        const response = await extra.api.delete<getDeleteFolderAttrs>(
            `folders/delete/${user.id}/${folderId}`,
        );

        if (!response.data) {
            return rejectWithValue('Ошибка при удалении папки');
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('Ошибка при удалении папки');
    }
});
