let articleId = 0;

describe('Пользователь открыл страницу статьи', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((data) => {
      articleId = data.id;
      cy.visit(`/main/articles/${articleId}`);
    });
  });
  afterEach(() => {
    if (articleId) {
      cy.removeArticle(articleId);
    }
  });
  it('Открытие статьи', () => {
    cy.getByTestId('ArticlesDetailsPage').should('exist');
  });
  it('Подгрузка рекомендаций', () => {
    cy.getByTestId('ArticleRecommendationsList').should('exist');
  });
  it('Отправка комментария', () => {
    cy.getByTestId('AddCommentForm').scrollIntoView();
    cy.getByTestId('AddCommentForm').find('textarea').first().clear().type('Тестовый комментарий');
    cy.getByTestId('AddCommentForm').find('button').contains('Отправить').click();
    cy.getByTestId('CommentCard').should('have.length', 1);
  });
});
