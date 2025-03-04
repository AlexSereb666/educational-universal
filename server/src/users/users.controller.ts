import {Body, Controller, Get, Param, Post, Query, UseGuards} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {AuthGuard} from "../auth/auth.guard";
import {UserDto} from "../auth/dto/user.dto";

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
    editDataUserById(
        @Param('id') id: number,
        @Body() { login }: { login: string }
    ) {
        return this.usersService.editDataUserById({
            id,
            login,
        });
    }
}
