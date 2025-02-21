import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
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
import {ArticlesBlockModule} from "./articlesBlock/articlesBlock.module";
import {ArticlesTypeBlockModule} from "./articlesTypeBlock/articlesTypeBlock.module";
import {UsersTokenModule} from "./usersToken/usersToken.module";
import {UsersToken} from "./usersToken/usersToken.model";
import {EmailModule} from "./email/email.module";
import {QueryModule} from "./query/query.module";
import {ArticlesCommentModule} from "./articlesComment/articlesComment.module";
import {ArticleComment} from "./articlesComment/articlesComment.model";
import {FilesModule} from "./files/files.module";
import * as path from 'path';
import {ServeStaticModule} from "@nestjs/serve-static";
import {Role} from "./roles/roles.model";
import {RolePermissions} from "./rolePermissions/rolePermissions.model";
import {Permissions} from "./permissions/permissions.model";
import {RoleModule} from "./roles/roles.module";
import {PermissionsModule} from "./permissions/permissions.module";
import {UserRolesModule} from "./userRoles/userRoles.module";
import {RolePermissionsModule} from "./rolePermissions/rolePermissions.module";
import {UserRoles} from "./userRoles/userRoles.model";
import {UserNotifications} from "./userNotifications/userNotifications.model";
import {UserNotificationsModule} from "./userNotifications/userNotifications.module";
import {NotificationsModule} from "./notifications/notifications.module";
import {Notifications} from "./notifications/notifications.model";
import {ArticleRatings} from "./articleRatings/articleRatings.model";
import {ArticleRatingsModule} from "./articleRatings/articleRatings.module";

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: `.${process.env.NODE_ENV}.env`,
          isGlobal: true,
      }),
      ServeStaticModule.forRoot({
          rootPath: path.resolve(__dirname, '..', 'uploads'),
          serveRoot: '/uploads',
      }),
      SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRESS_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRESS_PASSWORD,
          database: process.env.POSTGRES_DB,
          models: [
              User,
              Chat,
              ChatUser,
              Message,
              Articles,
              ArticlesType,
              ArticleTypesLink,
              ArticlesBlock,
              ArticlesTypeBlock,
              UsersToken,
              ArticleComment,
              Role,
              Permissions,
              RolePermissions,
              UserRoles,
              UserNotifications,
              Notifications,
              ArticleRatings,
          ],
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
      UsersTokenModule,
      EmailModule,
      QueryModule,
      ArticlesCommentModule,
      FilesModule,
      RoleModule,
      PermissionsModule,
      UserRolesModule,
      RolePermissionsModule,
      UserNotificationsModule,
      NotificationsModule,
      ArticleRatingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
