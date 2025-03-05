import {Article} from "../../../src/entities/Articles/model/type/articles";
import {ACCESS_TOKEN_KEY} from "../../../src/shared/const/localstorage";

export const createArticle = () => {
    const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!accessToken) {
        throw new Error('No access token found!');
    }
    return cy.request({
        method: 'POST',
        url: `http://localhost:8000/articles/test`,
        headers: { Authorization: `Bearer ${accessToken}` },
    }).then(({ body }) => cy.wrap(body));
};

export const removeArticle = (id: number) => {
    const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!accessToken) {
        throw new Error('No access token found!');
    }
    return cy.request({
        method: 'DELETE',
        url: `http://localhost:8000/articles/${id}`,
        headers: { Authorization: `Bearer ${accessToken}` },
    }).then(({ body }) => cy.wrap(body));
};

declare global {
    namespace Cypress {
        interface Chainable {
            createArticle(email?: string, password?: string): Chainable<Article>,
            removeArticle(id: number): Chainable<any>,
        }
    }
}
