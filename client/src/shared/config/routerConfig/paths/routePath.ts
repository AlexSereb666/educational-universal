import {AppRoutes, AppRoutesMain} from "../const/Routes";

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.LOGIN]: '/',
    [AppRoutes.REGISTRATION]: '/registration',
    [AppRoutes.MAIN]: '/main',

    [AppRoutes.NOT_FOUND]: '*',
}

export const RoutePathMain: Record<AppRoutesMain, string> = {
    [AppRoutesMain.MESSENGER]: `${RoutePath.main}/messenger`,
    [AppRoutesMain.STORAGE]: `${RoutePath.main}/storage`,
    [AppRoutesMain.ARTICLES]: `${RoutePath.main}/articles`,
    [AppRoutesMain.ARTICLES_DETAILS]: `${RoutePath.main}/articles/`,
    [AppRoutesMain.ARTICLES_CREATE]: `${RoutePath.main}/articles/new`,
    [AppRoutesMain.ARTICLES_EDIT]: `${RoutePath.main}/articles/:id/edit`,
    [AppRoutesMain.ADMIN_PANEL]: `${RoutePath.main}/admin`,
}
