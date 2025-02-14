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
import {AdminPanelPage} from "pages/AdminPanelPage";
import {AppRoutes, AppRoutesMain} from "../const/Routes";
import {UserRoles} from "entities/User";
import {AppRoutesProps} from "../types/router";
import {RoutePath, RoutePathMain} from "../paths/routePath";

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
