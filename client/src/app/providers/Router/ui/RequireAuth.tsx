import { useAuthUser } from '@/shared/lib/hooks/useAuthUser/useAuthUser';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserRoles, UserRoles } from '@/entities/User';
import { getRouteLogin } from '@/shared/const/router';
import { ReactNode } from 'react';
import { ProtectedLayout } from '@/widgets/ProtectedLayout';

interface RequireAuthProps {
    children: ReactNode;
    roles?: UserRoles[];
    authOnly?: boolean;
}

function RequireAuth(props: RequireAuthProps) {
    const { children, roles, authOnly } = props;

    const auth = useAuthUser();
    const location = useLocation();
    const userRoles = useSelector(getUserRoles);

    const hasRequiredRole = roles ? roles.some((role) => userRoles?.some((userRole) => userRole.slug === role)) : true;

    const hasRequiredAuth = authOnly ? auth && auth.isActivated : true;

    if (!hasRequiredAuth) {
        return (
            <Navigate
                to={getRouteLogin()}
                state={{ from: location }}
                replace
            />
        );
    }

    if (!hasRequiredRole) {
        return (
            <Navigate
                to={getRouteLogin()}
                replace
            />
        );
    }

    if (authOnly) {
        return <ProtectedLayout>{children}</ProtectedLayout>;
    }

    return children;
}

export default RequireAuth;
