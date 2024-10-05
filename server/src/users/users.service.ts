import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {Op} from "sequelize";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto) {
        if (!dto.login || !dto.password) {
            throw new HttpException('Не указан логин или пароль', HttpStatus.NOT_FOUND);
        }

        const user = await this.userRepository.create(dto);
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByLogin(login: string) {
        if (!login) {
            throw new HttpException('Логин не указан', HttpStatus.NOT_FOUND);
        }

        const user = await this.userRepository.findOne({where: {login}, include: {all: true}});
        return user;
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

        const users = await this.userRepository.findAndCountAll(options);
        return users;
    }
}
