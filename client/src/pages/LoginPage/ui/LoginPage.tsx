import React, {useEffect} from 'react';
import {LoginForm} from "@/features/Login";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";
import {getRouteMain} from "@/shared/const/router";

const LoginPage = () => {
    const navigate = useNavigate();
    const authData = useSelector(getUserAuthData);

    useEffect(() => {
        if (authData && authData.isActivated) {
            navigate(getRouteMain())
        }
    }, [authData]);

    const onToggle = () => {
        navigate(getRouteMain());
    }

    return (
        <div data-testid="LoginPage">
            <LoginForm
                onSuccess={onToggle}
            />
        </div>
    );
};

export default LoginPage;
