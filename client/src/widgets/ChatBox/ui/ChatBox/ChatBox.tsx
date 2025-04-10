import { memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as cls from './ChatBox.module.scss';
import {
    getChatMessangerChat,
    getChatMessangerConnectionStatus,
    getChatMessangerIsLoading,
} from '@/entities/ChatMessanger';
import { Loader } from '@/shared/ui/Loader';
import { MessageListChat } from 'features/MessageListChat';
import { ChatInput } from '@/features/ChatInput';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { chatMessangerActions } from '@/entities/ChatMessanger';
import { Text } from '@/shared/ui/Text';
import { ConnectionStatus } from '@/shared/const/connectionStatus';

export const ChatBox = memo(() => {
    const dispatch = useAppDispatch();

    const chat = useSelector(getChatMessangerChat);
    const isLoading = useSelector(getChatMessangerIsLoading);
    const connectionStatus = useSelector(getChatMessangerConnectionStatus);

    const connectedChatIdRef = useRef<number | null>(null);

    useEffect(() => {
        const newChatId = chat?.id ?? null;

        if (newChatId !== connectedChatIdRef.current) {
            if (connectedChatIdRef.current !== null) {
                dispatch(chatMessangerActions.disconnect());
            }

            if (newChatId !== null) {
                dispatch(chatMessangerActions.startConnecting(newChatId));
                connectedChatIdRef.current = newChatId;
            } else {
                dispatch(chatMessangerActions.clearChatData());
                connectedChatIdRef.current = null;
            }
        }
    }, [chat, dispatch]);

    useEffect(() => {
        return () => {
            console.log('ChatBox UNMOUNTING. Disconnecting and clearing data');
            dispatch(chatMessangerActions.disconnect());
            dispatch(chatMessangerActions.clearChatData());
            connectedChatIdRef.current = null;
        };
    }, [dispatch]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className={cls.not_found_chat}>
                    <Loader />
                </div>
            );
        }

        if (!chat) {
            return (
                <div className={cls.not_found_chat}>
                    <Text>Выберите чат для начала общения</Text>
                </div>
            );
        }

        if (connectionStatus === ConnectionStatus.PENDING) {
            return (
                <div className={cls.not_found_chat}>
                    <Loader />
                </div>
            );
        }

        if (connectionStatus === ConnectionStatus.ERROR) {
            return (
                <div className={cls.not_found_chat}>
                    <Text>Ошибка подключения к чату</Text>
                </div>
            );
        }

        if (
            chat &&
            (connectionStatus === ConnectionStatus.CONNECTED ||
                connectionStatus === ConnectionStatus.DISCONNECTING ||
                connectionStatus === ConnectionStatus.IDLE)
        ) {
            return (
                <div className={cls.container}>
                    <div className={cls.message_list}>
                        <MessageListChat />
                    </div>
                    <div className={cls.chat_input}>
                        <ChatInput
                            disabled={connectionStatus !== ConnectionStatus.CONNECTED}
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className={cls.not_found_chat}>
                <Text>Что-то пошло не так...</Text>
            </div>
        );
    };

    return <div className={cls.chat_box}>{renderContent()}</div>;
});
