import { memo, useCallback } from 'react';
import classNames from 'classnames';
import * as cls from './CloudStorageExplorerViewGrid.module.scss';
import { Text } from '@/shared/ui/Text';
import { StorageItem } from '@/entities/Storage';
import { StorageItemType } from '@/shared/const/storage';
import { StorageItemCard } from '../StorageItemCard/StorageItemCard';
import { View } from '@/shared/const/view';
import { useTranslation } from '@/shared/lib/hooks/useTranslation/useTranslation';

interface CloudStorageExplorerViewGridProps {
    className?: string;
    items: StorageItem[];
    openFolder: (id: number) => void;
    onItemDrop: (draggedItem: StorageItem, targetItem: StorageItem) => void;
}

export const CloudStorageExplorerViewGrid = memo(
    (props: CloudStorageExplorerViewGridProps) => {
        const { className, items, openFolder, onItemDrop } = props;
        const { t } = useTranslation('CloudStorageExplorerViewGrid');

        const handleItemClick = useCallback(
            (item: StorageItem) => {
                if (item.type === StorageItemType.FOLDER) {
                    openFolder(item.id);
                }
            },
            [openFolder],
        );

        return (
            <div className={classNames({}, {}, [className])}>
                <div className={cls.containerGrid}>
                    {items &&
                        items.map((item) => (
                            <StorageItemCard
                                key={`${item.id}.${item.type}`}
                                item={item}
                                view={View.GRID}
                                onClick={handleItemClick}
                                onDropItem={onItemDrop}
                            />
                        ))}
                    {(!items || items.length === 0) && (
                        <div className={cls.emptyGrid}>
                            <Text>{t('Список пуст')}</Text>
                        </div>
                    )}
                </div>
            </div>
        );
    },
);
