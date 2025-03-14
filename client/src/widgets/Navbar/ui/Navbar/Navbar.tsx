import React from 'react';
import * as cls from './Navbar.module.scss';
import logo from '@/shared/assets/logo/LogoReact.svg';
import { ProfileMenu } from '../ProfileMenu/ProfileMenu';
import { NotificationButton } from '@/features/NotificationButton';
import { Icon } from '@/shared/ui/Icon';
import { HStack } from '@/shared/ui/Stack';

export const Navbar = () => {
    return (
        <div className={cls.container}>
            <HStack
                max
                justify="between"
            >
                <Icon
                    Svg={logo}
                    width={40}
                    height={40}
                    className={cls.logo}
                />
                <HStack gap={'16'}>
                    <NotificationButton />
                    <ProfileMenu />
                </HStack>
            </HStack>
        </div>
    );
};
