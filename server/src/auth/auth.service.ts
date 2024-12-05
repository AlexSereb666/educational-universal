import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";
import * as bcrypt from 'bcryptjs';
import * as uuid from 'uuid';
import {EmailService} from "../email/email.service";
import {UsersTokenService} from "../usersToken/usersToken.service";
import {UserDto} from "./dto/user.dto";
import {ConfigService} from "@nestjs/config";
import {IsNotEmpty} from "class-validator";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService,
                private emailService: EmailService,
                private usersTokenService: UsersTokenService,
                private readonly configService: ConfigService
    ) {}

    async registration(userDto: CreateUserDto) {
        let candidate = await this.userService.getUserByLogin(userDto.login);
        if (candidate) {
            throw new HttpException('Пользователь с таким логином уже существует', HttpStatus.BAD_REQUEST);
        }

        candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const activationLink = uuid.v4();

        const user = await this.userService.createUser({
            ...userDto,
            password: hashPassword,
            activationLink
        });
        await this.emailService.sendActivationMail(
            userDto.email,
            `${this.configService.get<string>('API_URL')}:${this.configService.get<string>('PORT')}/auth/activate/${activationLink}`
        );

        const userParam = new UserDto(user);
        const tokens = await this.usersTokenService.generateTokens({...userParam});

        await this.usersTokenService.saveToken({
            userId: userParam.id,
            refreshToken: tokens.refreshToken
        });

        return {...tokens, user: userParam}
    }

    async login(userDto: CreateUserDto) {
        const user = await this.userService.getUserByLogin(userDto.login);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
        }

        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (!passwordEquals) {
            throw new HttpException('Неправильный пароль', HttpStatus.BAD_REQUEST);
        }

        if (!user.isActivated) {
            throw new HttpException('Аккаунт не активирован', HttpStatus.BAD_REQUEST);
        }

        const userParam = new UserDto(user);
        const tokens = await this.usersTokenService.generateTokens({...userParam});

        await this.usersTokenService.saveToken({
            userId: userParam.id,
            refreshToken: tokens.refreshToken
        });

        return {...tokens, user: userParam};
    }

    async logout(refreshToken: string) {
        const token = await this.usersTokenService.removeToken(refreshToken);
        return token;
    }

    async activate(activationLink: string) {
        const user = await this.userService.getUserByActivationLink(activationLink);
        if (!user) {
            throw new HttpException('Некорректная ссылка активации', HttpStatus.BAD_REQUEST);
        }
        user.isActivated = true;
        await user.save();
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new HttpException('Пустой токен', HttpStatus.BAD_REQUEST);
        }

        const userData = this.usersTokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await this.usersTokenService.findtToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw new HttpException('Пользователь не авторизован', HttpStatus.BAD_REQUEST);
        }

        const user = await this.userService.getUserById(userData.id);

        const userParam = new UserDto(user);
        const tokens = await this.usersTokenService.generateTokens({...userParam});

        await this.usersTokenService.saveToken({
            userId: userParam.id,
            refreshToken: tokens.refreshToken
        });

        return {...tokens, user: userParam};
    }

    async generateRandomUsers() {
        /*for (let i = 0; i < 1000; i++) {
            const randomLogin = this.generateRandomLogin();
            const randomPassword = this.generateRandomPassword();

            const candidate = await this.userService.getUserByLogin(randomLogin);
            if (!candidate) {
                const hashPassword = await bcrypt.hash(randomPassword, 5);
                await this.userService.createUser({ login: randomLogin, password: hashPassword });
            }
        }*/
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
}
