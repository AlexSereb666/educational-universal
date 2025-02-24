import React, {useState, useCallback} from 'react';
import * as cls from './ProfileMenu.module.scss';
import defaultAvatar from 'shared/assets/defaultAvatar.png';
import {isUserAdmin, logout} from "entities/User";
import {useNavigate} from "react-router-dom";
import {RoutePath, RoutePathMain} from "@/app/providers/Router/config/routerConfig";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useAuthUser} from "shared/lib/hooks/useAuthUser/useAuthUser";
import {Modal} from "@/shared/ui/Modal";
import {ModalProfile} from "features/Profile";
import {Dropdown, DropdownItem} from "@/shared/ui/Dropdown";
import {useSelector} from "react-redux";

export const ProfileMenu = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAuthUser();
    const isAdmin = useSelector(isUserAdmin);

    const [isModalProfileOpen, setIsModalProfileOpen] = useState(false);

    const onLogout = useCallback(() => {
        dispatch(logout());
        navigate(RoutePath.login);
    }, [dispatch]);

    const openModalProfile = useCallback(() => {
        setIsModalProfileOpen(true);
    }, [dispatch]);

    const closeModalProfile = useCallback(() => {
        setIsModalProfileOpen(false);
    }, [dispatch]);

    const onCreateArticle = useCallback(() => {
        navigate(RoutePathMain.articles_create);
    }, [navigate]);

    const onOpenAdminPanel = useCallback(() => {
        navigate(RoutePathMain.admin_panel);
    }, [navigate]);

    const items: DropdownItem[] = [
        {
            content: 'Профиль',
            onClick: openModalProfile,
        },
        {
            content: 'Создать статью',
            onClick: onCreateArticle,
        },
        ...(isAdmin ? [{
            content: 'Админ панель',
            onClick: onOpenAdminPanel,
        }]: []),
        {
            content: 'Выйти из аккаунта',
            onClick: onLogout,
        }
    ];

    return (
        <>
            <Dropdown
                trigger={
                    <div className={cls.avatar}>
                        <img src={defaultAvatar as string} alt={'Нет аватарки'}/>
                    </div>
                }
                items={items}
            />
            <Modal
                isOpen={isModalProfileOpen}
                onClose={closeModalProfile}
                lazy={true}
            >
                <ModalProfile
                    id={user.id}
                />
            </Modal>
        </>
    );
};
