import { StateSchema } from '@/app/providers/StoreProvider';

export const getSettingsCurrentTab = (state: StateSchema) => state?.settings?.currentTab;
