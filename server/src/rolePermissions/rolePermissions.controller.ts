import {Body, Controller, Post} from "@nestjs/common";
import {RolePermissionsService} from "./rolePermissions.service";
import {CreateRolePermissionsDto} from "./dto/create-rolePermissions.dto";

@Controller('role-permissions')
export class RolePermissionsController {
    constructor(private readonly rolePermissionsService: RolePermissionsService) {}

    @Post('add-permission')
    addRole(@Body() { roleId, permissionId }: CreateRolePermissionsDto) {
        return this.rolePermissionsService.addPermissionToRole(roleId, permissionId);
    }

    @Post('delete-permission')
    deleteRole(@Body() { roleId, permissionId }: CreateRolePermissionsDto) {
        return this.rolePermissionsService.removePermissionFromRole(roleId, permissionId);
    }
}
