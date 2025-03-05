import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import { Chat } from '../chat/chat.model';
import { User } from '../users/users.model';

@Table({ tableName: 'chat_messages' })
export class Message extends Model<Message> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Chat)
    @Column({ type: DataType.INTEGER })
    chatId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @Column({ type: DataType.STRING, allowNull: false })
    text: string;

    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    createdAt: Date;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isRead: boolean;

    @BelongsTo(() => Chat, { onDelete: 'CASCADE', hooks: true })
    chat: Chat;

    @BelongsTo(() => User, { onDelete: 'CASCADE', hooks: true })
    user: User;
}
