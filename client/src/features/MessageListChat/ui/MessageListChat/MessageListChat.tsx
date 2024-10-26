import { memo, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getChatMessangerChat, getChatMessangerMessages } from "@/entities/ChatMessanger";
import * as cls from './MessageListChat.module.scss';

export const MessageListChat = memo(() => {
    const chat = useSelector(getChatMessangerChat);
    const messages = useSelector(getChatMessangerMessages);
    const messagesEndRef = useRef(null);

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const ListMessages = () => (
        <>
            {messages && messages.map(item => (
                <div key={item.id}
                     className={chat && chat.users[0].userId === item.userId ? cls.alien_message : cls.my_message}>
                    <div>{item.text}</div>
                    <div className={cls.date}>{formatTime(item.createdAt)}</div>
                </div>
            ))}
        </>
    );

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className={cls.container}>
            {ListMessages()}
            <div ref={messagesEndRef} />
        </div>
    );
});
