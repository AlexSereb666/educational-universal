import {Body, Controller, Get, Param, Post, Req, Res} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import { Response, Request } from "express";
import {ConfigService} from "@nestjs/config";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
                private readonly configService: ConfigService) {}

    @Post('/registration')
    async registration(@Body() userDto: CreateUserDto, @Res() res: Response) {
        const authData = await this.authService.registration(userDto);

        res.cookie('refreshToken', authData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
        });

        return res.send({ accessToken: authData.accessToken, user: authData.user });
    }

    @Post('/login')
    async login(@Body() userDto: CreateUserDto, @Res() res: Response) {
        const authData = await this.authService.login(userDto);

        res.cookie('refreshToken', authData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
        });

        return res.send({ accessToken: authData.accessToken, user: authData.user });
    }

    @Post('/logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        const refreshToken = req.cookies['refreshToken'];
        await this.authService.logout(refreshToken);

        res.clearCookie('refreshToken', {
            httpOnly: true,
            sameSite: 'strict',
        });

        return res.send({ message: 'Выход из аккаунта выполнен успешно' });
    }

    @Get('/activate/:link')
    async activate(@Param('link') link: string, @Res() res: Response) {
        await this.authService.activate(link);
        return res.redirect(this.configService.get<string>('URL_FRONTEND'));
    }

    @Get('/refresh')
    async refresh(@Req() req: Request, @Res() res: Response) {
        const refreshToken = req.cookies['refreshToken'];

        const authData = await this.authService.refresh(refreshToken);

        res.cookie('refreshToken', authData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
        });

        return res.send({ accessToken: authData.accessToken, user: authData.user });
    }

    @Get('/generateRandomUsers')
    async generateRandomUsers(@Res() res: Response) {
        const message = await this.authService.generateRandomUsers();
        return res.send({ message });
    }
}
