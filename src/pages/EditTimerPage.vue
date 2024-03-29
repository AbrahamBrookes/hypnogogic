<script setup lang="ts">
import { reactive } from 'vue';
import { onIonViewDidEnter } from '@ionic/vue';

import Card from '@/components/interface/Card.vue';
import { TimerInterface } from '@stores/timerStore';

import { IonButton, IonInput, IonRow } from '@ionic/vue';
import { save, arrowBack, trash } from 'ionicons/icons';

import { useIonRouter } from '@ionic/vue';
import { useRoute } from 'vue-router';
const router = useIonRouter();
const route = useRoute();

import { useTimerStore } from '@stores/timerStore';
const timerStore = useTimerStore();

const timerId = route.params.id;

const form = reactive<TimerInterface>({});

onIonViewDidEnter(() => {
	const timer = timerStore.find(timerId);
	if (! timer) {
		router.push({ name: 'Home' });
		return;
	}

	form.id = timer.id;
	form.name = timer.name;
	form.startAt = timer.startAt;
	form.sound = timer.sound;
	form.enabled = timer.enabled;
})

function saveTimer() {
	console.log(timerStore.find(timerId), form);
	
	if (! validateForm()) {
		return;
	}

	timerStore.updateTimer(form);
	router.push({ name: 'Home' });
	
	// reset the form
	form.name = '';
	form.startAt = '';
	form.sound = '';
	form.enabled = true;
}

function validateForm() {
	if (! form.name) {
		alert('Please provide a name for the timer');
		return false;
	}

	if (! form.startAt) {
		alert('Please provide a start time for the timer');
		return false;
	}

	return true;
}

function cancel() {
	router.push({ name: 'Home' });
}

function deleteTimer() {
	if(! confirm('Are you sure you want to delete this timer?')) {
		return;
	}

	timerStore.removeTimer(form);
	router.push({ name: 'Home' });
}
</script>

<template>
	<IonPage>
		<IonHeader :translucent="true">
			<IonToolbar>
				<IonButtons slot="start">
					<IonMenuButton color="primary"></IonMenuButton>
				</IonButtons>
				<IonTitle>Edit Timer</IonTitle>
			</IonToolbar>
		</IonHeader>

		<IonContent :fullscreen="true">
			<IonHeader collapse="condense">
				<IonToolbar>
					<IonTitle>Editing Timer</IonTitle>
				</IonToolbar>
			</IonHeader>

			<div id="container" class="ion-align-items-start ion-padding">
				<Card>
					<template #title>
						<IonGrid>
							<IonRow>
								<IonCol>
									Edit Timer
								</IonCol>
								<IonCol>
									<IonButton
										@click="deleteTimer"
										data-testid="delete-timer-button"
										color="danger"
										fill="clear"
										size="small"
										class="ion-float-right ion-no-margin ion-no-padding"
									>
										<IonIcon :icon="trash" class="ion-margin-end"></IonIcon> Delete
									</IonButton>
								</IonCol>
							</IonRow>
						</IonGrid>
					</template>

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
						v-model="form.startAt"
						data-testid="timer-start-at-input"
					/>
				</Card>

				<IonGrid>
					<IonRow>
						<IonCol>
							<IonButton
								class="ion-no-margin ion-no-padding ion-margin-top"
								@click="cancel"
								data-testid="cancel-button"
								color="danger"
								fill="clear"
							>
								<IonIcon :icon="arrowBack" class="ion-margin-end"></IonIcon> Cancel
							</IonButton>
						</IonCol>
						<IonCol>
							<IonButton
								class="ion-margin-top ion-float-right"
								@click="saveTimer"
								data-testid="save-timer-button"
							>
								<IonIcon :icon="save" class="ion-margin-end"></IonIcon> Save
							</IonButton>
						</IonCol>
					</IonRow>
				</IonGrid>
			</div>
		</IonContent>
	</IonPage>
</template>