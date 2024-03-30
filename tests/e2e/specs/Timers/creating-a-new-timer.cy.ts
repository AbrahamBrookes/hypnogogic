/**
 * On the create timer page we can fill out the form and create our timer
 */
let intervalId: string;

describe('Creating a new timer', () => {
	beforeEach(() => {
		cy.visit('/home');
		cy.window().then(async (window) => {
			await window.timerStore.clearStore();
			await window.timerIntervalStore.clearStore();
		});
	});

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
		
		cy.get('[data-testid=sound-select-icon-1]')
			.click();
		
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

	specify('If the user hits the add interval button a buncha times and then cancels and then reopens the form, we should see no intervals', () => {
		cy.visit('/timers/create');

		// add 3 intervals straight away
		cy.ionButtonClick('[data-testid=add-interval-button]');
		cy.ionButtonClick('[data-testid=add-interval-button]');
		cy.ionButtonClick('[data-testid=add-interval-button]');

		// cancel the form
		cy.ionButtonClick('[data-testid=cancel-button]');

		// reopen the form
		cy.ionButtonClick('[data-testid=create-timer-button]');

		// check that we have no intervals
		cy.get('[data-testid=duration-input]')
			.should('have.length', 0);
	});

	specify('The user must add a name to the timer', () => {
		cy.visit('/timers/create');

		// Fill out the form
		cy.get('[data-testid=timer-start-at-input]')
			.scrollIntoView()
			.within(() => {
				cy.get('input')
				.first()
				.type('04:36');
			});
		
		cy.get('[data-testid=sound-select-icon-1]')
			.click();
		
		// adding 2 intervals straight away
		cy.ionButtonClick('[data-testid=add-interval-button]');
		cy.ionButtonClick('[data-testid=add-interval-button]');

		cy.get('[data-testid=duration-input]')
			.first()
			.scrollIntoView()
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
			.scrollIntoView()
			.should('exist')
			.and('be.visible')
			.within(() => {
				cy.get('input')
				.first()
				.clear()
				.type('15');
			});

		cy.on('window:alert', (text) => {
			expect(text).to.contains('Please provide a name for the timer');
		});
		// Click the create timer button
		cy.ionButtonClick('[data-testid=save-timer-button]');

		// Check that we have not navigated to /home
		cy.url()
			.should('include', '/create');
	});

	specify('The user must add a start time to the timer', () => {
		cy.visit('/timers/create');

		// Fill out the form
		cy.get('[data-testid=timer-name-input]')
			.scrollIntoView()
			.within(() => {
				cy.get('input')
				.first()
				.type('My new timer');
			});
		
		cy.get('[data-testid=sound-select-icon-1]')
			.scrollIntoView()
			.click();
		
		// adding 2 intervals straight away
		cy.ionButtonClick('[data-testid=add-interval-button]');
		cy.ionButtonClick('[data-testid=add-interval-button]');

		cy.get('[data-testid=duration-input]')
			.first()
			.scrollIntoView()
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
			.scrollIntoView()
			.should('exist')
			.and('be.visible')
			.within(() => {
				cy.get('input')
				.first()
				.clear()
				.type('15');
			});

		cy.on('window:alert', (text) => {
			expect(text).to.contains('Please provide a start time for the timer');
		});
		// Click the create timer button
		cy.ionButtonClick('[data-testid=save-timer-button]');

		// Check that we have not navigated to /home
		cy.url()
			.should('include', '/create');
	})

	specify('The user must add at least one interval to the timer', () => {
		cy.visit('/timers/create');

		// Fill out the form
		cy.get('[data-testid=timer-name-input]')
			.scrollIntoView()
			.within(() => {
				cy.get('input')
				.first()
				.type('My new timer');
			});

		cy.get('[data-testid=timer-start-at-input]')
			.scrollIntoView()
			.within(() => {
				cy.get('input')
				.first()
				.type('04:36');
			});
		
		cy.get('[data-testid=sound-select-icon-1]')
			.scrollIntoView()
			.click();

		cy.on('window:alert', (text) => {
			expect(text).to.contains('Please provide at least one interval for the timer');
		});
		// Click the create timer button
		cy.ionButtonClick('[data-testid=save-timer-button]');

		// Check that we have not navigated to /home
		cy.url()
			.should('include', '/create');
	})

	specify('The user must add a duration to each interval', () => {
		cy.visit('/timers/create');

		// Fill out the form
		cy.get('[data-testid=timer-name-input]')
			.scrollIntoView()
			.within(() => {
				cy.get('input')
				.first()
				.type('My new timer');
			});

		cy.get('[data-testid=timer-start-at-input]')
			.scrollIntoView()
			.within(() => {
				cy.get('input')
				.first()
				.type('04:36');
			});
		
		cy.get('[data-testid=sound-select-icon-1]')
			.scrollIntoView()
			.click();
		
		// adding 2 intervals straight away
		cy.ionButtonClick('[data-testid=add-interval-button]');
		cy.ionButtonClick('[data-testid=add-interval-button]');

		cy.on('window:alert', (text) => {
			expect(text).to.contains('Please provide a duration for each interval');
		});
		// Click the create timer button
		cy.ionButtonClick('[data-testid=save-timer-button]');

		// Check that we have not navigated to /home
		cy.url()
			.should('include', '/create');
	})

	specify('The user must add a sound to the timer', () => {
		cy.visit('/timers/create');

		// Fill out the form
		cy.get('[data-testid=timer-name-input]')
			.scrollIntoView()
			.within(() => {
				cy.get('input')
				.first()
				.type('My new timer');
			});

		cy.get('[data-testid=timer-start-at-input]')
			.scrollIntoView()
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
			.scrollIntoView()
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
			.scrollIntoView()
			.should('exist')
			.and('be.visible')
			.within(() => {
				cy.get('input')
				.first()
				.clear()
				.type('15');
			});

		cy.on('window:alert', (text) => {
			expect(text).to.contains('Please provide a sound for the timer');
		});
		// Click the create timer button
		cy.ionButtonClick('[data-testid=save-timer-button]');

		// Check that we have not navigated to /home
		cy.url()
			.should('include', '/create');
	})

});