import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './chatMessages.model';
import { CreateChatMessageDto } from './dto/create-chat-messages.dto';
import { User } from '../users/users.model';

@Injectable()
export class MessageService {
    constructor(@InjectModel(Message) private messageRepository: typeof Message) {}

    async sendMessage(dto: CreateChatMessageDto) {
        if (!dto.text) {
            throw new HttpException('Сообщение не может быть пустым', HttpStatus.BAD_REQUEST);
        }

        const message = await this.messageRepository.create(dto);
        return message;
    }

    async getMessagesInChat(chatId: number) {
        const messages = await this.messageRepository.findAll({
            where: { chatId },
            include: { model: User },
        });
        if (!messages.length) {
            throw new HttpException('В чате нет сообщений', HttpStatus.NOT_FOUND);
        }
        return messages;
    }
}
