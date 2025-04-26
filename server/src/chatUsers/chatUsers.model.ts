import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { Chat } from '../chat/chat.model';
import { User } from '../users/users.model';

@Table({ tableName: 'chat_users' })
export class ChatUser extends Model<ChatUser> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Chat)
    @Column({ type: DataType.INTEGER })
    chatId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @BelongsTo(() => Chat, { onDelete: 'CASCADE', hooks: true })
    chat: Chat;

    @BelongsTo(() => User, { onDelete: 'CASCADE', hooks: true })
    user: User;
}
