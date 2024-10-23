import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ChatUserService } from './chatUsers.service';
import { CreateChatUsersDto } from './dto/create-chat-users.dto';

@Controller('chat-users')
export class ChatUserController {
    constructor(private chatUserService: ChatUserService) {}

    @Post()
    addUserToChat(@Body() dto: CreateChatUsersDto) {
        return this.chatUserService.addUserToChat(dto);
    }

    @Get(':chatId')
    getUsersInChat(@Param('chatId') chatId: number) {
        return this.chatUserService.getUsersInChat(chatId);
    }
}
