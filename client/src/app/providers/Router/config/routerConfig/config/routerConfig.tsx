import { MainPage } from '@/pages/MainPage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { StoragePage } from '@/pages/StoragePage';
import { MessengerPage } from '@/pages/MessengerPage';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ArticlesDetailsPage } from '@/pages/ArticlesDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { ArticleCreatePage } from '@/pages/ArticleCreatePage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import {
    AppRoutes,
    getRouteAdminPanel,
    getRouteArticleCreate,
    getRouteArticleDetails,
    getRouteArticleEdit,
    getRouteArticles,
    getRouteLogin,
    getRouteMain,
    getRouteMessenger,
    getRouteProfile,
    getRouteRegistration,
    getRouteStorage,
    getRouteUserSettings,
} from '@/shared/const/router';
import { UserRoles } from '@/entities/User';
import { AppRoutesProps } from '../types/router';
import { ProfilePage } from '@/pages/ProfilePage';
import { UserSettingsPage } from '@/pages/UserSettingsPage';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
        authOnly: true,
    },
    [AppRoutes.MESSENGER]: {
        path: getRouteMessenger(),
        element: <MessengerPage />,
        authOnly: true,
    },
    [AppRoutes.STORAGE]: {
        path: getRouteStorage(),
        element: <StoragePage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLES]: {
        path: getRouteArticles(),
        element: <ArticlesPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: getRouteArticleDetails(':id'),
        element: <ArticlesDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_EDIT]: {
        path: getRouteArticleEdit(':id'),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_CREATE]: {
        path: getRouteArticleCreate(),
        element: <ArticleCreatePage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: getRouteAdminPanel(),
        element: <AdminPanelPage />,
        roles: [UserRoles.ADMIN],
        authOnly: true,
    },
    [AppRoutes.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.USER_SETTINGS]: {
        path: getRouteUserSettings(),
        element: <UserSettingsPage />,
        authOnly: true,
    },
    [AppRoutes.LOGIN]: {
        path: getRouteLogin(),
        element: <LoginPage />,
    },
    [AppRoutes.REGISTRATION]: {
        path: getRouteRegistration(),
        element: <RegistrationPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
};
