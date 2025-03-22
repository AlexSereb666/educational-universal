import React, { useMemo, useState } from 'react';
import * as cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import iconMessage from '@/shared/assets/icons/MessageOutlined.svg';
import iconCloud from '@/shared/assets/icons/Cloud.svg';
import iconArticles from '@/shared/assets/icons/Articles.svg';
import iconDatabase from '@/shared/assets/icons/Database.svg';
import {
    getRouteArticles,
    getRouteCloudStorage,
    getRouteMessenger,
} from '@/shared/const/router';
import { VStack } from '@/shared/ui/Stack';

interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
    authOnly?: boolean;
}

export type { SidebarItemType };

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: getRouteMessenger(),
        Icon: iconMessage,
        text: 'Мессенджер',
        authOnly: true,
    },
    {
        path: getRouteCloudStorage(),
        Icon: iconCloud,
        text: 'Облачное хранилище',
        authOnly: true,
    },
    {
        path: getRouteArticles(),
        Icon: iconArticles,
        text: 'Статьи',
        authOnly: true,
    },
    {
        path: '#',
        Icon: iconDatabase,
        text: 'База данных',
        authOnly: true,
    },
];

export const Sidebar = () => {
    const [indexActiveItem, setIndexActiveItem] = useState(null);

    const itemsList = useMemo(
        () =>
            SidebarItemsList.map((item, index) => (
                <SidebarItem
                    item={item}
                    isActive={indexActiveItem === index}
                    key={item.path}
                    onClick={() => setIndexActiveItem(index)}
                />
            )),
        [indexActiveItem],
    );

    return (
        <div className={cls.container}>
            <VStack
                max
                gap={'16'}
            >
                {itemsList}
            </VStack>
        </div>
    );
};
