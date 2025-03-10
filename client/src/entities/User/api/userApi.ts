import { JsonSettings } from '../model/types/jsonSettings';
import { rtkApi } from '@/shared/api/rtkApi';
import { User } from '../model/types/user';

interface SetJsonSettingsArg {
    userId: number;
    jsonSettings: JsonSettings;
}

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
            query: ({ userId, jsonSettings }) => ({
                url: `/users/update-settings/${userId}`,
                method: 'PATCH',
                body: {
                    jsonSettings,
                },
            }),
        }),
    }),
});

export const setJsonSettingsMutation = userApi.endpoints.setJsonSettings.initiate;
