import {memo} from "react";
import {Notification} from "../../model/types/notification";
import * as cls from './NotificationItem.module.scss';

interface NotificationItemProps {
    item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const {
        item
    } = props;

    const content = (
        <div className={cls.NotificationItem}>
            <div className={cls.NotificationItemTitle}>
                {item.title}
            </div>
            <div className={cls.NotificationItemDescription}>
                {item.description}
            </div>
        </div>
    );

    if (item.href) {
        return (
            <a href={item.href} className={cls.NotificationItemLink}>
                {content}
            </a>
        )
    }

    return content
})
