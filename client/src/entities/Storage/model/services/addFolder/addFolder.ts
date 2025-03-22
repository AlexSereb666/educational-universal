import { createAsyncThunk } from '@reduxjs/toolkit';
import { Folder } from '../../types/folder';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { selectCloudStorageData } from '../../selectors/cloudStorage';
import { getUserAuthData } from '@/entities/User';

export const addFolder = createAsyncThunk<Folder, string, ThunkConfig<string>>(
    'storage/addFolder',
    async (name, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        const user = getUserAuthData(getState());
        const data = selectCloudStorageData(getState());
        const parentId = data.currentFolder?.id ?? undefined;

        try {
            const response = await extra.api.post<Folder>(`/folders/create/${user.id}`, {
                name,
                parentId,
            });

            if (!response.data) {
                return rejectWithValue('Ошибка создания папки');
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Ошибка создания папки');
        }
    },
);
