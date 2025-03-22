import { memo, useCallback, useEffect } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import {
    cloudStoragePreferencesActions,
    getFolder,
    useCloudStorageCurrentFolderId,
    useCloudStorageData,
    useCloudStorageIsLoading,
} from '@/entities/Storage';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/Text';
import * as cls from './CloudStorageExplorerList.module.scss';
import FolderIcon from '@/shared/assets/icons/Folder.svg';
import FileIcon from '@/shared/assets/icons/File.svg';
import { Icon } from '@/shared/ui/Icon';
import { formatDate } from '@/shared/lib/date/formatDate';
import { truncateString } from '@/shared/lib/string/truncateString';
import { formatBytes } from '@/shared/lib/size/formatBytes';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import classNames from 'classnames';
import { useAuthUser } from '@/shared/lib/hooks/useAuthUser/useAuthUser';
import { Input } from '@/shared/ui/Input';

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

    useEffect(() => {
        dispatch(
            getFolder({
                userId: Number(user.id),
                folderId: currentFolderId,
            }),
        );
    }, [dispatch, currentFolderId]);

    const openFolder = useCallback(
        (id: number) => {
            dispatch(cloudStoragePreferencesActions.setCurrentFolderId(id));
        },
        [dispatch],
    );

    if (isLoading) {
        return (
            <VStack
                gap={'32'}
                max
            >
                {[...Array(5)].map((_, i) => (
                    <Skeleton
                        key={i}
                        width={'100%'}
                        height={50}
                    />
                ))}
            </VStack>
        );
    }

    if (data?.files.length === 0 && data?.folders.length === 0) {
        return (
            <div className={cls.notFoundData}>
                <Text size={'large'}>{t('Нет данных')}</Text>
            </div>
        );
    }

    return (
        <div className={classNames(cls.CloudStorageExplorerList, {}, [className])}>
            <div className={cls.header}>
                <Text bold={true}>{t('Название')}</Text>
                <Text bold={true}>{t('Дата')}</Text>
                <Text bold={true}>{t('Размер')}</Text>
                <Text bold={true}>{t('Тип')}</Text>
            </div>
            <div className={cls.list}>
                {data?.folders.map((folder) => (
                    <div
                        key={folder.id}
                        className={cls.row}
                        onClick={() => openFolder(folder.id)}
                    >
                        <span>
                            <Icon
                                Svg={FolderIcon}
                                width={24}
                                height={24}
                                className={cls.icon}
                            />
                            <Text>{folder.name}</Text>
                        </span>
                        <Text>{formatDate(folder.createdAt)}</Text>
                        <Text>--</Text>
                        <Text>{t('Папка')}</Text>
                        <Text>⋮</Text>
                    </div>
                ))}
                {data?.files.map((file) => (
                    <div
                        key={file.id}
                        className={cls.row}
                    >
                        <span>
                            <Icon
                                Svg={FileIcon}
                                width={24}
                                height={24}
                                className={cls.icon}
                            />
                            <Text>{truncateString(file.name, 16)}</Text>
                        </span>
                        <Text>{formatDate(file.createdAt)}</Text>
                        <Text>{formatBytes(file.size)}</Text>
                        <Text>{file.mimeType}</Text>
                        <Text>⋮</Text>
                    </div>
                ))}
            </div>
        </div>
    );
});
