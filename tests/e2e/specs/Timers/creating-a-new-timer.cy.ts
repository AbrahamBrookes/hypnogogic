/**
 * On the create timer page we can fill out the form and create our timer
 */
let intervalId: string;

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
		
		// adding 2 intervals straight away
		cy.ionButtonClick('[data-testid=add-interval-button]');
		cy.ionButtonClick('[data-testid=add-interval-button]');

		cy.get('[data-testid=duration-input]')
			.first()
			.should('exist')
			.and('be.visible')
			.within(() => {
				cy.get('input')
				.first()
				.clear()
				.type('20');
			});

		cy.get('[data-testid=duration-input]')
			.eq(1)
			.should('exist')
			.and('be.visible')
			.within(() => {
				cy.get('input')
				.first()
				.clear()
				.type('15');
			});

		// then we can still add a third interval
		cy.ionButtonClick('[data-testid=add-interval-button]');
		cy.get('[data-testid=duration-input]')
			.eq(2)
			.should('exist')
			.and('be.visible')
			.within(() => {
				cy.get('input')
				.first()
				.clear()
				.type('5');
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
		
		cy.contains('3 Intervals')
			.should('exist')
			.and('be.visible');
	});
});