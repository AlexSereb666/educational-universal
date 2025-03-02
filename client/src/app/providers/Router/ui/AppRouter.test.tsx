import {componentRender} from "@/shared/lib/test/componentRender/componentRender";
import AppRouter from "./AppRouter";
import {getRouteLogin} from "@/shared/const/router";
import {screen} from '@testing-library/react';

describe('app/router/AppRouter', () => {
    test('Страница должна отрендериться', async () => {
        componentRender(<AppRouter />, {
            route: getRouteLogin(),
        });

        const page = await screen.findByTestId('LoginPage');
        expect(page).toBeInTheDocument();
    });

    test('Страница не найдена', async () => {
        componentRender(<AppRouter />, {
            route: '/bilebirda',
        });

        const page = await screen.findByTestId('NotFoundPage');
        expect(page).toBeInTheDocument();
    });

    test('Редирект неавторизованного пользователя на страницу авторизации', async () => {
        componentRender(<AppRouter />, {
            route: getRouteLogin(),
        });

        const page = await screen.findByTestId('LoginPage');
        expect(page).toBeInTheDocument();
    });
});
