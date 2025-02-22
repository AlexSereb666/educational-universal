import {memo, useEffect} from "react";
import {useSelector} from "react-redux";
import * as cls from './ChatBox.module.scss';
import {getChatMessangerChat, getChatMessangerIsLoading} from "entities/ChatMessanger";
import {Loader} from "shared/ui/Loader/Loader";
import {MessageListChat} from "features/MessageListChat";
import {ChatInput} from "features/ChatInput";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {chatMessangerActions, socket} from "entities/ChatMessanger";

export const ChatBox = memo(() => {
    const dispatch = useAppDispatch();

    const chat = useSelector(getChatMessangerChat);
    const isLoading = useSelector(getChatMessangerIsLoading);

    useEffect(() => {
        if (chat) {
            dispatch(chatMessangerActions.connectToChat(chat.id))

            socket.on('newMessage', (message) => {
                dispatch(chatMessangerActions.addMessage(message));
            });
        }

        return () => {
            dispatch(chatMessangerActions.disconnectFromChat());
        }
    }, [chat]);

    return (
        <div className={cls.chat_box}>
            {isLoading ? (
                <div className={cls.not_found_chat}>
                    <Loader />
                </div>
            ) : chat ? (
                <div className={cls.container}>
                    <div className={cls.message_list}>
                        <MessageListChat/>
                    </div>
                    <div className={cls.chat_input}>
                        <ChatInput/>
                    </div>
                </div>
            ) : (
                <div className={cls.not_found_chat}>
                    Выберите чат для начала общения
                </div>
            )}
        </div>
    )
})
