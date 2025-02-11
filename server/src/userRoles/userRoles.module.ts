import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {UserRoles} from "./userRoles.model";
import {UserRolesService} from "./userRoles.service";
import {UserRolesController} from "./userRoles.controller";

@Module({
    controllers: [UserRolesController],
    providers: [UserRolesService],
    imports: [
        SequelizeModule.forFeature([UserRoles]),
    ],
    exports: [],
})
export class UserRolesModule {}
