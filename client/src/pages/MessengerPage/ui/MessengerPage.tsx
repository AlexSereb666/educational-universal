import React from 'react';
import * as cls from './MessengerPage.module.scss';
import {ContactListForm} from "@/features/ContactList";

const MessengerPage = () => {
    return (
        <div className={cls.container}>
            <div className={cls.menu}>
                <ContactListForm/>
            </div>
            <div>

            </div>
        </div>
    );
};

export default MessengerPage;
