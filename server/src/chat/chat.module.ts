import {Module} from "@nestjs/common";
import {ChatController} from "./chat.controller";
import {ChatService} from "./chat.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Chat} from "./chat.model";
import {ChatUsersModule} from "../chatUsers/chatUsers.module";
import {ChatMessagesModule} from "../chatMessages/chatMessages.module";
import {ChatGateway} from "./chat.gateway";

@Module({
    controllers: [ChatController],
    providers: [ChatService, ChatGateway],
    imports: [
        SequelizeModule.forFeature([Chat]),
        ChatUsersModule,
        ChatMessagesModule,
    ],
    exports: [
        ChatService,
    ]
})
export class ChatModule {};
