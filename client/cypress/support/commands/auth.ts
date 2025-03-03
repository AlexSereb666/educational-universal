import {ACCESS_TOKEN_KEY} from "../../../src/shared/const/localstorage";

export const login = (login: string = 'test', password: string = 'test') => {
    cy.request({
        method: 'POST',
        url: `http://localhost:8000/auth/login`,
        body: {
            login,
            password,
        },
    }).then(({ body, headers }) => {
        const { accessToken, user } = body;

        window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

        const setCookieHeader = headers['set-cookie'];
        if (setCookieHeader) {
            const cookies = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];

            const refreshTokenCookie = cookies.find((cookie) => cookie.startsWith('refreshToken='));
            if (refreshTokenCookie) {
                const tokenValue = refreshTokenCookie.split(';')[0].split('=')[1];
                cy.setCookie('refreshToken', tokenValue);
            }
        }

        cy.visit('/');
    })
};
