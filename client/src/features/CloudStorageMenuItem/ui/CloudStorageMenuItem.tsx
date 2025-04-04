import { memo, useCallback, useState } from 'react';
import classNames from 'classnames';
import * as cls from './CloudStorageMenuItem.module.scss';
import { Text } from '@/shared/ui/Text';
import { Dropdown, DropdownItem } from '@/shared/ui/Dropdown';
import { CloudStorageRenameItem } from '../../CloudStorageRenameItem';
import { StorageItemType } from '@/shared/const/storage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteFile, deleteFolder, downloadFile } from '@/entities/Storage';

interface CloudStorageMenuItemProps {
    className?: string;
    id: number;
    type: StorageItemType;
}

export const CloudStorageMenuItem = memo((props: CloudStorageMenuItemProps) => {
    const { id, type, className } = props;
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();

    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    const openModal = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    const downloadItem = useCallback(() => {
        dispatch(
            downloadFile({
                fileId: id,
            }),
        );
    }, [dispatch, id]);

    const deleteItem = useCallback(() => {
        if (type === StorageItemType.FILE) {
            dispatch(
                deleteFile({
                    fileId: id,
                }),
            );
        } else if (type === StorageItemType.FOLDER) {
            dispatch(
                deleteFolder({
                    folderId: id,
                }),
            );
        }
    }, [dispatch, id, type]);

    const items: DropdownItem[] = [
        {
            content: 'Переименовать',
            onClick: openModal,
        },
        ...(type === StorageItemType.FILE
            ? [
                  {
                      content: 'Скачать',
                      onClick: downloadItem,
                  },
              ]
            : []),
        {
            content: 'Поделиться',
        },
        {
            content: 'Удалить',
            onClick: deleteItem,
        },
    ];

    return (
        <div
            className={classNames(cls.CloudStorageMenuItem, {}, [className])}
            onClick={onClick}
        >
            <Dropdown
                items={items}
                trigger={
                    <Text
                        className={cls.text}
                        size={'medium'}
                    >
                        ⋮
                    </Text>
                }
            />
            <CloudStorageRenameItem
                id={id}
                isOpen={isOpen}
                type={type}
                onClose={closeModal}
            />
        </div>
    );
});
