import {useAuthUser} from "@/shared/lib/hooks/useAuthUser/useAuthUser";
import {Navigate, useLocation} from "react-router-dom";
import {RoutePath} from "@/shared/config/routerConfig/routerConfig";

function RequireAuth({ children }: { children: React.ReactNode }) {
    const auth = useAuthUser();
    const location = useLocation();

    if (!auth) {
        return <Navigate to={RoutePath.login} state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
