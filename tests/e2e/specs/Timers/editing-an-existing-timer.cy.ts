/**
 * On the create timer page we can fill out the form and create our timer
 */
import { TimerInterface } from '@stores/timerStore';

let testTimer: TimerInterface

describe('Editing an existing timer', () => {
	before(() => {	
		cy.visit('/home');
		
		cy.window().then(async (window) => {
			window.timerStore.addTimer({
				name: 'My new timer',
				start_at: '04:36',
				sound: 'bell',
			});

			testTimer = window.timerStore.timers[0];

			window.timerIntervalStore.addTimerInterval({
				duration: 20,
				timer_id: testTimer.id,
				sound: 'bell',
			});
		});
	});

	specify('The user can view the edit screen for an existing timer', () => {
		cy.visit('/timers/edit/' + testTimer.id);

		// Fill out the form
		cy.get('[data-testid=timer-name-input]')
			.within(() => {
				cy.get('input')
				.first()
				.should('have.value', 'My new timer')
				.clear()
				.type('My updated timer');
			});

		cy.get('[data-testid=timer-start-at-input]')
			.within(() => {
				cy.get('input')
				.first()
				.should('have.value', '04:36')
				.clear()
				.type('05:36');
			});
		
		// add an interval
		cy.ionButtonClick('[data-testid=add-interval-button]');

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

		// Click the save button
		cy.ionButtonClick('[data-testid=save-timer-button]');

		// Check that we have navigated to /home
		cy.url()
			.should('include', '/home');

		// Check that the timer is displayed
		cy.contains('My updated timer')
			.should('exist')
			.and('be.visible');
		
		cy.contains('05:36')
			.should('exist')
			.and('be.visible');
		
		cy.contains('2 Intervals')
			.should('exist')
			.and('be.visible');
		
		// reload the page
		cy.reload();

		// Check that the timer is displayed
		cy.contains('My updated timer')
			.should('exist')
			.and('be.visible');

		cy.contains('05:36')
			.should('exist')
			.and('be.visible');
		
		cy.contains('2 Intervals')
			.should('exist')
			.and('be.visible');
	});

	specify('Editing a timer twice in a row works as well', () => {
		cy.visit('/timers/edit/' + testTimer.id);

		// Fill out the form
		cy.get('[data-testid=timer-name-input]')
			.within(() => {
				cy.get('input')
				.first()
				.should('have.value', 'My updated timer')
				.clear()
				.type('My updated timer 2');
			});

		cy.get('[data-testid=timer-start-at-input]')
			.within(() => {
				cy.get('input')
				.first()
				.should('have.value', '05:36')
				.clear()
				.type('06:36');
			});

		// Click the save button
		cy.ionButtonClick('[data-testid=save-timer-button]');

		// Check that we have navigated to /home
		cy.url()
			.should('include', '/home');

		// Check that the timer is displayed
		cy.contains('My updated timer 2')
			.should('exist')
			.and('be.visible');
		
		cy.contains('06:36')
			.should('exist')
			.and('be.visible');
		
		cy.contains('2 Intervals')
			.should('exist')
			.and('be.visible');
		
		// click the edit button
		cy.get('[data-testid=timer-list-item-' + testTimer.id + ']')
			.within(() => {
				cy.ionButtonClick('[data-testid="edit-timer-button"]');
			});

		// should redirect to the edit page
		cy.url()
			.should('include', '/timers/edit/' + testTimer.id);

		// Fill out the form
		cy.get('[data-testid=timer-name-input]')
			.within(() => {
				cy.get('input')
				.first()
				.should('have.value', 'My updated timer 2')
				.clear()
				.type('My updated timer 3');
			})
		
		cy.get('[data-testid=timer-start-at-input]')
			.within(() => {
				cy.get('input')
				.first()
				.should('have.value', '06:36')
				.clear()
				.type('07:36');
			})
		
		// Click the save button
		cy.ionButtonClick('[data-testid=save-timer-button]');

		// Check that we have navigated to /home
		cy.url()
			.should('include', '/home');

		// Check that the timer is displayed
		cy.contains('My updated timer 3')
			.should('exist')
			.and('be.visible');

		cy.contains('07:36')
			.should('exist')
			.and('be.visible');
		
		cy.contains('2 Intervals')
			.should('exist')
			.and('be.visible');
	});

	specify('User can cancel the edit and go back to the home screen', () => {
		cy.visit('/timers/edit/' + testTimer.id);

		// Fill out the form
		cy.get('[data-testid=timer-name-input]')
			.within(() => {
				cy.get('input')
				.first()
				.should('have.value', 'My updated timer 3')
				.clear()
				.type('My updated timer 4');
			});

		cy.get('[data-testid=timer-start-at-input]')
			.within(() => {
				cy.get('input')
				.first()
				.should('have.value', '07:36')
				.clear()
				.type('08:36');
			});

		// Click the cancel button
		cy.ionButtonClick('[data-testid=cancel-button]');

		// Check that we have navigated to /home
		cy.url()
			.should('include', '/home');

		// Check that the timer has not been updated
		cy.contains('My updated timer 3')
			.should('exist')
			.and('be.visible');

		cy.contains('07:36')
			.should('exist')
			.and('be.visible');
		
		cy.contains('2 Intervals')
			.should('exist')
			.and('be.visible');
	});

	specify('The user can delete a timer from the edit screen', () => {
		cy.visit('/timers/edit/' + testTimer.id);

		// Click the delete button
		cy.ionButtonClick('[data-testid=delete-timer-button]');

		// Check that we have navigated to /home
		cy.url()
			.should('include', '/home');

		// Check that the timer has been deleted
		cy.get('[data-testid^=timer-list-item-]')
			.should('not.exist');
	});
});