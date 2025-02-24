import React, {useEffect} from 'react';
import {LoginForm} from "features/Login";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "@/app/providers/Router/config/routerConfig";
import {useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";

const LoginPage = () => {
    const navigate = useNavigate();
    const authData = useSelector(getUserAuthData);

    useEffect(() => {
        if (authData && authData.isActivated) {
            navigate(RoutePath.main)
        }
    }, [authData]);

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
