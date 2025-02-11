import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Role} from "../roles/roles.model";
import {RolePermissions} from "../rolePermissions/rolePermissions.model";

interface PermissionsAttrs {
    name: string;
    slug: string;
}

@Table({tableName: 'permissions'})
export class Permissions extends Model<Permissions, PermissionsAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    slug: string;

    @BelongsToMany(() => Role, () => RolePermissions)
    roles: Role[];
}
