import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @Get()
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
}
