/**
 * Our app menu has a link to the settings page
 */

describe('Settings page', () => {
	specify('The user can navigate to the settings page', () => {
		cy.visit('/home');

		// Click the app menu button
		cy.get('[data-testid="app-menu-toggle"]')
			.filter(':visible')
			.click();
		
		// click the link to settings
		cy.get('[data-testid="menu-item-/settings"]')
			.should('exist')
			.and('be.visible')
			.click();

		// Check that we have navigated to /settings
		cy.url()
			.should('include', '/settings');
		
		// check we can see the settings page
		cy.get('[data-testid="settings-page"]')
			.should('exist');
		// can't check visible because cypress doesn't close the app menu for whatever reason
	});
});