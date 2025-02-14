import {rtkApi} from "shared/api/rtkApi";
import {Notification} from "../model/types/notification";

const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<Notification[], number>({
            query: (id) => ({
                url: `/user-notifications/notifications/${id}`
            }),
        }),
    }),
});

export const useNotifications = notificationApi.useGetNotificationsQuery;
