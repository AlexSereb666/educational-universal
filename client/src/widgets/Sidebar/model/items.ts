import {RoutePathMain} from "@/shared/config/routerConfig/routerConfig";
import iconChats from '@/shared/assets/iconMessages.png';
import iconStorage from '@/shared/assets/storage.png';
import iconArticles from '@/shared/assets/articles.png';

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
        Icon: iconStorage as string,
        text: 'Хранилище',
        authOnly: true,
    },
    {
        path: RoutePathMain.articles,
        Icon: iconArticles as string,
        text: 'Статьи',
        authOnly: true,
    }
]
