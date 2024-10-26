import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {OnModuleInit} from "@nestjs/common";
import {Server, Socket} from "socket.io";
import {MessageService} from "../chatMessages/chatMessages.service";
import {CreateChatMessageDto} from "../chatMessages/dto/create-chat-messages.dto";

@WebSocketGateway({
    namespace: '/chat',
    cors: {
        origin: '*', credentials: true
    }
})
export class ChatGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server;

    constructor(private readonly messageService: MessageService) {}

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(`${socket.id} подключен`);

            socket.on('disconnect', () => {
                console.log(`${socket.id} отключен`);
            });
        });
    }

    @SubscribeMessage('joinChat')
    handleJoinChat(@MessageBody() chatId: number, @ConnectedSocket() socket: Socket) {
        socket.join(`chat_${chatId}`);
        console.log(`${socket.id} присоединился к чату ${chatId}`);
    }

    @SubscribeMessage('sendMessage')
    async handleSendMessage(@MessageBody() dto: CreateChatMessageDto, @ConnectedSocket() socket: Socket) {
        const message = await this.messageService.sendMessage(dto);
        this.server.to(`chat_${dto.chatId}`).emit('newMessage', message);
    }
}
