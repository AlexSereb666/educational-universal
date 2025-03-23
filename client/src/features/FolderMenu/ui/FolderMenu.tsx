import { memo, useCallback, useState } from 'react';
import classNames from 'classnames';
import * as cls from './FolderMenu.module.scss';
import { Text } from '@/shared/ui/Text';
import { Dropdown, DropdownItem } from '@/shared/ui/Dropdown';
import { CloudStorageRenameItem } from '../../CloudStorageRenameItem';
import { StorageItem } from '@/shared/const/storage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteFile, deleteFolder } from '@/entities/Storage';

interface FolderMenuProps {
    className?: string;
    id: number;
    type: StorageItem;
}

export const FolderMenu = memo((props: FolderMenuProps) => {
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

    const deleteItem = useCallback(() => {
        if (type === StorageItem.FILE) {
            dispatch(
                deleteFile({
                    fileId: id,
                }),
            );
        } else if (type === StorageItem.FOLDER) {
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
            className={classNames(cls.FolderMenu, {}, [className])}
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
