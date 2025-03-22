import { buildSelector } from '@/shared/lib/store';
import { StateSchema } from '@/app/providers/StoreProvider';

export const [useCloudStorageCurrentFolderId, selectCloudStorageCurrentFolderId] =
    buildSelector(
        (state: StateSchema) => state?.cloudStoragePreferences?.currentFolderId,
    );
export const [useCloudStorageView, selectCloudStorageView] = buildSelector(
    (state: StateSchema) => state?.cloudStoragePreferences?.view,
);
