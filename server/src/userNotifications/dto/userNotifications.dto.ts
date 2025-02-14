export class UserNotificationsDto {
    id;
    title;
    description;
    href;
    isRead;
    createdAt;

    constructor(model) {
        this.id = model.notificationId;
        this.title = model.notification.title;
        this.description = model.notification.description;
        this.href = model.notification.href;
        this.isRead = model.isRead;
        this.createdAt = model.createdAt;
    }
}
