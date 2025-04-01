import { memo } from 'react';
import defaultAvatar from 'shared/assets/defaultAvatar.png';
import * as cls from './ItemListUsers.module.scss';
import { truncateString } from '@/shared/lib/string/truncateString';

export interface ItemListUsersProps {
    id: number;
    login: string;
    onClick: () => void;
}

export const ItemListUsers = memo(({ id, login, onClick }: ItemListUsersProps) => {
    return (
        <div
            className={cls.container}
            onClick={onClick}
        >
            <div className={cls.image}>
                <img
                    src={defaultAvatar}
                    alt={'Нет картинки'}
                />
            </div>
            <div className={cls.info}>{truncateString(login, 10)}</div>
        </div>
    );
});
