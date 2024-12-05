import React, {Suspense, useEffect} from 'react';
import {AppRouter} from "./providers/Router";
import {useDispatch, useSelector} from "react-redux";
import {getUserInited, userActions} from "@/entities/User";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {initAuth} from "@/entities/User/model/services/initAuth/initAuth";
import {ACCESS_TOKEN_KEY} from "@/shared/const/localstorage";

export const App = () => {
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(initAuth());
    }, [dispatch]);

    return (
        <div>
            <Suspense fallback="">
                {inited && <AppRouter />}
            </Suspense>
        </div>
    );
};
