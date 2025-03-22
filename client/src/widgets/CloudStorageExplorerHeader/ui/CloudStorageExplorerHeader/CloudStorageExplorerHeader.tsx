import { memo, useCallback } from 'react';
import { HStack } from '@/shared/ui/Stack';
import { CloudStorageGoingBack } from '@/features/CloudStorageGoingBack';
import { ViewSelector } from '@/features/ViewSelector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { cloudStoragePreferencesActions, useCloudStorageView } from '@/entities/Storage';
import { View } from '@/shared/const/view';
import { CloudStorageAddFolder } from '@/features/CloudStorageAddFolder';

export const CloudStorageExplorerHeader = memo(() => {
    const dispatch = useAppDispatch();
    const view = useCloudStorageView();

    const onChangeView = useCallback(
        (view: View) => {
            dispatch(cloudStoragePreferencesActions.setView(view));
        },
        [dispatch],
    );

    return (
        <HStack
            max
            justify={'between'}
        >
            <HStack
                max
                gap={'16'}
            >
                <CloudStorageGoingBack />
                <CloudStorageAddFolder />
            </HStack>
            <ViewSelector
                view={view}
                onViewClick={onChangeView}
            />
        </HStack>
    );
});
