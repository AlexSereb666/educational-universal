import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GatewayModule} from "./gateway/gateway.module";
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users/users.model";
import {Chat} from "./chat/chat.model";
import {ChatUser} from "./chatUsers/chatUsers.model";
import {Message} from "./chatMessages/chatMessages.model";
import {UsersModule} from "./users/users.module";
import {AuthModule} from "./auth/auth.module";
import {ChatModule} from "./chat/chat.module";
import {ChatUsersModule} from "./chatUsers/chatUsers.module";
import {ChatMessagesModule} from "./chatMessages/chatMessages.module";

@Module({
  imports: [
      //GatewayModule,
      ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`
      }),
    //ServeStaticModule.forRoot({
    //    rootPath: path.resolve( __dirname, 'static'),
    //}),
      SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRESS_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRESS_PASSWORD,
          database: process.env.POSTGRES_DB,
          models: [User, Chat, ChatUser, Message],
          autoLoadModels: true
      }),
      UsersModule,
      AuthModule,
      ChatModule,
      ChatUsersModule,
      ChatMessagesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
