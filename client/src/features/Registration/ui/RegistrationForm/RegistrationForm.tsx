import React, {memo, useCallback, useEffect} from "react";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {registrationActions, registrationReducer} from "../../model/slice/registrationSlice";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {
    getRegistrationUsername
} from "../../model/selectors/getRegistrationUsername/getRegistrationUsername";
import {
    getRegistrationPassword
} from "../../model/selectors/getRegistrationPassword/getRegistrationPassword";
import {
    getRegistrationIsLoading
} from "../../model/selectors/getRegistrationIsLoading/getRegistrationIsLoading";
import {getRegistrationError} from "../../model/selectors/getRegistrationError/getRegistrationError";
import {useNavigate} from "react-router-dom";
import {registrationByUser} from "../../model/services/registrationByUser/RegistrationByUser";
import {RoutePath} from "shared/config/routerConfig";
import * as cls from "./RegistrationForm.module.scss";
import {Input} from "shared/ui/Input/Input";
import {Button} from "shared/ui/Button/Button";
import {getRegistrationEmail} from "../../model/selectors/getRegistrationEmail/getRegistrationEmail";

export interface RegistrationFormProps {
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    registration: registrationReducer,
}

export const RegistrationForm = memo(({onSuccess}: RegistrationFormProps) => {
    const dispatch = useAppDispatch();
    const username = useSelector(getRegistrationUsername);
    const email = useSelector(getRegistrationEmail);
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

    const onChangeEmail = useCallback((value: string) => {
        dispatch(registrationActions.setEmail(value));
    }, [dispatch]);

    const onRegistrationClick = useCallback(async () => {
        const result = await dispatch(registrationByUser({username, password, email}));
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
                    label={'Email'}
                    size={'medium'}
                    onChange={onChangeEmail}
                    value={email}
                />
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
