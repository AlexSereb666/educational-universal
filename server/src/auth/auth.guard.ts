import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {UsersTokenService} from "../usersToken/usersToken.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private usersTokenService: UsersTokenService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            throw new UnauthorizedException('Токен отсутствует');
        }

        const [scheme, token] = authHeader.split(' ');

        if (scheme !== 'Bearer' || !token) {
            throw new UnauthorizedException('Неверный формат токена');
        }

        try {
            const userData = await this.usersTokenService.validateAccessToken(token);

            if (!userData) {
                throw new UnauthorizedException('Неверный токен');
            }

            request['user'] = userData;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Неверный или истекший токен');
        }
    }
}
