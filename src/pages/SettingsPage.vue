<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue';
import { trash } from 'ionicons/icons';
import Card from '@components/interface/Card.vue';
import BatteryOptimizationDialogue from '@/components/interface/BatteryOptimizationDialogue.vue';

import { Storage } from '@ionic/storage';
const store = new Storage();

import { useIonRouter } from '@ionic/vue';
const router = useIonRouter();

import { useTimerStore } from '@stores/timerStore';
const timerStore = useTimerStore();

import { useTimerIntervalStore } from '@/stores/timerIntervalStore';
const timerIntervalStore = useTimerIntervalStore();

function expungeData() {
	if (!confirm('Are you sure you want to expunge all data? This action cannot be undone.')) {
		return;
	}

	timerStore.clearStore();
	timerIntervalStore.clearStore();

	store.create()
		.then(() => {
			return store.clear();
		})
	
	localStorage.clear();
}
</script>

<template>
	<IonPage data-testid="settings-page">
	  <IonHeader :translucent="true">
		<IonToolbar>
		  <IonButtons slot="start">
			<IonMenuButton color="primary"></IonMenuButton>
		  </IonButtons>
		  <IonTitle>Settings</IonTitle>
		</IonToolbar>
	  </IonHeader>
  
	  <IonContent :fullscreen="true">
		<IonHeader collapse="condense">
		  <IonToolbar>
			<IonTitle size="large">Settings</IonTitle>
		  </IonToolbar>
		</IonHeader>
		
		<BatteryOptimizationDialogue
			class="ion-margin-top ion-margin-horizontal"
			:show="true"
		/>
  
		<div class="ion-padding">
			<Card
				title="Data"
				subtitle="Expunge all data"
			>
				<p>
					<strong>Warning:</strong> This will remove all data from the app. This action cannot be undone.
				</p>
				<IonButton
					@click="expungeData"
					color="danger"
					class="ion-float-right ion-margin-vertical"
				>
					<IonIcon :icon="trash" class="ion-margin-end"></IonIcon> Clear all data
				</IonButton>
			</Card>
		</div>
  
		<div class="ion-padding">
			<Card
				title="Credits"
				subtitle="Credits and attributions"
			>
				<p>
					This app uses the following sounds from Freesound.org:
				</p>
				<ul>
					<li><a href="https://freesound.org/people/Incarnadine/sounds/29957/" target="_blank" rel="noopener noreferrer">Pipe bell by Incarnadine</a></li>
					<li><a href="https://freesound.org/people/patchen/sounds/4103/" target="_blank" rel="noopener noreferrer">ATIK 2 by Patchen</a></li>
					<li><a href="https://freesound.org/people/arnaud%20coutancier/sounds/464332/" target="_blank" rel="noopener noreferrer">Monks' prayers by Arnaud Coutancier</a></li>
					<li><a href="https://freesound.org/people/Adrian_Gomar/sounds/197288/" target="_blank" rel="noopener noreferrer">buddhist_monks_prayer_2 by Adrian_Gomar</a></li>
					<li><a href="https://freesound.org/people/beninu/sounds/522343/" target="_blank" rel="noopener noreferrer">Bird Song Garden - Early Morning In Suburbs by beninu</a></li>
					<li><a href="https://freesound.org/people/szegvari/sounds/590053/" target="_blank" rel="noopener noreferrer">Morning silent forest - atmo orchestral by szegvari</a></li>
				</ul>
			</Card>
		</div>
	  </IonContent>
	</IonPage>
</template>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
