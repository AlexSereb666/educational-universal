import {RouteProps} from "react-router-dom";
import {MainPage} from "pages/MainPage";
import {LoginPage} from "pages/LoginPage";
import {NotFoundPage} from "pages/NotFoundPage";
import {StoragePage} from "pages/StoragePage";
import {MessengerPage} from "pages/MessengerPage";
import {RegistrationPage} from "pages/RegistrationPage";
import {ArticlesPage} from "pages/ArticlesPage";
import {ArticlesDetailsPage} from "pages/ArticlesDetailsPage";
import {ArticleEditPage} from "pages/ArticleEditPage";
import {ArticleCreatePage} from "pages/ArticleCreatePage";
import {AdminPanelPage} from "../../../pages/AdminPanelPage";
import {UserRoles} from "../../../entities/User/model/types/user";

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRoles[];
    listChildren?: AppRoutesProps[];
}

export enum AppRoutes {
    LOGIN = 'login',
    REGISTRATION = 'registration',
    MAIN = 'main',

    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.LOGIN]: '/',
    [AppRoutes.REGISTRATION]: '/registration',
    [AppRoutes.MAIN]: '/main',

    [AppRoutes.NOT_FOUND]: '*',
}

export enum AppRoutesMain {
    MESSENGER = 'messenger',
    STORAGE = 'storage',
    ARTICLES = 'articles',
    ARTICLES_DETAILS = 'articles_details',
    ARTICLES_CREATE = 'articles_create',
    ARTICLES_EDIT = 'articles_edit',
    ADMIN_PANEL = 'admin_panel',
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

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
        authOnly: true,
        listChildren: [
            {
                path: RoutePathMain[AppRoutesMain.MESSENGER],
                element: <MessengerPage />,
            },
            {
                path: RoutePathMain[AppRoutesMain.STORAGE],
                element: <StoragePage />,
            },
            {
                path: RoutePathMain[AppRoutesMain.ARTICLES],
                element: <ArticlesPage />,
            },
            {
                path: `${RoutePathMain[AppRoutesMain.ARTICLES_DETAILS]}:id`,
                element: <ArticlesDetailsPage />,
            },
            {
                path: RoutePathMain[AppRoutesMain.ARTICLES_EDIT],
                element: <ArticleEditPage />
            },
            {
                path: RoutePathMain[AppRoutesMain.ARTICLES_CREATE],
                element: <ArticleCreatePage />
            },
            {
                path: RoutePathMain[AppRoutesMain.ADMIN_PANEL],
                element: <AdminPanelPage />,
                roles: [UserRoles.ADMIN]
            }
        ]
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />
    },
    [AppRoutes.REGISTRATION]: {
        path: RoutePath.registration,
        element: <RegistrationPage />
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />
    }
}
