import {useAuthUser} from "shared/lib/hooks/useAuthUser/useAuthUser";
import {Navigate, useLocation} from "react-router-dom";
import {RoutePath} from "../config/routerConfig";
import {useSelector} from "react-redux";
import {getUserRoles, UserRoles} from "../../../../entities/User";

interface RequireAuthProps {
    children: React.ReactNode;
    roles?: UserRoles[];
    authOnly?: boolean;
}

function RequireAuth(props: RequireAuthProps) {
    const {
        children,
        roles,
        authOnly
    } = props;

    const auth = useAuthUser();
    const location = useLocation();
    const userRoles = useSelector(getUserRoles);

    const hasRequiredRole = roles
        ? roles.some((role) => userRoles?.some((userRole) => userRole.slug === role))
        : true;

    const hasRequiredAuth = authOnly
        ? auth && auth.isActivated
        : true;

    if (!hasRequiredAuth) {
        return <Navigate to={RoutePath.login} state={{ from: location }} replace />;
    }

    if (!hasRequiredRole) {
        return <Navigate to={RoutePath.main} replace />;
    }

    return children;
};

export default RequireAuth;
