import {forwardRef, Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersToken} from "./usersToken.model";
import {UsersModule} from "../users/users.module";
import {UsersTokenService} from "./usersToken.service";
import {JwtModule} from "@nestjs/jwt";
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    controllers: [],
    providers: [UsersTokenService],
    imports: [
        forwardRef(() => UsersModule),
        SequelizeModule.forFeature([UsersToken]),
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_ACCESS_SECRET') || 'SECRET_ACCESS_TOKEN',
                signOptions: {
                    expiresIn: '24h',
                },
            }),
        }),
    ],
    exports: [
        JwtModule,
        UsersTokenService,
        SequelizeModule.forFeature([UsersToken]),
    ]
})
export class UsersTokenModule {};
