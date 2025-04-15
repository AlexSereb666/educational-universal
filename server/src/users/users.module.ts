import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { AuthModule } from '../auth/auth.module';
import { UsersTokenModule } from '../usersToken/usersToken.module';
import { FilesModule } from '../files/files.module';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([User]),
        forwardRef(() => AuthModule),
        UsersTokenModule,
        forwardRef(() => FilesModule),
    ],
    exports: [UsersService],
})
export class UsersModule {}
