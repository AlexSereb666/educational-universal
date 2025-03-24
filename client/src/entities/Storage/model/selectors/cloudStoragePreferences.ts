import { buildSelector } from '@/shared/lib/store';
import { StateSchema } from '@/app/providers/StoreProvider';

export const [useCloudStorageCurrentFolderId, selectCloudStorageCurrentFolderId] =
    buildSelector(
        (state: StateSchema) => state?.cloudStoragePreferences?.currentFolderId,
    );
export const [useCloudStorageView, selectCloudStorageView] = buildSelector(
    (state: StateSchema) => state?.cloudStoragePreferences?.view,
);
export const [useCloudStorageUploadFiles, selectCloudStorageUploadFiles] = buildSelector(
    (state: StateSchema) => state?.cloudStoragePreferences?.uploadFiles,
);
export const [useCloudStorageIsActiveUpload, selectCloudStorageIsActiveUpload] =
    buildSelector((state: StateSchema) => state?.cloudStoragePreferences?.isActiveUpload);
