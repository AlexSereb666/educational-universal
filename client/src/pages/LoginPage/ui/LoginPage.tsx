import React, {useEffect} from 'react';
import {LoginForm} from "@/features/Login";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "@/shared/config/routerConfig/routerConfig";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";

const LoginPage = () => {
    const navigate = useNavigate();
    const isAuth = useSelector(getUserAuthData);

    useEffect(() => {
        if (isAuth) {
            navigate(RoutePath.main)
        }
    }, [isAuth]);

    const onToggle = () => {
        navigate(RoutePath.main);
    }

    return (
        <div>
            <LoginForm
                onSuccess={onToggle}
            />
        </div>
    );
};

export default LoginPage;
