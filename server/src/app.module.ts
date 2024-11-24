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
import {ArticlesModule} from "./articles/articles.module";
import {Articles} from "./articles/articles.model";
import {ArticlesType} from "./articlesType/articlesType.model";
import {ArticlesTypeModule} from "./articlesType/articlesType.module";
import {ArticleTypesLink} from "./articlesTypeLinks/articlesTypeLinks.model";
import {ArticlesTypeLinksModule} from "./articlesTypeLinks/articlesTypeLinks.module";
import {ArticlesBlock} from "./articlesBlock/articlesBlock.model";
import {ArticlesTypeBlock} from "./articlesTypeBlock/articlesTypeBlock.model";
import {ArticlesBlockModule} from "./articlesBlock/articlesBlock.mobule";
import {ArticlesTypeBlockModule} from "./articlesTypeBlock/articlesTypeBlock.module";

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
          models: [User, Chat, ChatUser, Message, Articles, ArticlesType, ArticleTypesLink, ArticlesBlock, ArticlesTypeBlock],
          autoLoadModels: true
      }),
      UsersModule,
      AuthModule,
      ChatModule,
      ChatUsersModule,
      ChatMessagesModule,
      ArticlesModule,
      ArticlesTypeModule,
      ArticlesTypeLinksModule,
      ArticlesBlockModule,
      ArticlesTypeBlockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
