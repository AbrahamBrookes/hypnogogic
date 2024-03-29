<script setup lang="ts">
import { computed, reactive } from 'vue';
import { onIonViewDidEnter } from '@ionic/vue';

import Card from '@/components/interface/Card.vue';
import ToggleAppMenuButton from '@components/interface/ToggleAppMenuButton.vue';
import CreateTimerIntervalRow from '@components/timerIntervals/CreateTimerIntervalRow.vue';
import { TimerInterface } from '@stores/timerStore';
import { TimerIntervalInterface } from '@stores/timerIntervalStore';

import { IonButton, IonInput, IonRow } from '@ionic/vue';
import { save, arrowBack, trash } from 'ionicons/icons';

import { useIonRouter } from '@ionic/vue';
import { useRoute } from 'vue-router';
const router = useIonRouter();
const route = useRoute();

import { useTimerStore } from '@stores/timerStore';
const timerStore = useTimerStore();

import { useTimerIntervalStore } from '@stores/timerIntervalStore';
const timerIntervalStore = useTimerIntervalStore();

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
	form.start_at = timer.start_at;
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

function addInterval() {
	timerIntervalStore.addTimerInterval({
		id: '',
		timer_id: form.id,
		duration: 0,
		sound: '',
	});
}

const intervals = computed(() => {
	return timerIntervalStore.getForTimer(form.id);
});

function updateInterval(interval: TimerIntervalInterface) {
	timerIntervalStore.updateTimerInterval(interval);
}
</script>

<template>
	<IonPage>
		<IonHeader :translucent="true">
			<IonToolbar>
				<IonButtons slot="start">
					<ToggleAppMenuButton />
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
						v-model="form.start_at"
						data-testid="timer-start-at-input"
					/>
					<IonGrid>
						<IonRow>
							<IonCol class="ion-justify-items-end">
								<IonButton
									@click="addInterval"
									data-testid="add-interval-button"
									size="small"
									fill="clear"
									class="ion-no-margin ion-float-right ion-no-padding"
								>
									<IonIcon :icon="add" class="ion-margin-end"></IonIcon> Add Interval
								</IonButton>
							</IonCol>
						</IonRow>
						<CreateTimerIntervalRow
							v-for="interval in intervals"
							:key="interval.id"
							:timer-interval="interval"
							@update="updateInterval"
						/>
					</IonGrid>
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