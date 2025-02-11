import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {PermissionsService} from "./permissions.service";
import {CreatePermissionDto} from "./dto/create-permissions.dto";

@Controller('permissions')
export class PermissionsController {
    constructor(private permissionsService: PermissionsService) {}

    @Post('create')
    create(@Body() dto: CreatePermissionDto) {
        return this.permissionsService.createPermission(dto);
    }

    @Post('update/:id')
    update(@Param('id') id: number, dto: CreatePermissionDto) {
        return this.permissionsService.updatePermission(id, dto);
    }

    @Get('delete/:id')
    delete(@Param('id') id: number) {
        return this.permissionsService.deletePermission(id);
    }

    @Get('all')
    getAll() {
        return this.permissionsService.getAllPermissions();
    }

    @Get('one/:id')
    getById(@Param('id') id: number) {
        return this.permissionsService.getPermissionById(id);
    }
}