import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {RolePermissions} from "./rolePermissions.model";
import {RolePermissionsService} from "./rolePermissions.service";
import {RolePermissionsController} from "./rolePermissions.controller";

@Module({
    controllers: [RolePermissionsController],
    providers: [RolePermissionsService],
    imports: [
        SequelizeModule.forFeature([RolePermissions]),
    ],
    exports: [],
})
export class RolePermissionsModule {}
