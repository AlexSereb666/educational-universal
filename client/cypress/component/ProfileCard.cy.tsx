import {ProfileCard} from "../../src/features/ProfileCard";
import {TestProvider} from "../../src/shared/lib/test/componentRender/componentRender";

const USER_ID = '1';

describe('ProfileCard.cy.tsx', () => {
  beforeEach(() => {
    cy.login();
  });
  it('playground', () => {
    cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' });
    cy.mount(
        <TestProvider
          options={{
            initialState: {
              user: {
                authData: {
                  id: USER_ID,
                }
              }
            }
          }}
        >
          <ProfileCard id={USER_ID} />
        </TestProvider>
    )
  })
})