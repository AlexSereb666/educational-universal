import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./roles.model";
import {RolesService} from "./roles.service";
import {RolesController} from "./roles.controller";

@Module({
    controllers: [RolesController],
    providers: [RolesService],
    imports: [
        SequelizeModule.forFeature([Role]),
    ],
    exports: [
        RolesService,
    ],
})
export class RoleModule {}
