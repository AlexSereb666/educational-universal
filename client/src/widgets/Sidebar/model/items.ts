import iconChats from 'shared/assets/iconMessages.png';
import iconStorage from 'shared/assets/storage.png';
import iconArticles from 'shared/assets/articles.png';
import iconBank from 'shared/assets/bank.png';
import {RoutePathMain} from "shared/config/routerConfig";

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: string;
    authOnly?: boolean;
}

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
