import { chatMessangerActions } from '../model/slice/chatMessangerSlice';
import { ConnectionStatus } from '@/shared/const/connectionStatus';
import type { Socket } from 'socket.io-client';
import type { AnyAction } from 'redux';
import type { AppDispatch } from '@/app/providers/StoreProvider';
import { Message } from '../model/types/chatMessanger';
import { SocketModuleConfig } from '@/shared/types/socket';
import { AppGetState } from '@/app/providers/StoreProvider';

export const chatSocketModule: SocketModuleConfig = {
    namespace: 'chat',

    matchStart: chatMessangerActions.startConnecting.match,
    matchStop: chatMessangerActions.disconnect.match,

    onConnect: (socket: Socket, action: AnyAction, dispatch: AppDispatch) => {
        console.log('[chat] Connected');
        socket.emit('joinChat', action.payload);
        dispatch(chatMessangerActions.setConnectionStatus(ConnectionStatus.CONNECTED));
    },
    onDisconnect: (reason: Socket.DisconnectReason, dispatch: AppDispatch) => {
        console.log('[chat] Disconnected:', reason);
        dispatch(
            chatMessangerActions.setConnectionStatus(ConnectionStatus.DISCONNECTING),
        );
    },
    onError: (error: Error, dispatch: AppDispatch) => {
        console.error('[chat] Connection Error:', error);
        dispatch(chatMessangerActions.connectionError(error.message));
        dispatch(chatMessangerActions.setConnectionStatus(ConnectionStatus.ERROR));
    },

    eventHandlers: [
        {
            event: 'newMessage',
            handler: ({ dispatch, payload }: { dispatch: AppDispatch; payload: any }) => {
                console.log('[chat] newMessage EventHandler received payload:', payload);

                if (payload && typeof payload === 'object' && payload.id) {
                    dispatch(chatMessangerActions.messageReceived(payload as Message));
                } else {
                    console.warn(
                        '[chat] newMessage EventHandler received invalid payload:',
                        payload,
                    );
                }
            },
        },
    ],

    actionHandlers: [
        {
            match: chatMessangerActions.sendMessageRequest.match,
            handler: ({
                socket,
                action,
                getState,
            }: {
                socket: Socket;
                action: AnyAction;
                getState: AppGetState;
            }) => {
                const { chatId, text } = action.payload;
                const user = getState().user.authData;

                if (user && socket && socket.connected) {
                    console.log(
                        '[chat] actionHandler: Sending message via socket.emit:',
                        { chatId, userId: user.id, text },
                    );
                    socket.emit('sendMessage', {
                        chatId,
                        userId: user.id,
                        text,
                    });
                } else {
                    console.error(
                        '[chat] actionHandler: Cannot send message - User not logged in or socket disconnected.',
                    );
                }
            },
        },
    ],
};
