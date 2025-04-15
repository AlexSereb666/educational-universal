import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UserDto } from '../auth/dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @Get()
    //@UseGuards(AuthGuard)
    getAll() {
        return this.usersService.getAllUsers();
    }

    @Get('searchByLogin')
    getAllByLogin(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('search') search: string,
    ) {
        return this.usersService.getUsersWithPagination(limit, offset, search);
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    getUserById(@Param('id') id: number) {
        return this.usersService.getUserById(id);
    }

    @Post('edit/:id')
    @UseGuards(AuthGuard)
    editDataUserById(@Param('id') id: number, @Body() { login }: { login: string }) {
        return this.usersService.editDataUserById({
            id,
            login,
        });
    }

    @Patch('update-settings/:id')
    @UseGuards(AuthGuard)
    updateJsonSettings(@Param('id') id: number, @Body('jsonSettings') jsonSettings: any) {
        return this.usersService.updateJsonSettings({ id, jsonSettings });
    }

    @Patch(':id/avatar')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('avatar'))
    async updateAvatar(
        @Param('id', ParseIntPipe) userId: number,
        @UploadedFile() file: Express.Multer.File,
    ) {
        if (!file) {
            throw new BadRequestException(
                'Файл аватара не предоставлен (ключ "avatar" в form-data)',
            );
        }
        return this.usersService.updateAvatar(userId, file);
    }
}
