import {Body, Controller, Post} from "@nestjs/common";
import {UserRolesService} from "./userRoles.service";
import {CreateUserRolesDto} from "./dto/create-userRoles.dto";

@Controller('user-roles')
export class UserRolesController {
    constructor(private readonly userRolesService: UserRolesService) {}

    @Post('add-role')
    addRole(@Body() { roleId, userId }: CreateUserRolesDto) {
        return this.userRolesService.addRoleToUser(roleId, userId);
    }

    @Post('delete-role')
    deleteRole(@Body() { roleId, userId }: CreateUserRolesDto) {
        return this.userRolesService.removeRoleFromUser(roleId, userId);
    }
}
