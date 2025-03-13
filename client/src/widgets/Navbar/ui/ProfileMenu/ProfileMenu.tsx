import React, { useCallback } from 'react';
import * as cls from './ProfileMenu.module.scss';
import defaultAvatar from '@/shared/assets/defaultAvatar.png';
import { isUserAdmin, logout } from '@/entities/User';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAuthUser } from '@/shared/lib/hooks/useAuthUser/useAuthUser';
import { Dropdown, DropdownItem } from '@/shared/ui/Dropdown';
import { useSelector } from 'react-redux';
import {
    getRouteAdminPanel,
    getRouteArticleCreate,
    getRouteLogin,
    getRouteProfile,
    getRouteUserSettings,
} from '@/shared/const/router';

export const ProfileMenu = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAuthUser();
    const isAdmin = useSelector(isUserAdmin);

    const onLogout = useCallback(() => {
        dispatch(logout());
        navigate(getRouteLogin());
    }, [dispatch]);

    const items: DropdownItem[] = [
        {
            content: 'Профиль',
            href: getRouteProfile(String(user.id)),
        },
        {
            content: 'Создать статью',
            href: getRouteArticleCreate(),
        },
        ...(isAdmin
            ? [
                  {
                      content: 'Админ панель',
                      href: getRouteAdminPanel(),
                  },
              ]
            : []),
        {
            content: 'Настройки',
            href: getRouteUserSettings(),
        },
        {
            content: 'Выйти из аккаунта',
            onClick: onLogout,
        },
    ];

    return (
        <>
            <Dropdown
                trigger={
                    <div className={cls.avatar}>
                        <img
                            src={defaultAvatar as string}
                            alt={'Нет аватарки'}
                        />
                    </div>
                }
                items={items}
            />
        </>
    );
};
