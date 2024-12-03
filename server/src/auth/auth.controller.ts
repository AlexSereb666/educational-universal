import {Body, Controller, Get, Param, Post, Res} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import { Response } from "express";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

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
    async login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/logout')
    async logout() {

    }

    @Get('/activate/:link')
    async activate(@Param('link') link: string) {

    }

    @Get('/refresh')
    async refresh() {

    }

    @Get('/generateRandomUsers')
    async generateRandomUsers() {
        return this.authService.generateRandomUsers();
    }
}
