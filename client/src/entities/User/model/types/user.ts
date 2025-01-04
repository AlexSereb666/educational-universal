export interface User {
    id: number;
    username: string;
    login?: string;
    email: string;
    isActivated: boolean;
}

export interface UserSchema {
    authData?: User;

    _inited: boolean;
}
