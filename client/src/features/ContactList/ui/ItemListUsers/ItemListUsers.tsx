import {memo} from "react";
import defaultAvatar from '@/shared/assets/defaultAvatar.png';
import * as cls from './ItemListUsers.module.scss';

export interface ItemListUsersProps {
    id: number,
    login: string,
    onClick: () => void;
}

const truncateLogin = (login: string) => {
    if (login.length > 17) {
        return login.slice(0, 16) + '...';
    }
    return login;
};

export const ItemListUsers = memo( ({id, login, onClick}: ItemListUsersProps) => {
    return (
        <div className={cls.container} onClick={onClick}>
            <div className={cls.image}>
                <img
                    src={defaultAvatar as string}
                    alt={'Нет картинки'}
                />
            </div>
            <div className={cls.info}>
                {truncateLogin(login)}
            </div>
        </div>
    )
})
