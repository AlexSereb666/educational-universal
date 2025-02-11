import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {UserRoles} from "./userRoles.model";

@Injectable()
export class UserRolesService {
    constructor(
        @InjectModel(UserRoles) private userRolesRepository: typeof UserRoles
    ) {}

    async addRoleToUser(roleId: number, userId: number) {
        return this.userRolesRepository.create({ roleId, userId });
    }

    async removeRoleFromUser(roleId: number, userId: number) {
        const userRole = await this.userRolesRepository.findOne({
            where: { roleId, userId },
        });
        if (!userRole) throw new NotFoundException('Role not found for this user');
        return userRole.destroy();
    }
}
