/**
 * On the create timer page we can fill out the form and create our timer
 */

describe('Creating a new timer', () => {
	specify('The user can fill out the form and create a new timer', () => {
		cy.visit('/timers/create');

		// Fill out the form
		cy.get('[data-testid=timer-name-input]')
			.within(() => {
				cy.get('input')
				.first()
				.type('My new timer');
			});

		cy.get('[data-testid=timer-start-at-input]')
			.within(() => {
				cy.get('input')
				.first()
				.type('04:36');
			});
		
		// adding intervals
		cy.ionButtonClick('[data-testid=add-interval-button]');

		cy.get('[data-testid=interval-name-input]')
			.should('exist')
			.and('be.visible')
			.within(() => {
				cy.get('input')
				.first()
				.type('My new interval');
			});


		// Click the create timer button
		cy.ionButtonClick('[data-testid=save-timer-button]');

		// Check that we have navigated to /home
		cy.url()
			.should('include', '/home');

		// Check that the timer is displayed
		cy.contains('My new timer')
			.should('exist')
			.and('be.visible');
	});
});