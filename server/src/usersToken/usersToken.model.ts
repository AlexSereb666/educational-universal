import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";

interface UsersTokenAttrs {
    refreshToken: string;
    userId: number;
}

@Table({tableName: 'users_token'})
export class UsersToken extends Model<UsersToken, UsersTokenAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    refreshToken: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @BelongsTo(() => User, { onDelete: 'CASCADE', hooks: true })
    user: User;
}
