import { memo } from 'react';
import * as cls from './ItemListUsers.module.scss';
import { truncateString } from '@/shared/lib/string/truncateString';
import { getUserAvatar } from '@/shared/lib/getUserAvatar/getUserAvatar';

export interface ItemListUsersProps {
    id: number;
    login: string;
    avatar: string | null;
    onClick: () => void;
}

export const ItemListUsers = memo((props: ItemListUsersProps) => {
    const { id, login, avatar, onClick } = props;

    return (
        <div
            className={cls.container}
            onClick={onClick}
        >
            <div className={cls.image}>
                <img
                    src={getUserAvatar(avatar)}
                    alt={'Аватар пользователя'}
                />
            </div>
            <div className={cls.info}>{truncateString(login, 10)}</div>
        </div>
    );
});
