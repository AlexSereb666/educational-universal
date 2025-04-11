import { memo, useCallback } from 'react';
import ArrowBackIcon from '@/shared/assets/icons/ArrowBack.svg';
import { Icon } from '@/shared/ui/Icon';
import * as cls from './CloudStorageGoingBack.module.scss';
import {
    cloudStoragePreferencesActions,
    StorageItem,
    useCloudStorageData,
    useStorageItemDropHandler,
} from '@/entities/Storage';
import classNames from 'classnames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDroppable } from '@/shared/lib/hooks/dragAndDrop';

type BackButtonDropZoneData = {
    type: 'backButton';
    parentId: number | null | undefined;
};

export const CloudStorageGoingBack = memo(() => {
    const dispatch = useAppDispatch();
    const data = useCloudStorageData();

    const handleDrop = useStorageItemDropHandler<BackButtonDropZoneData>();

    const onClick = useCallback(() => {
        dispatch(
            cloudStoragePreferencesActions.setCurrentFolderId(
                data?.currentFolder?.parentId,
            ),
        );
    }, [dispatch, data]);

    const { droppableProps, isOver } = useDroppable<StorageItem, BackButtonDropZoneData>({
        dropZoneData: {
            type: 'backButton',
            parentId: data?.currentFolder?.parentId,
        },
        onDrop: handleDrop,
    });

    const isDisabled = data?.currentFolder === null;

    const iconClassName = classNames(cls.CloudStorageGoingBack, {
        [cls.disabled]: isDisabled,
        [cls.active]: !isDisabled,
        [cls.over]: isOver && !isDisabled,
    });

    return (
        <span {...droppableProps}>
            <Icon
                Svg={ArrowBackIcon}
                width={24}
                height={24}
                className={iconClassName}
                onClick={isDisabled ? undefined : () => onClick()}
            />
        </span>
    );
});
