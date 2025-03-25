import { memo, useCallback } from 'react';
import { HStack } from '@/shared/ui/Stack';
import { CloudStorageGoingBack } from '@/features/CloudStorageGoingBack';
import { ViewSelector } from '@/features/ViewSelector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    cloudStoragePreferencesActions,
    useCloudStorageIsActiveUpload,
    useCloudStorageUploadFiles,
    useCloudStorageView,
} from '@/entities/Storage';
import { View } from '@/shared/const/view';
import { CloudStorageAddFolder } from '@/features/CloudStorageAddFolder';
import { CloudStorageUploadFile } from '@/features/CloudStorageUploadFile';
import { UploadWidget } from '../../../UploadWidget';

export const CloudStorageExplorerHeader = memo(() => {
    const dispatch = useAppDispatch();
    const view = useCloudStorageView();
    const uploadFiles = useCloudStorageUploadFiles();
    const isActiveUploads = useCloudStorageIsActiveUpload();

    const onChangeView = useCallback(
        (view: View) => {
            dispatch(cloudStoragePreferencesActions.setView(view));
        },
        [dispatch],
    );

    const onClose = useCallback(() => {
        dispatch(cloudStoragePreferencesActions.setIsActiveUploadFile(false));
        dispatch(cloudStoragePreferencesActions.clearFilesUploads());
    }, [dispatch]);

    return (
        <>
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
                    <CloudStorageUploadFile />
                </HStack>
                <ViewSelector
                    view={view}
                    onViewClick={onChangeView}
                />
            </HStack>
            <UploadWidget
                data={uploadFiles}
                isActive={isActiveUploads}
                onClose={onClose}
            />
        </>
    );
});
