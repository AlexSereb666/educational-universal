import React, { memo, useState, useRef } from "react";
import imageSend from "@/shared/assets/send.png";
import * as cls from "./ChatInput.module.scss";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {getChatMessangerChat} from "@/entities/ChatMessanger";
import {chatMessangerActions} from "@/entities/ChatMessanger/model/slice/chatMessangerSlice";

export const ChatInput = memo(() => {
    const dispatch = useAppDispatch();
    const chat = useSelector(getChatMessangerChat);

    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    };

    const sendMessageOnClick = () => {
        if (message.trim()) {
            dispatch(chatMessangerActions.sendMessage({
                chatId: chat.id,
                text: message,
            }))
            setMessage('');
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessageOnClick();
        }
    };

    return (
        <div className={cls.chatInputContainer}>
            <textarea
                ref={textareaRef}
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Введите сообщение..."
                className={cls.chatInputField}
                rows={1}
            />
            <button className={cls.sendButton} onClick={sendMessageOnClick}>
                <img src={imageSend as string} alt="Отправить" />
            </button>
        </div>
    );
});
