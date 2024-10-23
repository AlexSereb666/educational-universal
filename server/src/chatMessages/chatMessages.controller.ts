import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { MessageService } from './chatMessages.service';
import { CreateChatMessageDto } from './dto/create-chat-messages.dto';

@Controller('chat-messages')
export class MessageController {
    constructor(private messageService: MessageService) {}

    @Post()
    sendMessage(@Body() dto: CreateChatMessageDto) {
        return this.messageService.sendMessage(dto);
    }

    @Get(':chatId')
    getMessagesInChat(@Param('chatId') chatId: number) {
        return this.messageService.getMessagesInChat(chatId);
    }
}
