import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {RolePermissions} from "./rolePermissions.model";

@Injectable()
export class RolePermissionsService {
    constructor(
        @InjectModel(RolePermissions) private rolePermissionsRepository: typeof RolePermissions
    ) {}

    async addPermissionToRole(roleId: number, permissionId: number) {
        return this.rolePermissionsRepository.create({ roleId, permissionId });
    }

    async removePermissionFromRole(roleId: number, permissionId: number) {
        const rolePermission = await this.rolePermissionsRepository.findOne({
            where: { roleId, permissionId },
        });
        if (!rolePermission) throw new NotFoundException('Permission not found for this role');
        return rolePermission.destroy();
    }
}
