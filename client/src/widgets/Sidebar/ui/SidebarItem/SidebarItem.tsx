import React, { memo, useEffect } from 'react';
import * as cls from './SidebarItem.module.scss';
import { SidebarItemType } from '../Sidebar/Sidebar';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';
import { useAuthUser } from '@/shared/lib/hooks/useAuthUser/useAuthUser';

interface SidebarItemProps {
    item: SidebarItemType;
    isActive?: boolean;
    onClick?: () => void;
}

export const SidebarItem = memo(({ item, isActive, onClick }: SidebarItemProps) => {
    const isAuth = useAuthUser();

    if (item.authOnly && !isAuth) {
        return null;
    }

    const hasRole = isAuth?.roles?.some((role) => item.roles?.includes(role.slug));
    if (item.roles && !hasRole) {
        return null;
    }

    return (
        <Link
            to={item.path}
            className={classNames(cls.container)}
            onClick={onClick}
        >
            <Icon
                Svg={item.Icon}
                width={25}
                height={25}
                className={cls.icon}
            />
            <Text
                className={cls.text}
                size={'small'}
            >
                {item.text}
            </Text>
        </Link>
    );
});
