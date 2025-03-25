import { buildSelector } from '@/shared/lib/store';
import { StateSchema } from '@/app/providers/StoreProvider';

export const [useToastData, selectToastData] = buildSelector(
    (state: StateSchema) => state?.toast?.toasts,
);
