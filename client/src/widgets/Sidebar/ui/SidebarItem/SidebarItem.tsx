import React, {memo} from 'react';
import * as cls from './SidebarItem.module.scss';
import { SidebarItemType } from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { getUserAuthData } from "entities/User";
import classNames from 'classnames';
import { Link } from "react-router-dom";

interface SidebarItemProps {
    item: SidebarItemType;
    isActive?: boolean;
    onClick?: () => void;
}

export const SidebarItem = memo(({ item, isActive, onClick }: SidebarItemProps) => {
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <Link to={item.path} className={classNames(cls.container)} onClick={onClick}>
            <img
                className={cls.icon}
                src={item.Icon}
                alt={item.text}
            />
            <span className={classNames({ [cls.activeText]: isActive }, cls.mode)}>
                {item.text}
            </span>
        </Link>
    );
});
