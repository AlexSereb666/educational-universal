import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./roles.model";
import {CreateRoleDto} from "./dto/create-role.dto";

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role) private roleRepository: typeof Role,
    ) {}

    async createRole(dto: CreateRoleDto) {
        return this.roleRepository.create(dto);
    }

    async updateRole(id: number, dto: CreateRoleDto) {
        const role = await this.roleRepository.findByPk(id);
        if (!role) throw new NotFoundException('Role not found');
        return role.update(dto);
    }

    async deleteRole(id: number) {
        const role = await this.roleRepository.findByPk(id);
        if (!role) throw new NotFoundException('Role not found');
        return role.destroy();
    }

    async getAllRole() {
        return await this.roleRepository.findAll({
            include: {all: true}
        });
    }

    async getRoleById(id: number) {
        return await this.roleRepository.findOne({
            where: {id},
        });
    }
}
