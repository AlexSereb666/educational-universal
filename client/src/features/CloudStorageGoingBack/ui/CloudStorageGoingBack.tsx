import { memo, useCallback } from 'react';
import ArrowBackIcon from '@/shared/assets/icons/ArrowBack.svg';
import { Icon } from '@/shared/ui/Icon';
import * as cls from './CloudStorageGoingBack.module.scss';
import { cloudStoragePreferencesActions, useCloudStorageData } from '@/entities/Storage';
import classNames from 'classnames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export const CloudStorageGoingBack = memo(() => {
    const dispatch = useAppDispatch();
    const data = useCloudStorageData();

    const onClick = useCallback(() => {
        dispatch(
            cloudStoragePreferencesActions.setCurrentFolderId(
                data?.currentFolder?.parentId,
            ),
        );
    }, [dispatch]);

    const isDisabled = data?.currentFolder === null;

    return (
        <Icon
            Svg={ArrowBackIcon}
            width={24}
            height={24}
            className={classNames(cls.CloudStorageGoingBack, {
                [cls.disabled]: isDisabled,
                [cls.active]: !isDisabled,
            })}
            onClick={isDisabled ? undefined : () => onClick()}
        />
    );
});
