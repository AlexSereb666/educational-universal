import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {UserNotificationsController} from "./userNotifications.controller";
import {UserNotificationsService} from "./userNotifications.service";
import {UserNotifications} from "./userNotifications.model";

@Module({
    controllers: [UserNotificationsController],
    providers: [UserNotificationsService],
    imports: [
        SequelizeModule.forFeature([UserNotifications]),
    ],
    exports: [],
})
export class UserNotificationsModule {}
