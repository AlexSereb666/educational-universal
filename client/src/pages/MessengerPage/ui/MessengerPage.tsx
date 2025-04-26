import React from 'react';
import * as cls from './MessengerPage.module.scss';
import { SidebarMessanger } from 'widgets/SidebarMessanger';
import { ChatBox } from 'widgets/ChatBox';
import { ChatInfoPanel } from '@/widgets/ChatInfoPanel';
import { Split } from '@/shared/ui/Stack';

const MessengerPage = () => {
    return (
        <div className={cls.container}>
            <div className={cls.menu}>
                <SidebarMessanger />
            </div>
            <Split
                ratio="4:1"
                gap="16"
            >
                <ChatBox />
                <ChatInfoPanel />
            </Split>
        </div>
    );
};

export default MessengerPage;
