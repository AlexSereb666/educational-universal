import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Role} from "../roles/roles.model";
import {Permissions} from "../permissions/permissions.model";

interface RolePermissionsAttrs {
    roleId: number;
    permissionId: number;
}

@Table({ tableName: 'rolePermissions' })
export class RolePermissions extends Model<RolePermissions, RolePermissionsAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER, allowNull: false })
    roleId: number;

    @ForeignKey(() => Permissions)
    @Column({ type: DataType.INTEGER, allowNull: false })
    permissionId: number;
}
