import {MainPage} from "@/pages/MainPage";
import {LoginPage} from "@/pages/LoginPage";
import {NotFoundPage} from "@/pages/NotFoundPage";
import {StoragePage} from "@/pages/StoragePage";
import {MessengerPage} from "@/pages/MessengerPage";
import {RegistrationPage} from "@/pages/RegistrationPage";
import {ArticlesPage} from "@/pages/ArticlesPage";
import {ArticlesDetailsPage} from "@/pages/ArticlesDetailsPage";
import {ArticleEditPage} from "@/pages/ArticleEditPage";
import {ArticleCreatePage} from "@/pages/ArticleCreatePage";
import {AdminPanelPage} from "@/pages/AdminPanelPage";
import {
    AppRoutes,
    getRouteAdminPanel,
    getRouteArticleCreate,
    getRouteArticleDetails,
    getRouteArticleEdit,
    getRouteArticles,
    getRouteLogin,
    getRouteMain,
    getRouteMessenger, getRouteProfile,
    getRouteRegistration,
    getRouteStorage,
} from '@/shared/const/router';
import {UserRoles} from "@/entities/User";
import {AppRoutesProps} from "../types/router";
import {ProfilePage} from "@/pages/ProfilePage";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
        authOnly: true,
        listChildren: [
            {
                path: getRouteMessenger(),
                element: <MessengerPage />,
            },
            {
                path: getRouteStorage(),
                element: <StoragePage />,
            },
            {
                path: getRouteArticles(),
                element: <ArticlesPage />,
            },
            {
                path: getRouteArticleDetails(':id'),
                element: <ArticlesDetailsPage />,
            },
            {
                path: getRouteArticleEdit(':id'),
                element: <ArticleEditPage />
            },
            {
                path: getRouteArticleCreate(),
                element: <ArticleCreatePage />
            },
            {
                path: getRouteAdminPanel(),
                element: <AdminPanelPage />,
                roles: [UserRoles.ADMIN]
            },
            {
                path: getRouteProfile(':id'),
                element: <ProfilePage />,
            }
        ]
    },
    [AppRoutes.LOGIN]: {
        path: getRouteLogin(),
        element: <LoginPage />
    },
    [AppRoutes.REGISTRATION]: {
        path: getRouteRegistration(),
        element: <RegistrationPage />
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />
    }
}
