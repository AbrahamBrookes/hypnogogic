/**
 * When the user is through the welcome screen they are taken to the home screen. This screen has a
 * list of timers available. When the user is first here they will have no timers. They can create a
 * new timer by clicking the create timer button.
 */

describe('Home screen with no timers', () => {
	specify('The user should not have any timers', () => {
		cy.visit('/home');

		// Check that the user has no timers
		cy.contains('No timers created yet')
			.should('exist')
			.and('be.visible');
		
		// we should be able to see the create timer button
		cy.get('[data-testid=create-timer-button]')
			.should('exist')
			.and('be.visible');
	});

	specify('The user can click on the button to go to the create a new timer page', () => {
		cy.visit('/home');

		// Click the create timer button
		cy.ionButtonClick('[data-testid=create-timer-button]');

		// Check that we have navigated to /timers/create
		cy.url()
			.should('include', '/timers/create');
	});
});
