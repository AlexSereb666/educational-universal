import {RolePermissions, UserRoles} from "../const/user";

export interface Permission {
    id: number;
    name: string;
    slug: RolePermissions;
}

export interface Role {
    id: number;
    name: string;
    slug: UserRoles;
}

export interface User {
    id: number;
    username?: string;
    login?: string;
    email: string;
    isActivated: boolean;
    roles: Role[];
    permissions: Permission[];
}

export interface UserSchema {
    authData?: User;
    _inited: boolean;
}
