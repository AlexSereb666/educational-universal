const idProfile = 1;
const loginProfile = 'test';

describe('Пользователь перешел на страницу своего профиля', () => {
  beforeEach(() => {
    cy.login().then((data) => {
      cy.visit('/main/profile/' + data.id);
    });
  });
  afterEach(() => {
    cy.resetProfile(idProfile, loginProfile);
  })
  it('Страница загрузилась', () => {
    cy.getByTestId('ProfilePage').should('exist');
  });
  it('Профиль с данными подгрузился', () => {
    cy.getByTestId('ProfilePage').find('input').should('have.value', 'test');
  });
  it('Редактирование профиля', () => {
    const newLogin = 'test_test';

    cy.updateProfile(newLogin);
    cy.getByTestId('ProfilePage').find('input').first().should('have.value', newLogin);
  });
});
