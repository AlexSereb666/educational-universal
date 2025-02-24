import React, {useMemo, useState} from 'react';
import * as cls from './Sidebar.module.scss';
import {SidebarItem} from "../SidebarItem/SidebarItem";
import {RoutePathMain} from "@/app/providers/Router/config/routerConfig";
import iconChats from "@/shared/assets/iconMessages.png";
import iconBank from "@/shared/assets/bank.png";
import iconArticles from "@/shared/assets/articles.png";
import iconStorage from "@/shared/assets/storage.png";

interface SidebarItemType {
    path: string;
    text: string;
    Icon: string;
    authOnly?: boolean;
}

export type {SidebarItemType};

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: RoutePathMain.messenger,
        Icon: iconChats as string,
        text: 'Мессенджер',
        authOnly: true,
    },
    {
        path: RoutePathMain.storage,
        Icon: iconBank as string,
        text: 'Хранилище',
        authOnly: true,
    },
    {
        path: RoutePathMain.articles,
        Icon: iconArticles as string,
        text: 'Статьи',
        authOnly: true,
    },
    {
        path: '#',
        Icon: iconStorage as string,
        text: 'База данных',
        authOnly: true,
    }
]

export const Sidebar = () => {
    const [indexActiveItem, setIndexActiveItem] = useState(null);

    const itemsList = useMemo(() => SidebarItemsList.map((item, index) => (
        <SidebarItem
            item={item}
            isActive={indexActiveItem === index}
            key={item.path}
            onClick={() => setIndexActiveItem(index)}
        />
    )), [indexActiveItem]);

    return (
        <div className={cls.container}>
            {itemsList}
        </div>
    );
};
