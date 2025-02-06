import React from 'react';
import * as cls from './Navbar.module.scss';
import logo from 'shared/assets/logo.png';
import {ProfileMenu} from "../ProfileMenu/ProfileMenu";

export const Navbar = () => {
    return (
        <div className={cls.container}>
            <div className={cls.navbar}>
                <div className={cls.logo}>
                    <img src={logo as string} alt={'Нет логотипа'} />
                </div>
                <div>
                    <ProfileMenu />
                </div>
            </div>
        </div>
    );
};
