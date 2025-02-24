import {memo} from "react";
import * as cls from "./NotificationButton.module.scss";
import {NotificationList} from "entities/Notification";
import {Popover} from "@/shared/ui/Popover";
import notificationIcon from 'shared/assets/notification.png';

export const NotificationButton = memo(() => {
    const trigger = (
        <img
            className={cls.notificationIcon}
            src={notificationIcon}
            alt={'Нет иконки'}
        />
    );

    return (
        <Popover
            trigger={trigger}
        >
            <NotificationList />
        </Popover>
    )
});
