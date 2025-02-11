import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {UserRoles} from "../userRoles/userRoles.model";
import {RolePermissions} from "../rolePermissions/rolePermissions.model";
import {Permissions} from "../permissions/permissions.model";

interface RolesCreationAttrs {
    name: string;
    slug: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RolesCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    slug: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];

    @BelongsToMany(() => Permissions, () => RolePermissions)
    permissions: Permissions[];
}
