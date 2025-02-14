import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {UserNotificationsService} from "./userNotifications.service";

@Controller('user-notifications')
export class UserNotificationsController {
    constructor(private userNotificationsService: UserNotificationsService) {}

    @Post('add-notification')
    addNotification(@Body() userId: number, @Body() notificationId: number) {
        this.userNotificationsService.addNotificationToUser(userId, notificationId);
    }

    @Get('change-is-read')
    changeIsRead(@Param('id') id: number) {
        this.userNotificationsService.changeIsReadNotification(id);
    }

    @Get('notifications/:id')
    getAllNotificationsUserById(@Param('id') userId: number) {
        return this.userNotificationsService.getAllNotificationsUserById(userId);
    }
}
