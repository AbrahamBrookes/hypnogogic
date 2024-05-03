/**
 * The app contains a resources page with some free resources for users to check out
 */
describe('Resources page', () => {
	specify('users can navigate to the resources page', () => {
		cy.visit('/resources');

		// Check that the resources page is displayed
		cy.get('[data-testid=resources-page]')
			.should('exist')
			.and('be.visible');
		
		// astral projection reddit link
		cy.contains('Astral Projection Reddit')
		
		// binaural beats section
		cy.contains('These are three binaural beat tracks that I have personally used to achieve out of body experiences')
	});
})