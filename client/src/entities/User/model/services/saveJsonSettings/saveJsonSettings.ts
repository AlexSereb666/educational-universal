import { createAsyncThunk } from '@reduxjs/toolkit';
import { JsonSettings } from '../../types/jsonSettings';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '../../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../../selectors/jsonSettingsSelectors';
import { setJsonSettingsMutation } from '../../../api/userApi';

export const saveJsonSettings = createAsyncThunk<
    JsonSettings,
    JsonSettings,
    ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;
    const userData = getUserAuthData(getState());
    const currentSettings = getJsonSettings(getState());

    try {
        const response = await dispatch(
            setJsonSettingsMutation({
                userId: Number(userData.id),
                jsonSettings: {
                    ...currentSettings,
                    ...newJsonSettings,
                },
            }),
        ).unwrap();

        if (!response.jsonSettings) {
            return rejectWithValue('Настройки пользователя не вернулись');
        }

        return response.jsonSettings;
    } catch (e) {
        console.log(e);
    }
});
