import {selectByTestId} from "../../helpres/selectByTestId";

describe('Роутинг', () => {
  describe('Пользователь не авторизован', () => {
    it('Переход на страницу авторизации', () => {
      cy.visit('/');
      cy.get(selectByTestId('LoginPage')).should('exist');
    });
    it('Переход на главную страницу', () => {
      cy.visit('/main');
      cy.get(selectByTestId('LoginPage')).should('exist');
    });
    it('Переход на несуществующий маршрут', () => {
      cy.visit('/bilebirda');
      cy.get(selectByTestId('LoginPage')).should('exist');
    });
  });
  describe('Пользователь авторизован', () => {
    beforeEach(() => {
      cy.login('test', 'test');
    });
    it('Переход на главную страницу', () => {
      cy.visit('/main');
      cy.get(selectByTestId('MainPage')).should('exist');
    });
  });
})
