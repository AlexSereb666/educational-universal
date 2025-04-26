import { memo, useCallback } from 'react';
import * as cls from './ChatInfoPanel.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { useTranslation } from '@/shared/lib/hooks/useTranslation/useTranslation';
import { Text } from '@/shared/ui/Text';
import { getUserAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
    getChatMessangerChat,
    getChatMessangerParticipants,
} from '@/entities/ChatMessanger';
import { getUserAvatar } from '@/shared/lib/getUserAvatar/getUserAvatar';
import { truncateString } from '@/shared/lib/string/truncateString';
import { Icon } from '@/shared/ui/Icon';
import starIcon from '@/shared/assets/star.svg';

export const ChatInfoPanel = memo(() => {
    const { t } = useTranslation('ChatInfoPanel');

    const dispatch = useAppDispatch();
    const user = useSelector(getUserAuthData);
    const chat = useSelector(getChatMessangerChat);
    const participants = useSelector(getChatMessangerParticipants);

    const listUsersChat = useCallback(() => {
        return (
            <>
                {participants &&
                    participants.map((item, index) => (
                        <div
                            key={item.id}
                            className={cls.row}
                        >
                            <div className={cls.info}>
                                <Text>{`${index + 1}.`}</Text>
                                <img
                                    className={cls.image}
                                    src={getUserAvatar(item.avatar)}
                                    alt={'Аватар пользователя'}
                                />
                                <Text>{truncateString(item.login, 8)}</Text>
                            </div>
                            <Icon
                                Svg={starIcon}
                                className={cls.starIcon}
                            />
                        </div>
                    ))}
            </>
        );
    }, [participants, user]);

    const render = useCallback(() => {
        if (!chat) {
            return <Text>{t('Нет данных о чате')}</Text>;
        }

        return (
            <>
                <Text>{`${t('Участники')}:`}</Text>
                {listUsersChat()}
            </>
        );
    }, [listUsersChat, chat]);

    return (
        <VStack
            className={cls.ChatInfoPanel}
            gap={'8'}
        >
            {render()}
        </VStack>
    );
});
