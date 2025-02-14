import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {UserNotifications} from "./userNotifications.model";
import {Notifications} from "../notifications/notifications.model";
import {UserNotificationsDto} from "./dto/userNotifications.dto";

@Injectable()
export class UserNotificationsService {
    constructor(
        @InjectModel(UserNotifications) private userNotificationsRepository: typeof UserNotifications
    ) {}

    async addNotificationToUser(userId: number, notificationId: number) {
        return this.userNotificationsRepository.create({
            userId,
            notificationId,
        });
    }

    async changeIsReadNotification(id: number) {
        const notification = await this.userNotificationsRepository.findByPk(id);
        if (!notification) {
            throw new Error('Уведомление не найдено');
        }

        notification.isRead = true;
        await notification.save();

        return notification;
    }

    async getAllNotificationsUserById(userId: number) {
        const notifications = await this.userNotificationsRepository.findAll({
            where: { userId, isRead: false },
            include: [{ model: Notifications }]
        });

        return notifications.map(notification => new UserNotificationsDto(notification));
    }
}
