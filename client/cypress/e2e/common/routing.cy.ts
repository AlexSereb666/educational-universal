describe('Роутинг', () => {
  describe('Пользователь не авторизован', () => {
    it('Переход на страницу авторизации', () => {
      cy.visit('/');
      cy.getByTestId('LoginPage').should('exist');
    });
    it('Переход на главную страницу', () => {
      cy.visit('/main');
      cy.getByTestId('LoginPage').should('exist');
    });
    it('Переход на несуществующий маршрут', () => {
      cy.visit('/bilebirda');
      cy.getByTestId('NotFoundPage').should('exist');
    });
  });
  describe('Пользователь авторизован', () => {
    beforeEach(() => {
      cy.login('test', 'test');
    });
    it('Переход на главную страницу', () => {
      cy.visit('/main');
      cy.getByTestId('MainPage').should('exist');
    });
  });
});
