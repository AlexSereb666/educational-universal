import React, { ReactNode } from 'react';
import { Navbar } from '../../Navbar';
import { Sidebar } from '../../Sidebar';
import * as cls from './ProtectedLayout.module.scss';

interface ProtectedLayoutProps {
    children: ReactNode;
}

export const ProtectedLayout = (props: ProtectedLayoutProps) => {
    const { children } = props;

    return (
        <div>
            <Navbar />
            <div className={cls.container}>
                <div>
                    <Sidebar />
                </div>
                <main className={cls.content}>{children}</main>
            </div>
        </div>
    );
};
