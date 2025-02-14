import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {Notifications} from "../notifications/notifications.model";

interface UserNotificationsAttrs {
    userId: number;
    notificationId: number;
    isRead: boolean;
}

@Table({tableName: 'user_notifications'})
export class UserNotifications extends Model<UserNotifications, UserNotificationsAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @ForeignKey(() => Notifications)
    @Column({ type: DataType.INTEGER, allowNull: false })
    notificationId: number;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    isRead: boolean;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Notifications)
    notification: Notifications;
}
