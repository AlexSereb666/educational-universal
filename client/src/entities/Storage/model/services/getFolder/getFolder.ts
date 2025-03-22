import { createAsyncThunk } from '@reduxjs/toolkit';
import { CloudStorage } from '../../..';
import { ThunkConfig } from '@/app/providers/StoreProvider';

interface getFolderAttrs {
    userId: number;
    folderId?: number;
}

export const getFolder = createAsyncThunk<
    CloudStorage,
    getFolderAttrs,
    ThunkConfig<string>
>('storage/getFolder', async ({ userId, folderId }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<CloudStorage>('/folders/contents', {
            params: {
                userId,
                folderId,
            },
        });

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('Ошибка получения данных');
    }
});
