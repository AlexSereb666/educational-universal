import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {Permissions} from "./permissions.model";
import {PermissionsService} from "./permissions.service";
import {PermissionsController} from "./permissions.controller";

@Module({
    controllers: [PermissionsController],
    providers: [PermissionsService],
    imports: [
        SequelizeModule.forFeature([Permissions]),
    ],
    exports: [],
})
export class PermissionsModule {}
