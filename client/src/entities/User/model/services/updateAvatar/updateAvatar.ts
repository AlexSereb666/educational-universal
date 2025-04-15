import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '../../selectors/getUserAuthData/getUserAuthData';

interface UpdateAvatarAttrs {
    avatar: File;
}

export const updateAvatar = createAsyncThunk<
    string,
    UpdateAvatarAttrs,
    ThunkConfig<string>
>('user/updateAvatar', async ({ avatar }, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi;

    const user = getUserAuthData(getState());

    const formData = new FormData();
    formData.append('avatar', avatar);

    try {
        const response = await extra.api.patch<string>(
            `users/${user.id}/avatar`,
            formData,
        );

        if (!response.data) {
            return rejectWithValue('Ошибка при смене аватарки пользователя');
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('Ошибка при смене аватарки пользователя');
    }
});
