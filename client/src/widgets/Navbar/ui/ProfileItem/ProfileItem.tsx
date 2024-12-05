import React, {useState, useEffect, useRef, useCallback} from 'react';
import * as cls from './ProfileItem.module.scss';
import defaultAvatar from '@/shared/assets/defaultAvatar.png';
import imgComboBox from '@/shared/assets/comboBox.png';
import {useDispatch} from "react-redux";
import {logout, userActions} from "@/entities/User";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "@/shared/config/routerConfig/routerConfig";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

export const ProfileItem = () => {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const checkboxRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onLogout = useCallback(() => {
        dispatch(logout());
        navigate(RoutePath.login);
    }, [dispatch]);

    const openProfile = useCallback(() => {

    }, [dispatch])

    const handleToggle = () => {
        setMenuVisible(!isMenuVisible);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
            checkboxRef.current && !checkboxRef.current.contains(event.target as Node)) {
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={cls.container} onClick={handleToggle}>
            <div className={cls.avatar}>
                <img src={defaultAvatar as string} alt={'Нет аватарки'} />
            </div>
            <div className={cls.checkbox} ref={checkboxRef}>
                <img src={imgComboBox as string} alt={'Нет значка'} />
                {isMenuVisible &&
                    <div className={cls.menu} ref={menuRef} onClick={(event) => event.stopPropagation()}>
                        <div className={cls.itemMenu} onClick={openProfile}>
                            Профиль
                        </div>
                        <div className={cls.itemMenu} onClick={onLogout}>
                            Выйти из аккаунта
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};
