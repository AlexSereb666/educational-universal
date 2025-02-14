import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {UserNotifications} from "../userNotifications/userNotifications.model";

interface NotificationAttrs {
    title: string;
    description: string;
    href: string;
}

@Table({tableName: 'notifications'})
export class Notifications extends Model<Notifications, NotificationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.TEXT, allowNull: false})
    description: string;

    @Column({type: DataType.STRING})
    href: string;

    @BelongsToMany(() => User, () => UserNotifications)
    users: User[];
}
