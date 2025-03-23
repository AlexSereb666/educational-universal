import { createAsyncThunk } from '@reduxjs/toolkit';
import { Folder } from '../../types/folder';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '@/entities/User';

interface renameFolderAttrs {
    folderId: number;
    newName: string;
}

export const renameFolder = createAsyncThunk<
    Folder,
    renameFolderAttrs,
    ThunkConfig<string>
>('storage/renameFolder', async ({ folderId, newName }, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const user = getUserAuthData(getState());

    try {
        const response = await extra.api.patch<Folder>('folders/rename', {
            userId: user.id,
            folderId,
            newName,
        });

        if (!response.data) {
            return rejectWithValue('Ошибка переименования папки');
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('Ошибка переименования папки');
    }
});
