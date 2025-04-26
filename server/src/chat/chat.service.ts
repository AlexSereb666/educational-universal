import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatUser } from '../chatUsers/chatUsers.model';
import { Message } from '../chatMessages/chatMessages.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat) private chatRepository: typeof Chat,
        @InjectModel(ChatUser) private chatUserRepository: typeof ChatUser,
        @InjectModel(Message) private messageRepository: typeof Message,
        private userService: UsersService,
    ) {}

    async createChat(dto: CreateChatDto) {
        if (!dto.type) {
            throw new HttpException('Не указан тип чата', HttpStatus.BAD_REQUEST);
        }

        const chat = await this.chatRepository.create(dto);
        return chat;
    }

    async getChatById(chatId: number) {
        const chat = await this.chatRepository.findOne({
            where: { id: chatId },
            include: { all: true },
        } as any);
        if (!chat) {
            throw new HttpException('Чат не найден', HttpStatus.NOT_FOUND);
        }
        return chat;
    }

    async getAllChats() {
        const chats = await this.chatRepository.findAll({ include: { all: true } });
        return chats;
    }

    private async findPrivateChatBetweenUsers(userId1: number, userId2: number) {
        return await this.chatUserRepository.findAll({
            where: { userId: userId1 },
            include: [
                {
                    model: Chat,
                    where: { type: 'private' },
                    include: [
                        {
                            model: ChatUser,
                            where: { userId: userId2 },
                        },
                    ],
                },
            ],
        });
    }

    async getChatByUserIds(userId1: number, userId2: number) {
        let chats = await this.findPrivateChatBetweenUsers(userId1, userId2);

        const user1 = await this.userService.getUserById(userId1);
        const user2 = await this.userService.getUserById(userId2);

        if (!chats) {
            const newChat = await this.createChat({ type: 'private' });
            await this.chatUserRepository.bulkCreate([
                { chatId: newChat.id, userId: userId1 },
                { chatId: newChat.id, userId: userId2 },
            ]);

            chats = await this.findPrivateChatBetweenUsers(userId1, userId2);
        }

        return {
            chat: chats[0].chat,
            participants: [user1, user2],
        };
    }
}
