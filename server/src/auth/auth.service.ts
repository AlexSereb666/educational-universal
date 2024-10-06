import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";
import * as bcrypt from 'bcryptjs'
import {User} from "../users/users.model";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByLogin(userDto.login);
        if (candidate) {
            throw new HttpException('Пользователь с таким логином уже существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    async generateRandomUsers() {
        for (let i = 0; i < 1000; i++) {
            const randomLogin = this.generateRandomLogin();
            const randomPassword = this.generateRandomPassword();

            const candidate = await this.userService.getUserByLogin(randomLogin);
            if (!candidate) {
                const hashPassword = await bcrypt.hash(randomPassword, 5);
                await this.userService.createUser({ login: randomLogin, password: hashPassword });
            }
        }
    }

    private generateRandomLogin(): string {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let login = '';
        const length = Math.floor(Math.random() * 20) + 1;
        for (let i = 0; i < length; i++) {
            login += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return login;
    }

    private generateRandomPassword(): string {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
        let password = '';
        const length = Math.floor(Math.random() * 10) + 6; // Длина пароля от 6 до 15 символов
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    private async generateToken(user: User) {
        const payload = {id: user.id, login: user.login}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByLogin(userDto.login);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректный логин или пароль'})
    }
}
