import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Op } from 'sequelize';
import { Role } from '../roles/roles.model';
import { Permissions } from '../permissions/permissions.model';
import { UserForRolesDto } from './dto/userForRoles.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto) {
        if (!dto.login || !dto.password || !dto.email) {
            throw new HttpException('Не указан логин, email или пароль', HttpStatus.NOT_FOUND);
        }

        return await this.userRepository.create(dto);
    }

    async getAllUsers() {
        return await this.userRepository.findAll({ include: { all: true } });
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({
            where: { id },
            include: [
                {
                    model: Role,
                    include: [Permissions],
                },
            ],
        });

        return new UserForRolesDto(user);
    }

    async getUserByLogin(login: string) {
        if (!login) {
            throw new HttpException('Логин не указан', HttpStatus.NOT_FOUND);
        }

        return await this.userRepository.findOne({
            where: { login },
            include: [
                {
                    model: Role,
                    include: [Permissions],
                },
            ],
        });
    }

    async getUserByEmail(email: string) {
        if (!email) {
            throw new HttpException('Email не указан', HttpStatus.NOT_FOUND);
        }

        return await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        } as any);
    }

    async getUserByActivationLink(activationLink: string) {
        if (!activationLink) {
            throw new HttpException('Ссылка не указан', HttpStatus.NOT_FOUND);
        }

        return await this.userRepository.findOne({
            where: { activationLink },
            include: { all: true },
        } as any);
    }

    async getUsersWithPagination(limit: number, offset: number, search: string) {
        const options: any = {
            limit: limit || 10,
            offset: offset || 0,
            attributes: ['id', 'login'],
        };

        if (search) {
            options.where = {
                login: {
                    [Op.like]: `%${search}%`,
                },
            };
        }

        return await this.userRepository.findAndCountAll(options);
    }

    async editDataUserById({ id, login }: { id: number; login: string }) {
        if (!login) {
            throw new HttpException('Логин не может быть пустым', HttpStatus.BAD_REQUEST);
        }

        const user = await this.userRepository.findByPk(id);

        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }

        user.login = login;
        await user.save();

        return this.getUserById(user.id);
    }

    async updateJsonSettings({ id, jsonSettings }: { id: number; jsonSettings: any }) {
        const user = await this.userRepository.findByPk(id);

        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }

        if (!jsonSettings) {
            throw new HttpException('Не переданны настройки', HttpStatus.NOT_FOUND);
        }

        user.jsonSettings = JSON.stringify(jsonSettings);

        await user.save();

        return this.getUserById(user.id);
    }
}
