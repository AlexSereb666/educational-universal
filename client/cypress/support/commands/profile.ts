import {ACCESS_TOKEN_KEY} from "../../../src/shared/const/localstorage";

export const updateProfile = (login: string) => {
    cy.getByTestId('ProfilePage').find('button').contains('Редактировать').click();
    cy.getByTestId('ProfilePage').find('input').first().clear().type(login);
    cy.getByTestId('ProfilePage').find('button').contains('Сохранить').click();
}

export const resetProfile = (id: number, login: string) => {
    const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);

    if (!accessToken) {
        throw new Error('No access token found!');
    }

    return cy.request({
        method: 'POST',
        url: `http://localhost:8000/users/edit/${id}`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: {
            login,
        }
    });
}

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(login: string): Chainable<void>;
            resetProfile(id: number, login: string): Chainable<void>;
        }
    }
}
