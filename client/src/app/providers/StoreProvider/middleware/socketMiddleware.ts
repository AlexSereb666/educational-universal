import { chatMessangerActions } from '@/entities/ChatMessanger';
import { isAction, Middleware, MiddlewareAPI } from 'redux';
import { io, Socket } from 'socket.io-client';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '@/entities/User';
import { ConnectionStatus } from '@/shared/const/connectionStatus';

const isChatAction = (
    action: unknown,
): action is ReturnType<
    | typeof chatMessangerActions.startConnecting
    | typeof chatMessangerActions.disconnect
    | typeof chatMessangerActions.sendMessageRequest
> => {
    if (!isAction(action)) return false;

    const types = [
        chatMessangerActions.startConnecting.type,
        chatMessangerActions.disconnect.type,
        chatMessangerActions.sendMessageRequest.type,
    ] as const;

    return types.includes(action.type as (typeof types)[number]);
};

export const socketMiddleware = (): Middleware => {
    let socket: Socket | null = null;

    return (api: MiddlewareAPI<any, StateSchema>) => (next) => (action) => {
        if (!isChatAction(action)) {
            return next(action);
        }

        const { dispatch, getState } = api;
        const state = getState();

        if (chatMessangerActions.startConnecting.match(action)) {
            const chatId = action.payload;

            if (socket) {
                socket.disconnect();
            }

            dispatch(chatMessangerActions.setConnectionStatus(ConnectionStatus.PENDING));

            socket = io(`${__API__}/chat` /*, { auth: { token } }*/); // todo добавить токены для работы с вебсокетами

            socket.on('connect', () => {
                console.log('WebSocket Connected');

                dispatch(
                    chatMessangerActions.setConnectionStatus(ConnectionStatus.CONNECTING),
                );

                socket?.emit('joinChat', chatId);
            });

            socket.on('disconnect', (reason) => {
                console.log('WebSocket Disconnected:', reason);

                dispatch(
                    chatMessangerActions.setConnectionStatus(
                        ConnectionStatus.DISCONNECTING,
                    ),
                );

                socket = null;
            });

            socket.on('newMessage', (message) => {
                dispatch(chatMessangerActions.messageReceived(message));
            });

            socket.on('connect_error', (error) => {
                console.error('WebSocket Connection Error:', error);

                dispatch(chatMessangerActions.connectionError(error.message));

                dispatch(
                    chatMessangerActions.setConnectionStatus(ConnectionStatus.ERROR),
                );

                socket?.disconnect();
                socket = null;
            });
        }

        if (chatMessangerActions.disconnect.match(action)) {
            if (socket) {
                console.log('Disconnecting WebSocket...');

                socket.disconnect();
                socket = null;
            }
        }

        if (chatMessangerActions.sendMessageRequest.match(action)) {
            if (socket && socket.connected) {
                const { chatId, text } = action.payload;
                const userAuthData = getUserAuthData(state);
                const userId = userAuthData?.id;

                if (userId) {
                    console.log('Sending message via WebSocket:', {
                        chatId,
                        userId,
                        text,
                    });

                    socket.emit('sendMessage', { chatId, userId, text });
                } else {
                    console.error('Cannot send message: User ID not found in state');
                }
            } else {
                console.error('Cannot send message: WebSocket not connected');
            }
        }

        return next(action);
    };
};
