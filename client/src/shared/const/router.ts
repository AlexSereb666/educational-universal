export enum AppRoutes {
    LOGIN = 'login',
    REGISTRATION = 'registration',
    MAIN = 'main',
    MESSENGER = 'messenger',
    STORAGE = 'storage',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    PROFILE = 'profile',
    USER_SETTINGS = 'user_settings',
    NOT_FOUND = 'not_found',
}

export const getRouteLogin = () => `/`;
export const getRouteRegistration = () => `/registration`;
export const getRouteMain = () => `/main`;
export const getRouteMessenger = () => `/messenger`;
export const getRouteStorage = () => `/storage`;
export const getRouteArticles = () => `/articles`;
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticleCreate = () => `/articles/new`;
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteAdminPanel = () => `/admin`;
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteUserSettings = () => `/settings`;
