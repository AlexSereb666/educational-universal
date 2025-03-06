describe('Пользователь перешел на страницу статей', () => {
  beforeEach(() => {
    cy.login().then((date) => {
      cy.visit('/main/articles');
    });
  });

  it('Страница успешно загрузилась и выдала как минимум 3 статьи', () => {
    cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });
    cy.getByTestId('ArticleList').should('exist');
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  });
  it.skip('Пример заскипанного теста', () => {
    cy.get('bilebirda').should('exist');
  });
});
