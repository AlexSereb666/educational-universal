import { memo, useCallback } from 'react';
import classNames from 'classnames';
import * as cls from './CloudStorageExplorerViewList.module.scss';
import { Text } from '@/shared/ui/Text';
import { useTranslation } from 'react-i18next';
import { StorageItem } from '@/entities/Storage';
import { StorageItemType } from '@/shared/const/storage';
import { StorageItemCard } from '../StorageItemCard/StorageItemCard';
import { View } from '@/shared/const/view';

interface CloudStorageExplorerViewListProps {
    className?: string;
    items: StorageItem[];
    openFolder: (id: number) => void;
    onItemDrop: (draggedItem: StorageItem, targetItem: StorageItem) => void;
}

export const CloudStorageExplorerViewList = memo(
    (props: CloudStorageExplorerViewListProps) => {
        const { className, items, openFolder, onItemDrop } = props;
        const { t } = useTranslation('CloudStorageExplorerViewList');

        const handleItemClick = useCallback(
            (item: StorageItem) => {
                if (item.type === StorageItemType.FOLDER) {
                    openFolder(item.id);
                }
            },
            [openFolder],
        );

        return (
            <div
                className={classNames(cls.CloudStorageExplorerViewList, {}, [className])}
            >
                <div className={cls.header}>
                    <Text bold>{t('Название')}</Text>
                    <Text bold>{t('Дата')}</Text>
                    <Text bold>{t('Размер')}</Text>
                    <Text bold>{t('Тип')}</Text>
                </div>
                <div className={cls.list}>
                    {items &&
                        items.map((item) => (
                            <StorageItemCard
                                key={`${item.id}.${item.type}`}
                                item={item}
                                view={View.LIST}
                                onClick={handleItemClick}
                                onDropItem={onItemDrop}
                            />
                        ))}
                    {(!items || items.length === 0) && (
                        <div className={cls.emptyList}>
                            <Text>{t('Список пуст')}</Text>
                        </div>
                    )}
                </div>
            </div>
        );
    },
);
