import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @Post('create')
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto);
    }

    @Post('update/:id')
    update(@Param('id') id: number, dto: CreateRoleDto) {
        return this.rolesService.updateRole(id, dto);
    }

    @Get('delete/:id')
    delete(@Param('id') id: number) {
        return this.rolesService.deleteRole(id);
    }

    @Get('all')
    getAll() {
        return this.rolesService.getAllRole();
    }

    @Get('one/:id')
    getById(@Param('id') id: number) {
        return this.rolesService.getRoleById(id);
    }
}