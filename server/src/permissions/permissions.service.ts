import {Injectable, NotFoundException} from "@nestjs/common";
import {Permissions} from "./permissions.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreatePermissionDto} from "./dto/create-permissions.dto";

@Injectable()
export class PermissionsService {
    constructor(
        @InjectModel(Permissions) private permissionsRepository: typeof Permissions,
    ) {}

    async createPermission(dto: CreatePermissionDto) {
        return this.permissionsRepository.create(dto);
    }

    async updatePermission(id: number, dto: CreatePermissionDto) {
        const role = await this.permissionsRepository.findByPk(id);
        if (!role) throw new NotFoundException('Permission not found');
        return role.update(dto);
    }

    async deletePermission(id: number) {
        const role = await this.permissionsRepository.findByPk(id);
        if (!role) throw new NotFoundException('Permission not found');
        return role.destroy();
    }

    async getAllPermissions() {
        return await this.permissionsRepository.findAll({
            include: {all: true}
        });
    }

    async getPermissionById(id: number) {
        return await this.permissionsRepository.findOne({
            where: {id},
        });
    }
}