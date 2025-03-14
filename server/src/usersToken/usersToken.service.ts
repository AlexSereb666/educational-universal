import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {CreateUsersTokenDto} from "./dto/create-usersToken.dto";
import {UsersService} from "../users/users.service";
import {InjectModel} from "@nestjs/sequelize";
import {UsersToken} from "./usersToken.model";

@Injectable()
export class UsersTokenService {
    constructor(@InjectModel(UsersToken) private usersTokenRepository: typeof UsersToken,
                private jwtService: JwtService,
                private configService: ConfigService) {}

    async generateTokens(payload) {
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
            expiresIn: '30m',
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: '30d',
        });

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(dto: CreateUsersTokenDto) {
        const tokenData = await this.usersTokenRepository.findOne({
            where: { userId: dto.userId }
        } as any);

        if (tokenData) {
            tokenData.refreshToken = dto.refreshToken;
            return tokenData.save();
        }

        const token = await this.usersTokenRepository.create(dto);
        return token;
    }

    async removeToken(refreshToken: string) {
        const tokenData = await this.usersTokenRepository.destroy({
            where: { refreshToken }
        });
        return tokenData;
    }

    async findtToken(refreshToken: string) {
        const tokenData = await this.usersTokenRepository.findOne({
            where: {refreshToken}
        } as any);
        return tokenData;
    }

    public validateAccessToken(token: string) {
        try {
            const userData = this.jwtService.verify(token, {
                secret: this.configService.get<string>('JWT_ACCESS_SECRET')
            });
            return userData;
        } catch (e) {
            return null;
        }
    }

    public validateRefreshToken(token: string) {
        try {
            const userData = this.jwtService.verify(token, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET')
            });
            return userData;
        } catch (e) {
            return null;
        }
    }
}
