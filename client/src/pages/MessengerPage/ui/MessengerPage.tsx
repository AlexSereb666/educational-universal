import React from 'react';
import * as cls from './MessengerPage.module.scss';
import {SidebarMessanger} from "@/widgets/SidebarMessanger";
import {ChatBox} from "@/widgets/ChatBox";

const MessengerPage = () => {
    return (
        <div className={cls.container}>
            <div className={cls.menu}>
                <SidebarMessanger />
            </div>
            <div>
                <ChatBox />
            </div>
        </div>
    );
};

export default MessengerPage;
