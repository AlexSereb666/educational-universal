import React, {useMemo, useState} from 'react';
import * as cls from './Sidebar.module.scss';
import {SidebarItem} from "../SidebarItem/SidebarItem";
import iconChats from "@/shared/assets/iconMessages.png";
import iconBank from "@/shared/assets/bank.png";
import iconArticles from "@/shared/assets/articles.png";
import iconStorage from "@/shared/assets/storage.png";
import {getRouteArticles, getRouteMessenger, getRouteStorage} from "@/shared/const/router";

interface SidebarItemType {
    path: string;
    text: string;
    Icon: string;
    authOnly?: boolean;
}

export type {SidebarItemType};

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: getRouteMessenger(),
        Icon: iconChats as string,
        text: 'Мессенджер',
        authOnly: true,
    },
    {
        path: getRouteStorage(),
        Icon: iconBank as string,
        text: 'Хранилище',
        authOnly: true,
    },
    {
        path: getRouteArticles(),
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
