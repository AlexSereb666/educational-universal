import { memo } from 'react';
import * as cls from './NotificationButton.module.scss';
import { NotificationList } from '@/entities/Notification';
import { Popover } from '@/shared/ui/Popover';
import Notification from '@/shared/assets/icons/Notification.svg';
import { Icon } from '@/shared/ui/Icon';

export const NotificationButton = memo(() => {
    const trigger = (
        <Icon
            className={cls.notificationIcon}
            Svg={Notification}
            width={25}
            height={25}
        />
    );

    return (
        <Popover trigger={trigger}>
            <NotificationList />
        </Popover>
    );
});
