import React, {memo, useCallback, useEffect} from "react";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {registrationActions, registrationReducer} from "@/features/Registration/model/slice/registrationSlice";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {
    getRegistrationUsername
} from "@/features/Registration/model/selectors/getRegistrationUsername/getRegistrationUsername";
import {
    getRegistrationPassword
} from "@/features/Registration/model/selectors/getRegistrationPassword/getRegistrationPassword";
import {
    getRegistrationIsLoading
} from "@/features/Registration/model/selectors/getRegistrationIsLoading/getRegistrationIsLoading";
import {getRegistrationError} from "@/features/Registration/model/selectors/getRegistrationError/getRegistrationError";
import {useNavigate} from "react-router-dom";
import {registrationByUser} from "@/features/Registration/model/services/registrationByUser/RegistrationByUser";
import {RoutePath} from "@/shared/config/routerConfig/routerConfig";
import * as cls from "./RegistrationForm.module.scss";
import {Input} from "@/shared/ui/Input/Input";
import {Button} from "@/shared/ui/Button/Button";
import {getUserAuthData} from "@/entities/User";

export interface RegistrationFormProps {
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    registration: registrationReducer,
}

export const RegistrationForm = memo(({onSuccess}: RegistrationFormProps) => {
    const dispatch = useAppDispatch();
    const username = useSelector(getRegistrationUsername);
    const password = useSelector(getRegistrationPassword);
    const isLoading = useSelector(getRegistrationIsLoading);
    const error = useSelector(getRegistrationError);

    const navigate = useNavigate();

    const onChangeUsername = useCallback((value: string) => {
        dispatch(registrationActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(registrationActions.setPassword(value));
    }, [dispatch]);

    const onRegistrationClick = useCallback(async () => {
        const result = await dispatch(registrationByUser({username, password}));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, onSuccess, username, password])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                onRegistrationClick().then(message => console.log(message));
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const goToLogin = () => {
        navigate(RoutePath.login);
    }

    return (
        <DynamicModuleLoader
            removeAfterUnmount
            reducers={initialReducers}
        >
            <div className={cls.container}>
                <h1>Регистрация</h1>
                {error && <span>Данный логин уже занят</span>}
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
                    onClick={onRegistrationClick}
                    disabled={isLoading}
                >
                    Зарегистрироваться
                </Button>
                <div className={cls.register}>
                    Уже есть аккаунт? <span onClick={goToLogin}>Авторизоваться!</span>
                </div>
            </div>
        </DynamicModuleLoader>
    )
})
