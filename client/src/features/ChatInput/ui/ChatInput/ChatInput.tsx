import React, { memo, useState, useRef } from 'react';
import * as cls from './ChatInput.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getChatMessangerChat } from '@/entities/ChatMessanger';
import { chatMessangerActions } from '@/entities/ChatMessanger';
import Send from '@/shared/assets/icons/Send.svg';
import { Icon } from '@/shared/ui/Icon';

interface ChatInputProps {
    disabled?: boolean;
}

export const ChatInput = memo(({ disabled }: ChatInputProps) => {
    const dispatch = useAppDispatch();
    const chat = useSelector(getChatMessangerChat);

    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    };

    const sendMessageOnClick = () => {
        if (message.trim() && chat && !disabled) {
            dispatch(
                chatMessangerActions.sendMessageRequest({
                    chatId: chat.id,
                    text: message,
                }),
            );

            setMessage('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
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
                disabled={disabled || !chat}
            />
            <button
                className={cls.sendButton}
                onClick={sendMessageOnClick}
                disabled={disabled || !chat || !message.trim()}
            >
                <Icon
                    Svg={Send}
                    width={30}
                    height={30}
                    className={cls.iconSend}
                />
            </button>
        </div>
    );
});
