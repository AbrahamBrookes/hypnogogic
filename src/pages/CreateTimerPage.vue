<script setup lang="ts">
import { reactive } from 'vue';

import Card from '@/components/interface/Card.vue';
import { TimerInterface } from '@stores/timerStore';

import { IonButton, IonInput } from '@ionic/vue';
import { save } from 'ionicons/icons';

import { useIonRouter } from '@ionic/vue';
const router = useIonRouter();

import { useTimerStore } from '@stores/timerStore';
const timerStore = useTimerStore();

const form = reactive<TimerInterface>({
	id: '',
	name: '',
	start_at: '',
	sound: '',
	enabled: true,
});

function saveTimer() {
	if (! validateForm()) {
		return;
	}

	timerStore.addTimer(form);
	router.push({ name: 'Home' });
	
	// reset the form
	form.name = '';
	form.start_at = '';
	form.sound = '';
	form.enabled = true;
}

function validateForm() {
	if (! form.name) {
		alert('Please provide a name for the timer');
		return false;
	}

	if (! form.start_at) {
		alert('Please provide a start time for the timer');
		return false;
	}

	return true;
}

</script>

<template>
	<IonPage>
		<IonHeader :translucent="true">
			<IonToolbar>
				<IonButtons slot="start">
					<IonMenuButton color="primary"></IonMenuButton>
				</IonButtons>
				<IonTitle>Create Timer</IonTitle>
			</IonToolbar>
		</IonHeader>

		<IonContent :fullscreen="true">
			<IonHeader collapse="condense">
				<IonToolbar>
					<IonTitle>Creating a new Timer</IonTitle>
				</IonToolbar>
			</IonHeader>

			<div id="container" class="ion-align-items-start ion-padding">
				<Card
					title="General"
				>
					<IonInput
						placeholder="ie 'WBTB 4.5hrs'"
						label="Name:"
						v-model="form.name"
						data-testid="timer-name-input"
					/>
					<IonInput
						type="time"
						label="Start at:"
						helper-text="(This is the time that the first alarm will go off)"
						v-model="form.start_at"
						data-testid="timer-start-at-input"
					/>
				</Card>
				<IonButton
					class="ion-margin-top ion-float-right"
					@click="saveTimer"
					data-testid="save-timer-button"
				>
					<IonIcon :icon="save" class="ion-margin-end"></IonIcon> Save
				</IonButton>
			</div>
		</IonContent>
	</IonPage>
</template>