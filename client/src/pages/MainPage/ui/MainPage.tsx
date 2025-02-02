import React from 'react';
import {Navbar} from "widgets/Navbar";
import {Sidebar} from "widgets/Sidebar";
import * as cls from './MainPage.module.scss';
import {Outlet} from "react-router-dom";

const MainPage = () => {
    return (
        <div>
            <Navbar />
            <div className={cls.container}>
                <div>
                    <Sidebar />
                </div>
                <div className={cls.content}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainPage;
