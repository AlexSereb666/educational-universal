export enum UserRoles {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MODERATOR = 'MODERATOR',
}

export enum RolePermissions {
    edit_articles = 'edit_articles'
}

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
