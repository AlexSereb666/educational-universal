import React, {memo, Suspense, useEffect, useMemo} from 'react';
import { Route, Routes } from 'react-router-dom';
import {AppRoutesProps, routeConfig} from "@/shared/config/routerConfig/routerConfig";
import {useDispatch, useSelector} from "react-redux";
import {getUserAuthData, userActions} from "@/entities/User";
import {PageLoader} from "@/widgets/PageLoader/PageLoader";

const renderRoutes = (routes: AppRoutesProps[]) => {
    return routes.map(route => (
        <Route
            key={route.path}
            path={route.path}
            element={route.element}
        >
            {route.listChildren && renderRoutes(route.listChildren)}
        </Route>
    ));
};

const AppRouter = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(getUserAuthData);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    const routes = useMemo(() => Object.values(routeConfig).filter((route) => {
        if (route.authOnly && !isAuth) {
            return false;
        }

        return true;
    }), [isAuth]);

    return (
        <Suspense fallback={<PageLoader/>}>
            <Routes>
                {renderRoutes(routes)}
            </Routes>
        </Suspense>
    );
};

export default memo(AppRouter);
