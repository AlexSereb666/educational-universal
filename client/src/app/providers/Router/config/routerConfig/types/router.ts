import {RouteProps} from "react-router-dom";
import {UserRoles} from "@/entities/User";

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRoles[];
    listChildren?: AppRoutesProps[];
}
