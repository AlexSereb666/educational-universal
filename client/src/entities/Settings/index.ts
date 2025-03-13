export type { SettingsSchema } from './model/types/settings';

export { settingsActions, settingsReducer } from './model/slice/settingsSlice';

export { getSettingsCurrentTab } from './model/selectors/settings';
