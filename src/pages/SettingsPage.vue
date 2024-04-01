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
