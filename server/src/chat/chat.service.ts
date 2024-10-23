import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatUser } from '../chatUsers/chatUsers.model';

@Injectable()
export class ChatService {
    constructor(@InjectModel(Chat) private chatRepository: typeof Chat,
                @InjectModel(ChatUser) private chatUserRepository: typeof ChatUser) {}

    async createChat(dto: CreateChatDto) {
        if (!dto.type) {
            throw new HttpException('Не указан тип чата', HttpStatus.BAD_REQUEST);
        }

        const chat = await this.chatRepository.create(dto);
        return chat;
    }

    async getChatById(chatId: number) {
        const chat = await this.chatRepository.findOne({ where: { id: chatId }, include: { all: true } });
        if (!chat) {
            throw new HttpException('Чат не найден', HttpStatus.NOT_FOUND);
        }
        return chat;
    }

    async getAllChats() {
        const chats = await this.chatRepository.findAll({ include: { all: true } });
        return chats;
    }

    async getChatByUserIds(userId1: number, userId2: number) {
        const chats = await this.chatUserRepository.findAll({
            where: { userId: userId1 },
            include: [{
                model: Chat,
                include: [{
                    model: ChatUser,
                    where: { userId: userId2 }
                }]
            }]
        });

        if (chats.length > 0 && chats[0].chat) {
            return chats[0].chat;
        } else {
            const newChat = await this.createChat({ type: 'private' });
            await this.chatUserRepository.bulkCreate([
                { chatId: newChat.id, userId: userId1 },
                { chatId: newChat.id, userId: userId2 }
            ]);
            return newChat;
        }
    }
}
