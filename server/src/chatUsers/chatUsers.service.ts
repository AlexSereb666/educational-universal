import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ChatUser } from './chatUsers.model';
import { CreateChatUsersDto } from './dto/create-chat-users.dto';
import { User } from '../users/users.model';

@Injectable()
export class ChatUserService {
    constructor(@InjectModel(ChatUser) private chatUserRepository: typeof ChatUser) {}

    async addUserToChat(dto: CreateChatUsersDto) {
        const chatUser = await this.chatUserRepository.create(dto);
        return chatUser;
    }

    async getUsersInChat(chatId: number) {
        const users = await this.chatUserRepository.findAll({
            where: { chatId },
            include: { model: User },
        });
        if (!users.length) {
            throw new HttpException('В чате нет пользователей', HttpStatus.NOT_FOUND);
        }
        return users;
    }
}
