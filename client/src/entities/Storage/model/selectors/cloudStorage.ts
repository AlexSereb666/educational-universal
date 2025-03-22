import { buildSelector } from '@/shared/lib/store';
import { StateSchema } from '@/app/providers/StoreProvider';

export const [useCloudStorageData, selectCloudStorageData] = buildSelector(
    (state: StateSchema) => state?.cloudStorage?.data,
);

export const [useCloudStorageIsLoading, selectCloudStorageIsLoading] = buildSelector(
    (state: StateSchema) => state?.cloudStorage?.isLoading,
);

export const [useCloudStorageError, selectCloudStorageError] = buildSelector(
    (state: StateSchema) => state?.cloudStorage?.error,
);
