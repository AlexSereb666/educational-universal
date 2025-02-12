import React, {memo, Suspense, useCallback} from 'react';
import { Route, Routes } from 'react-router-dom';
import {AppRoutesProps, routeConfig} from "shared/config/routerConfig";
import {PageLoader} from "widgets/PageLoader/PageLoader";
import RequireAuth from "app/providers/Router/ui/RequireAuth";

const AppRouter = () => {
    const renderWithWrapper = useCallback((routes: AppRoutesProps[]) => {
        return routes.map(route => (
            <Route
                key={route.path}
                path={route.path}
                element={
                    <RequireAuth
                        roles={route.roles}
                        authOnly={route.authOnly}
                    >
                        {route.element}
                    </RequireAuth>
                }
            >
                {route.listChildren && renderWithWrapper(route.listChildren)}
            </Route>
        ));
    }, []);

    return (
        <Suspense fallback={<PageLoader/>}>
            <Routes>
                {renderWithWrapper(Object.values(routeConfig))}
            </Routes>
        </Suspense>
    );
};

export default memo(AppRouter);
