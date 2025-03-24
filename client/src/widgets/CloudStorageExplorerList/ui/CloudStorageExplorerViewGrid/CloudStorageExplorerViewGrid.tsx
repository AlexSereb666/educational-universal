import { memo } from 'react';
import classNames from 'classnames';
import * as cls from './CloudStorageExplorerViewGrid.module.scss';
import { CloudStorageMenuItem } from '@/features/CloudStorageMenuItem';
import { StorageItem } from '@/shared/const/storage';
import { Icon } from '@/shared/ui/Icon';
import FolderIcon from '@/shared/assets/icons/Folder.svg';
import { Text } from '@/shared/ui/Text';
import { truncateString } from '@/shared/lib/string/truncateString';
import FileIcon from '@/shared/assets/icons/File.svg';
import { File, Folder } from '@/entities/Storage';

interface CloudStorageExplorerViewGridProps {
    className?: string;
    folders: Folder[];
    files: File[];
    openFolder: (id: number) => void;
}

export const CloudStorageExplorerViewGrid = memo(
    (props: CloudStorageExplorerViewGridProps) => {
        const { className, folders, files, openFolder } = props;

        return (
            <div
                className={classNames(cls.CloudStorageExplorerViewGrid, {}, [className])}
            >
                <div className={cls.containerGrid}>
                    {folders &&
                        folders.map((folder) => (
                            <div
                                key={folder.id}
                                onClick={() => openFolder(folder.id)}
                                className={cls.container}
                            >
                                <CloudStorageMenuItem
                                    id={folder.id}
                                    type={StorageItem.FOLDER}
                                    className={cls.FolderMenu}
                                />
                                <Icon
                                    Svg={FolderIcon}
                                    width={100}
                                    height={100}
                                    className={cls.icon}
                                />
                                <Text>{truncateString(folder.name, 16)}</Text>
                            </div>
                        ))}
                    {files &&
                        files.map((file) => (
                            <div
                                key={file.id}
                                className={cls.container}
                            >
                                <CloudStorageMenuItem
                                    id={file.id}
                                    type={StorageItem.FILE}
                                    className={cls.FolderMenu}
                                />
                                <Icon
                                    Svg={FileIcon}
                                    width={100}
                                    height={100}
                                    className={cls.icon}
                                />
                                <Text>{truncateString(file.name, 16)}</Text>
                            </div>
                        ))}
                </div>
            </div>
        );
    },
);
