import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Notifications} from "./notifications.model";
import {UserNotificationsService} from "../userNotifications/userNotifications.service";

@Injectable()
export class NotificationsService {
    constructor(
        @InjectModel(Notifications) private notificationsRepository: typeof Notifications,
    ) {}

}
