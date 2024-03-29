/**
 * When a user first opens the app they are taken through the welcome flow. This is a simple three
 * screen flow with some text that they can click the next button to move to the next screen
 */

// we need to import the router so we can navigate to the welcome flow
import router from '../../../src/router';

describe('Welcome flow', () => {
	// in the before hook, remove the local storage item that indicates the user has completed the welcome flow
	before(() => {
		cy.clearLocalStorage();
	});

	specify('new users are redirected to the welcome flow', () => {
		cy.visit('/');

		// Check that the first screen is displayed
		cy.get('[data-testid=welcome-flow-slide-0]')
			.should('exist')
			.and('be.visible');

		// Check that the next button is displayed
		cy.get('[data-testid=welcome-flow-next]')
			.should('exist')
			.and('be.visible');
	});

	specify('users can navigate through the welcome flow using the next button', () => {
		cy.visit('/');

		// Click the next button
		cy.ionButtonClick('[data-testid=welcome-flow-next]')

		// Check that the second screen is displayed
		cy.get('[data-testid=welcome-flow-slide-1]')
			.should('exist')
			.and('be.visible');

		// Click the next button
		cy.ionButtonClick('[data-testid=welcome-flow-next]')

		// Check that the third screen is displayed
		cy.get('[data-testid=welcome-flow-slide-2]')
			.should('exist')
			.and('be.visible');

		// Check that the done button is displayed
		cy.get('[data-testid=welcome-flow-done]')
			.should('exist')
			.and('be.visible');

		// Click the next button
		cy.ionButtonClick('[data-testid=welcome-flow-done]')

		// Check that we have navigated to /home
		cy.url()
			.should('include', '/home');
		
		// hasBeenWelcomed should be set to 'true'
		cy.assertLocalStorageItem('hasBeenWelcomed', 'true')
			
	});
});