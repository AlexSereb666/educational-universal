import { SettingsSchema } from '../types/settings';
import { SettingsTabs } from '@/shared/const/settings';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SettingsSchema = {
    currentTab: SettingsTabs.main,
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setCurrentTab: (state, action: PayloadAction<SettingsTabs>) => {
            state.currentTab = action.payload;
        },
    },
});

export const { actions: settingsActions } = settingsSlice;
export const { reducer: settingsReducer } = settingsSlice;
