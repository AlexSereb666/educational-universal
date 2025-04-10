import type { AnyAction } from 'redux';
import type { Socket } from 'socket.io-client';
import type { AppDispatch } from '@/app/providers/StoreProvider';
import { AppGetState } from '@/app/providers/StoreProvider';

export type SocketEventHandler = {
    event: string;
    handler: (params: {
        socket: Socket;
        dispatch: AppDispatch;
        getState: AppGetState;
        payload: any;
    }) => void;
};

export type SocketActionHandler = {
    match: (action: AnyAction) => boolean;
    handler: (params: {
        socket: Socket;
        action: AnyAction;
        dispatch: AppDispatch;
        getState: AppGetState;
    }) => void;
};

export type SocketModuleConfig = {
    matchStart: (action: AnyAction) => boolean;
    matchStop: (action: AnyAction) => boolean;
    namespace: string;
    onConnect?: (socket: Socket, action: AnyAction, dispatch: AppDispatch) => void;
    onDisconnect?: (reason: Socket.DisconnectReason, dispatch: AppDispatch) => void;
    onError?: (error: Error, dispatch: AppDispatch) => void;
    eventHandlers?: SocketEventHandler[];
    actionHandlers?: SocketActionHandler[];
};
