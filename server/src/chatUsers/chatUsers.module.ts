import {Module} from "@nestjs/common";
import {ChatUserController} from "./chatUsers.controller";
import {ChatUserService} from "./chatUsers.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {ChatUser} from "./chatUsers.model";

@Module({
    controllers: [ChatUserController],
    providers: [ChatUserService],
    imports: [
        SequelizeModule.forFeature([ChatUser]),
    ],
    exports: [
        ChatUserService,
        SequelizeModule.forFeature([ChatUser]),
    ]
})
export class ChatUsersModule {};
