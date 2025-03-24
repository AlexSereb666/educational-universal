import { memo } from 'react';
import classNames from 'classnames';
import * as cls from './CloudStorageExplorerViewList.module.scss';
import { Text } from '@/shared/ui/Text';
import { Icon } from '@/shared/ui/Icon';
import FolderIcon from '@/shared/assets/icons/Folder.svg';
import { truncateString } from '@/shared/lib/string/truncateString';
import { formatDate } from '@/shared/lib/date/formatDate';
import { CloudStorageMenuItem } from '@/features/CloudStorageMenuItem';
import { StorageItem } from '@/shared/const/storage';
import FileIcon from '@/shared/assets/icons/File.svg';
import { formatBytes } from '@/shared/lib/size/formatBytes';
import { useTranslation } from 'react-i18next';
import { File, Folder } from '@/entities/Storage';

interface CloudStorageExplorerViewListProps {
    className?: string;
    folders: Folder[];
    files: File[];
    openFolder: (id: number) => void;
}

export const CloudStorageExplorerViewList = memo(
    (props: CloudStorageExplorerViewListProps) => {
        const { className, folders, files, openFolder } = props;

        const { t } = useTranslation('CloudStorageExplorerViewList');

        return (
            <div
                className={classNames(cls.CloudStorageExplorerViewList, {}, [className])}
            >
                <div className={cls.header}>
                    <Text bold={true}>{t('Название')}</Text>
                    <Text bold={true}>{t('Дата')}</Text>
                    <Text bold={true}>{t('Размер')}</Text>
                    <Text bold={true}>{t('Тип')}</Text>
                </div>
                <div className={cls.list}>
                    {folders &&
                        folders.map((folder) => (
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
                                    <Text>{truncateString(folder.name, 16)}</Text>
                                </span>
                                <Text>{formatDate(folder.createdAt)}</Text>
                                <Text>--</Text>
                                <Text>{t('Папка')}</Text>
                                <CloudStorageMenuItem
                                    id={folder.id}
                                    type={StorageItem.FOLDER}
                                />
                            </div>
                        ))}
                    {files &&
                        files.map((file) => (
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
                                <CloudStorageMenuItem
                                    id={file.id}
                                    type={StorageItem.FILE}
                                />
                            </div>
                        ))}
                </div>
            </div>
        );
    },
);
