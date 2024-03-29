<template>
	<ion-app>
		<ion-split-pane content-id="main-content">
			<ion-menu content-id="main-content" type="overlay" v-if="!$route.meta.noMenu" data-testid="app-menu-toggle">
				<ion-content>
					<ion-list id="inbox-list">
						<ion-list-header class="ion-margin-bottom">{{ appName }}</ion-list-header>

						<ion-menu-toggle
							:auto-hide="false"
							v-for="(p, i) in appPages"
							:key="i"
							:data-testid="'menu-item-' + p.url"
						>
							<ion-item 
								@click="selectedIndex = i" 
								router-direction="root" 
								:router-link="p.url" 
								lines="none" 
								:detail="false" 
								class="hydrated" 
								:class="{ selected: selectedIndex === i }"
							>
								<ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
								<ion-label>{{ p.title }}</ion-label>
							</ion-item>
						</ion-menu-toggle>
					</ion-list>
				</ion-content>
			</ion-menu>
			<ion-router-outlet id="main-content"></ion-router-outlet>
		</ion-split-pane>

		<!-- pre load these images for the welcome flow-->
		<img :src="step0imgUrl" alt="Welcome" style="display:none" />
		<img :src="step1imgUrl" alt="Welcome" style="display:none" />
		<img :src="step2imgUrl" alt="Welcome" style="display:none" />
	</ion-app>
</template>

<script setup lang="ts">
import step0imgUrl from '@media/welcome-step-0.png';
import step1imgUrl from '@media/welcome-step-1.png';
import step2imgUrl from '@media/welcome-step-2.png';
import {
	IonApp,
	IonContent,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonMenu,
	IonMenuToggle,
	IonRouterOutlet,
	IonSplitPane,
} from '@ionic/vue';
import { ref } from 'vue';
import {
	journalOutline,
	journalSharp,
	moonOutline,
	moonSharp,
	settingsOutline,
	settingsSharp,
} from 'ionicons/icons';

const selectedIndex = ref(0);
const appPages = [
	{
		title: 'Timers',
		url: '/',
		iosIcon: moonOutline,
		mdIcon: moonSharp,
	},
	{
		title: 'Diary',
		url: '/diary',
		iosIcon: journalOutline,
		mdIcon: journalSharp,
	},
	{
		title: 'Settings',
		url: '/settings',
		iosIcon: settingsOutline,
		mdIcon: settingsSharp,
	},
];

const appName = import.meta.env.VITE_APP_NAME as string;

const path = '/' + window.location.pathname.split('/')[1];
if (path !== undefined) {
	selectedIndex.value = appPages.findIndex((page) => path.toLowerCase().includes(page.title.toLowerCase()));
}
</script>

<style scoped>
ion-menu ion-content {
	--background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
	--padding-start: 8px;
	--padding-end: 8px;
	--padding-top: 20px;
	--padding-bottom: 20px;
}

ion-menu.md ion-list {
	padding: 20px 0;
}

ion-menu.md ion-list-header {
	padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
	border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
	font-size: 22px;
	font-weight: 600;

	min-height: 20px;
}

ion-menu.md ion-item {
	--padding-start: 10px;
	--padding-end: 10px;
	border-radius: 4px;
}

ion-menu.md ion-item.selected {
	--background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
	color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
	color: #616e7e;
}

ion-menu.md ion-item ion-label {
	font-weight: 500;
}

ion-menu.ios ion-content {
	--padding-bottom: 20px;
}

ion-menu.ios ion-list {
	padding: 20px 0 0 0;
}

ion-menu.ios ion-item {
	--padding-start: 16px;
	--padding-end: 16px;
	--min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
	color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
	font-size: 24px;
	color: #73849a;
}

ion-menu.ios ion-list-header {
	padding-left: 16px;
	padding-right: 16px;
}

ion-item.selected {
	--color: var(--ion-color-primary);
}
</style>
