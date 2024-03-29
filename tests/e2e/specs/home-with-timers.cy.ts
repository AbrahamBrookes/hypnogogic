/**
 * When the user has created some timers they will be displayed on the home screen. The user can
 * toggle the timers on and off and edit them.
 */
import { TimerInterface } from '@stores/timerStore';

let testTimer: TimerInterface

describe('Home screen with no timers', () => {
	before(() => {	
		cy.visit('/home');
		
		cy.window().then((window) => {
			window.timerStore.addTimer({
				name: 'My new timer',
				startAt: '04:36',
				sound: 'bell',
			});

			testTimer = window.timerStore.timers[0];
		});
	});

	specify('The user should see the timer on the home screen', () => {
		cy.visit('/home');

		cy.get('[data-testid=timer-list-item-' + testTimer.id + ']')
			.should('exist')
			.and('be.visible')
			.within(() => {
				// Check that we can see the timer
				cy.contains('My new timer')
					.should('exist')
					.and('be.visible');

				cy.contains('04:36')
					.should('exist')
					.and('be.visible');
			});
	});

	specify('The user should be able to toggle the timer using the toggle on the card and the toggle state will survive a page refresh', () => {
		cy.visit('/home');

		cy.get('[data-testid=timer-list-item-' + testTimer.id + ']')
			.should('exist')
			.and('be.visible')
			.within(() => {
				// Check that we can see the timer
				cy.get('[data-testid="timer-enabled-toggle"]')
					.should('exist')
					.and('be.visible')
					.and('have.class', 'toggle-checked')
					.click();
			});
		
		cy.reload();

		cy.get('[data-testid=timer-list-item-' + testTimer.id + ']')
			.should('exist')
			.and('be.visible')
			.within(() => {
				cy.get('[data-testid="timer-enabled-toggle"]')
					.should('exist')
					.and('be.visible')
					.and('not.have.class', 'toggle-checked')
					.click();
			});
		
		cy.reload();

		cy.get('[data-testid=timer-list-item-' + testTimer.id + ']')
			.should('exist')
			.and('be.visible')
			.within(() => {
				// Check that we can see the timer
				cy.get('[data-testid="timer-enabled-toggle"]')
					.should('exist')
					.and('be.visible')
					.and('have.class', 'toggle-checked');
			});
	});

	specify('The user should be able to edit the timer from the card on the home screen', () => {
		cy.visit('/home');

		cy.get('[data-testid=timer-list-item-' + testTimer.id + ']')
			.should('exist')
			.and('be.visible')
			.within(() => {
				// Click the edit button
				cy.ionButtonClick('[data-testid="edit-timer-button"]');

				// Check that we have navigated to /timers/edit
				cy.url()
					.should('include', '/timers/edit/' + testTimer.id);
			});
	});
});
