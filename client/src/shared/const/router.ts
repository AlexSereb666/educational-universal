export enum AppRoutes {
    LOGIN = 'login',
    REGISTRATION = 'registration',
    MAIN = 'main',

    NOT_FOUND = 'not_found',
}

export const getRouteLogin = () => `/`;
export const getRouteRegistration = () => `/registration`;
export const getRouteMain = () => `/main`;

export const getRouteMessenger = () => `${getRouteMain()}/messenger`;
export const getRouteStorage = () => `${getRouteMain()}/storage`;
export const getRouteArticles = () => `${getRouteMain()}/articles`;
export const getRouteArticleDetails = (id: string) => `${getRouteMain()}/articles/${id}`;
export const getRouteArticleCreate = () => `${getRouteMain()}/articles/new`;
export const getRouteArticleEdit = (id: string) => `${getRouteMain()}/articles/${id}/edit`;
export const getRouteAdminPanel = () => `${getRouteMain()}/admin`;
