import { Middleware, MiddlewareAPI, AnyAction } from 'redux';
import { io, Socket } from 'socket.io-client';
import { StateSchema } from '@/app/providers/StoreProvider';
import { SocketModuleConfig } from '@/shared/types/socket';

export type AppGetState = MiddlewareAPI<any, StateSchema>['getState'];

export const createSocketMiddleware = (
    modules: SocketModuleConfig[],
): Middleware<{}, StateSchema> => {
    const sockets: Record<string, Socket | null> = {};

    return (api: MiddlewareAPI<any, StateSchema>) => (next) => (action: AnyAction) => {
        const { dispatch, getState } = api;

        for (const module of modules) {
            const {
                matchStart,
                matchStop,
                namespace,
                onConnect,
                onDisconnect,
                onError,
                eventHandlers,
                actionHandlers,
            } = module;

            if (matchStart(action)) {
                const oldSocket = sockets[namespace];
                if (oldSocket) {
                    console.log(
                        `[${namespace}] Disconnecting previous socket before reconnecting`,
                    );
                    oldSocket.disconnect();
                }

                console.log(
                    `[${namespace}] Attempting to connect to ${__API__}/${namespace}`,
                );
                const newSocket = io(`${__API__}/${namespace}`);
                sockets[namespace] = newSocket;

                newSocket.on('connect', () => {
                    onConnect?.(newSocket, action, dispatch);
                });

                newSocket.on('disconnect', (reason) => {
                    console.log(`[${namespace}] Socket disconnected. Reason:`, reason);
                    onDisconnect?.(reason, dispatch);
                    sockets[namespace] = null;
                });

                newSocket.on('connect_error', (error) => {
                    onError?.(error, dispatch);
                    newSocket.disconnect();
                    sockets[namespace] = null;
                });

                eventHandlers?.forEach(({ event, handler }) => {
                    newSocket.on(event, (...args) => {
                        console.log(
                            `[${namespace}] Raw event received. Event: "${event}". Args:`,
                            JSON.stringify(args),
                        );

                        const eventPayload = args.length > 1 ? args[1] : args[0];
                        console.log(
                            `[${namespace}] Extracted payload for event "${event}":`,
                            eventPayload,
                        );

                        handler({
                            socket: newSocket,
                            dispatch,
                            getState,
                            payload: eventPayload,
                        });
                    });
                    console.log(
                        `[${namespace}] Registered handler for incoming event: "${event}"`,
                    );
                });
            }

            if (matchStop(action)) {
                const socket = sockets[namespace];
                if (socket) {
                    console.log(
                        `[${namespace}] Disconnecting socket due to stop action.`,
                    );
                    socket.disconnect();
                    sockets[namespace] = null;
                }
            }

            const matchedActionHandler = actionHandlers?.find((h) => h.match(action));
            if (matchedActionHandler) {
                const socket = sockets[namespace];
                if (socket && socket.connected) {
                    console.log(
                        `[${namespace}] Action "${action.type}" matched. Executing corresponding actionHandler.`,
                    );

                    matchedActionHandler.handler({ socket, action, dispatch, getState });
                } else {
                    console.error(
                        `[${namespace}] Cannot execute actionHandler for "${action.type}". Socket is not connected or doesn't exist.`,
                    );
                }
            }
        }

        return next(action);
    };
};
