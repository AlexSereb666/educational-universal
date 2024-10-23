import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chats')
export class ChatController {
    constructor(private chatService: ChatService) {}

    @Post()
    createChat(@Body() dto: CreateChatDto) {
        return this.chatService.createChat(dto);
    }

    @Get('between-users')
    getChatBetweenUsers(@Query('userId1') userId1: number, @Query('userId2') userId2: number) {
        return this.chatService.getChatByUserIds(userId1, userId2);
    }

    @Get(':id')
    getChatById(@Param('id') chatId: number) {
        return this.chatService.getChatById(chatId);
    }

    @Get()
    getAllChats() {
        return this.chatService.getAllChats();
    }
}
