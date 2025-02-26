import React, {memo, useCallback, useEffect} from 'react';
import * as cls from './LoginForm.module.scss';
import {Input} from "@/shared/ui/Input";
import {Button} from "@/shared/ui/Button";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {loginActions, loginReducer} from "../../model/slice/loginSlice";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {getLoginUsername} from "../../model/selectors/getLoginUsername/getLoginUsername";
import {getLoginPassword} from "../../model/selectors/getLoginPassword/getLoginPassword";
import {getLoginIsLoading} from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import {getLoginError} from "../../model/selectors/getLoginError/getLoginError";
import {loginByUsername} from "../../model/services/loginByUsername/loginByUsername";
import {useNavigate} from "react-router-dom";
import {getRouteRegistration} from "@/shared/const/router";

export interface LoginFormProps {
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    login: loginReducer,
};

export const LoginForm = memo(({onSuccess}: LoginFormProps) => {
    const dispatch = useAppDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const navigate = useNavigate();

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));

        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, onSuccess, username, password]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                onLoginClick().then(message => console.log(message));
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const goToRegistration = () => {
        navigate(getRouteRegistration());
    }

    return (
        <DynamicModuleLoader
            removeAfterUnmount
            reducers={initialReducers}
        >
            <div className={cls.container}>
                <h1>Авторизация</h1>
                {error && <span>Вы ввели неверный логин или пароль</span>}
                <Input
                    type={'text'}
                    label={'Логин'}
                    size={'medium'}
                    onChange={onChangeUsername}
                    value={username}
                />
                <Input
                    type={'text'}
                    label={'Пароль'}
                    size={'medium'}
                    onChange={onChangePassword}
                    value={password}
                />
                <Button
                    size="medium"
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    Войти
                </Button>
                <div className={cls.register}>
                    Нет аккаунта? <span onClick={goToRegistration}>Зарегистрируйся!</span>
                </div>
            </div>
        </DynamicModuleLoader>
    );
});
