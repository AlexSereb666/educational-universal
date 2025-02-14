import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {NotificationsService} from "./notifications.service";
import {NotificationsController} from "./notifications.controller";
import {Notifications} from "./notifications.model";

@Module({
    controllers: [NotificationsController],
    providers: [NotificationsService],
    imports: [
        SequelizeModule.forFeature([Notifications]),
    ],
    exports: [],
})
export class NotificationsModule {}
