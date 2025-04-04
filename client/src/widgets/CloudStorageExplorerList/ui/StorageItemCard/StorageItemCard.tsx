import { StorageItem } from '../../../../entities/Storage/model/types/CloudStorage';
import { View } from '@/shared/const/view';
import { memo, useCallback } from 'react';
import { useTranslation } from '@/shared/lib/hooks/useTranslation/useTranslation';
import { useDraggable, useDroppable } from '@/shared/lib/hooks/dragAndDrop';
import { StorageItemType } from '@/shared/const/storage';
import * as clsList from './StorageItemCardList.module.scss';
import * as clsGrid from './StorageItemCardGrid.module.scss';
import classNames from 'classnames';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';
import { truncateString } from '@/shared/lib/string/truncateString';
import { formatBytes } from '@/shared/lib/size/formatBytes';
import { CloudStorageMenuItem } from '@/features/CloudStorageMenuItem';
import FolderIcon from '@/shared/assets/icons/Folder.svg';
import FileIcon from '@/shared/assets/icons/File.svg';
import { formatDate } from '@/shared/lib/date/formatDate';

interface StorageItemCardProps {
    className?: string;
    item: StorageItem;
    view: View;
    onClick?: (item: StorageItem) => void;
    onDropItem: (draggedItem: StorageItem, targetItem: StorageItem) => void;
}

export const StorageItemCard = memo((props: StorageItemCardProps) => {
    const { className, item, view, onClick, onDropItem } = props;
    const { t } = useTranslation('StorageItemCard');

    const { draggableProps, isDragging } = useDraggable<StorageItem>({
        itemData: item,
    });

    const handleDrop = useCallback(
        (draggedItem: StorageItem, droppedOnItem: StorageItem) => {
            onDropItem(draggedItem, droppedOnItem);
        },
        [onDropItem],
    );

    const canDrop = useCallback(
        (draggedItem: StorageItem, targetItem: StorageItem): boolean => {
            const isSelf =
                draggedItem.id === targetItem.id && draggedItem.type === targetItem.type;
            const isTargetFolder = targetItem.type === StorageItemType.FOLDER;
            const result = !isSelf && isTargetFolder;

            return result;
        },
        [],
    );

    const { droppableProps, isOver } = useDroppable<StorageItem, StorageItem>({
        dropZoneData: item,
        onDrop: handleDrop,
        canDrop: canDrop,
    });

    const handleClick = useCallback(() => {
        if (isDragging) return;
        onClick?.(item);
    }, [item, onClick, isDragging]);

    const cls = view === View.LIST ? clsList : clsGrid;

    const mods = {
        [cls.dragging]: isDragging,
        [cls.over]: isOver && item.type === StorageItemType.FOLDER && !isDragging,
    };

    const commonProps = {
        className: classNames(cls.card, mods, [className]),
        ...draggableProps,
        ...droppableProps,
        onClick: !isDragging ? handleClick : undefined,
        title: item.name,
    };

    if (view === View.LIST) {
        return (
            <div {...commonProps}>
                <span>
                    <Icon
                        Svg={item.type === StorageItemType.FOLDER ? FolderIcon : FileIcon}
                        width={24}
                        height={24}
                        className={cls.icon}
                    />
                    <Text>{truncateString(item.name, 16)}</Text>
                </span>
                <Text>{formatDate(item.createdAt)}</Text>
                <Text>
                    {item.type === StorageItemType.FOLDER ? '--' : formatBytes(item.size)}
                </Text>
                <Text>
                    {item.type === StorageItemType.FOLDER ? t('Папка') : item.mimeType}
                </Text>
                <CloudStorageMenuItem
                    id={item.id}
                    type={item.type}
                    className={cls.menu}
                />
            </div>
        );
    }

    if (view === View.GRID) {
        return (
            <div {...commonProps}>
                <CloudStorageMenuItem
                    id={item.id}
                    type={item.type}
                    className={cls.menu}
                />
                <Icon
                    Svg={item.type === StorageItemType.FOLDER ? FolderIcon : FileIcon}
                    width={100}
                    height={100}
                    className={cls.icon}
                />
                <Text className={cls.name}>{truncateString(item.name, 16)}</Text>
            </div>
        );
    }

    return null;
});
