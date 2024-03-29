import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/welcome-0',
		component: () => import('@/pages/WelcomePage0.vue'),
		name: 'Welcome0',
		meta: {
			noMenu: true,
		}
	},
	{
		path: '/welcome-1',
		component: () => import('@/pages/WelcomePage1.vue'),
		name: 'Welcome1',
		meta: {
			noMenu: true,
		}
	},
	{
		path: '/welcome-2',
		component: () => import('@/pages/WelcomePage2.vue'),
		name: 'Welcome2',
		meta: {
			noMenu: true,
		}
	},
	{
		path: '',
		redirect: '/home'
	},
	{
		path: '/home',
		component: () => import('@pages/HomePage.vue'),
		name: 'Home'
	},
	{
		path: '/folder/:id',
		component: () => import('@pages/FolderPage.vue')
	},
	{
		path: '/timers/create',
		component: () => import('@pages/CreateTimerPage.vue'),
		name: 'CreateTimer'
	}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// set up our router guards
router.beforeEach((to, from, next) => {
	// if the localstorage item hasBeenWelcomed is not set, redirect to the welcome flow
	if (
		!localStorage.getItem('hasBeenWelcomed') &&
		!['Welcome0', 'Welcome1', 'Welcome2'].includes(to.name)
	){
		next('/welcome-0');
		return;
	}

	next();
});


export default router
