import React, {memo, useCallback, useEffect} from 'react';
import * as cls from './LoginForm.module.scss';
import {Input} from "@/shared/ui/Input/Input";
import {Button} from "@/shared/ui/Button/Button";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {loginActions, loginReducer} from "../../model/slice/loginSlice";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {getLoginUsername} from "@/features/Login/model/selectors/getLoginUsername/getLoginUsername";
import {getLoginPassword} from "@/features/Login/model/selectors/getLoginPassword/getLoginPassword";
import {getLoginIsLoading} from "@/features/Login/model/selectors/getLoginIsLoading/getLoginIsLoading";
import {getLoginError} from "@/features/Login/model/selectors/getLoginError/getLoginError";
import {loginByUsername} from "@/features/Login/model/services/loginByUsername/loginByUsername";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "@/shared/config/routerConfig/routerConfig";

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
        navigate(RoutePath.registration);
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
