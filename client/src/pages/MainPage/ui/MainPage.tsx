import React, {useEffect} from 'react';
import {Navbar} from "@/widgets/Navbar";
import {Sidebar} from "@/widgets/Sidebar";
import * as cls from './MainPage.module.scss';
import {Outlet} from "react-router-dom";
import {useAuthUser} from "@/shared/lib/hooks/useAuthUser/useAuthUser";

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
