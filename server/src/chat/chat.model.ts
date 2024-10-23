import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ChatUser} from "../chatUsers/chatUsers.model";

interface ChatCreationAttrs {
    type: string;
    createdAt: Date;
}

@Table({ tableName: 'chats' })
export class Chat extends Model<Chat, ChatCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    type: string;

    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    createdAt: Date;

    @HasMany(() => ChatUser)
    users: ChatUser[];
}
