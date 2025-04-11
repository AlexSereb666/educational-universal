import { memo, useCallback, useEffect } from 'react';
import {
    cloudStoragePreferencesActions,
    getFolder,
    StorageItem,
    uploadFile,
    useCloudStorageCurrentFolderId,
    useCloudStorageData,
    useCloudStorageIsLoading,
    useCloudStorageView,
    useStorageItemDropHandler,
} from '@/entities/Storage';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/Text';
import * as cls from './CloudStorageExplorerList.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAuthUser } from '@/shared/lib/hooks/useAuthUser/useAuthUser';
import { View } from '@/shared/const/view';
import { CloudStorageExplorerViewList } from '../CloudStorageExplorerViewList/CloudStorageExplorerViewList';
import { CloudStorageExplorerViewGrid } from '../CloudStorageExplorerViewGrid/CloudStorageExplorerViewGrid';
import { CloudStorageExplorerSkeleton } from '../CloudStorageExplorerSkeleton/CloudStorageExplorerSkeleton';
import { DragAndDropWrapper } from '@/shared/lib/components/DragAndDropWrapper/DragAndDropWrapper';

interface CloudStorageExplorerListProps {
    className?: string;
}

export const CloudStorageExplorerList = memo((props: CloudStorageExplorerListProps) => {
    const { className } = props;
    const { t } = useTranslation('CloudStorageExplorerList');

    const dispatch = useAppDispatch();
    const user = useAuthUser();
    const data = useCloudStorageData();
    const isLoading = useCloudStorageIsLoading();
    const currentFolderId = useCloudStorageCurrentFolderId();
    const view = useCloudStorageView();

    const handleItemDrop = useStorageItemDropHandler<StorageItem>();

    useEffect(() => {
        if (user?.id) {
            dispatch(
                getFolder({
                    userId: Number(user.id),
                    folderId: currentFolderId,
                }),
            );
        }
    }, [dispatch, currentFolderId, user?.id]);

    const openFolder = useCallback(
        (id: number) => {
            dispatch(cloudStoragePreferencesActions.setCurrentFolderId(id));
        },
        [dispatch],
    );

    const handleFileUploadDrop = (files: File[]) => {
        files.forEach((file) => {
            dispatch(
                cloudStoragePreferencesActions.addFileUploads({
                    fileName: file.name,
                    progress: 0,
                }),
            );
            dispatch(cloudStoragePreferencesActions.setIsActiveUploadFile(true));

            dispatch(
                uploadFile({
                    file,
                    onProgress: (percent) => {
                        dispatch(
                            cloudStoragePreferencesActions.setProgressUploadFile({
                                fileName: file.name,
                                progress: percent,
                            }),
                        );
                    },
                }),
            );
        });
    };

    if (isLoading) {
        return <CloudStorageExplorerSkeleton view={view} />;
    }

    if (data?.items.length === 0) {
        return (
            <div className={cls.notFoundData}>
                <Text size={'large'}>{t('Нет данных')}</Text>
            </div>
        );
    }

    return (
        <DragAndDropWrapper
            className={cls.CloudStorageExplorerList}
            onDrop={handleFileUploadDrop}
            renderDragOverContent={() => (
                <div className={cls.DragAndDrop}>
                    <Text
                        size={'medium'}
                        bold={true}
                    >
                        {t('Перетащите файлы сюда')}
                    </Text>
                </div>
            )}
        >
            {view === View.LIST ? (
                <CloudStorageExplorerViewList
                    className={className}
                    items={data?.items ?? []}
                    openFolder={openFolder}
                    onItemDrop={handleItemDrop}
                />
            ) : (
                <CloudStorageExplorerViewGrid
                    className={className}
                    items={data?.items ?? []}
                    openFolder={openFolder}
                    onItemDrop={handleItemDrop}
                />
            )}
        </DragAndDropWrapper>
    );
});
