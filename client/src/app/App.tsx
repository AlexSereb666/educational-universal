import React, {Suspense, useEffect} from 'react';
import {AppRouter} from "./providers/Router";
import {useDispatch, useSelector} from "react-redux";
import {getUserInited, userActions} from "@/entities/User";

export const App = () => {
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div>
            <Suspense fallback="">
                {inited && <AppRouter />}
            </Suspense>
        </div>
    );
};
