import {Module} from "@nestjs/common";
import {MessageController} from "./chatMessages.controller";
import {MessageService} from "./chatMessages.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Message} from "./chatMessages.model";

@Module({
    controllers: [MessageController],
    providers: [MessageService],
    imports: [
        SequelizeModule.forFeature([Message]),
    ],
    exports: [
        MessageService,
    ]
})
export class ChatMessagesModule {};
