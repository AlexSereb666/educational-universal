import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {Role} from "../roles/roles.model";

interface UserRolesAttrs {
    userId: number;
    roleId: number;
}

@Table({ tableName: 'user_roles' })
export class UserRoles extends Model<UserRoles, UserRolesAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER, allowNull: false })
    roleId: number;
}
