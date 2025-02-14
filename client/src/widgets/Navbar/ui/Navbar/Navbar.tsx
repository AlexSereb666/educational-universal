import React from 'react';
import * as cls from './Navbar.module.scss';
import logo from 'shared/assets/logo.png';
import {ProfileMenu} from "../ProfileMenu/ProfileMenu";
import {NotificationButton} from "features/NotificationButton";

export const Navbar = () => {
    return (
        <div className={cls.container}>
            <div className={cls.navbar}>
                <div className={cls.logo}>
                    <img src={logo} alt={'Нет логотипа'} />
                </div>
                <div className={cls.items}>
                    <NotificationButton />
                    <ProfileMenu />
                </div>
            </div>
        </div>
    );
};
