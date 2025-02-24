import {memo} from "react";
import * as cls from './NotificationList.module.scss';
import {useAuthUser} from "shared/lib/hooks/useAuthUser/useAuthUser";
import {useNotifications} from "../../api/notificationApi";
import {VStack} from "@/shared/ui/Stack";
import {NotificationItem} from "../NotificationItem/NotificationItem";
import {Skeleton} from "@/shared/ui/Skeleton";

interface NotificationProps {}

export const NotificationList = memo((props: NotificationProps) => {
    const user = useAuthUser();
    const {
        data,
        isLoading
    } = useNotifications(user.id, {
        pollingInterval: 5000,
    });

    if (isLoading) {
        return (
            <VStack
                gap={'16'}
                max
            >
                <Skeleton width={400} height={50} border={'5%'} />
                <Skeleton width={400} height={50} border={'5%'} />
                <Skeleton width={400} height={50} border={'5%'} />
            </VStack>
        )
    }

    if (!data) {
        return (
            <div className={cls.notFound}>
                Уведомлений нет
            </div>
        )
    }

    return (
        <VStack
            gap={'16'}
            max
            className={cls.NotificationList}
        >
            {data.map((item) => (
                <NotificationItem
                    key={item.id}
                    item={item}
                />
            ))}
        </VStack>
    )
})
