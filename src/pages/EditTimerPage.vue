<script setup lang="ts">
import { computed, reactive } from 'vue';
import { onIonViewDidEnter } from '@ionic/vue';

import Card from '@/components/interface/Card.vue';
import SoundSelector from '@components/sounds/SoundSelector.vue';
import ToggleAppMenuButton from '@components/interface/ToggleAppMenuButton.vue';
import CreateTimerIntervalRow from '@components/timerIntervals/CreateTimerIntervalRow.vue';
import { TimerInterface } from '@stores/timerStore';
import { TimerIntervalInterface } from '@stores/timerIntervalStore';
import { SoundInterface } from '@/stores/soundStore';

import { IonButton, IonInput, IonRow } from '@ionic/vue';
import { save, arrowBack, trash, add } from 'ionicons/icons';

import { useIonRouter } from '@ionic/vue';
import { useRoute } from 'vue-router';
const router = useIonRouter();
const route = useRoute();

import { useTimerStore } from '@stores/timerStore';
const timerStore = useTimerStore();

import { useTimerIntervalStore } from '@stores/timerIntervalStore';
const timerIntervalStore = useTimerIntervalStore();

const timerId = route.params.id;

const form = reactive<TimerInterface>({
	id: '',
	name: '',
	start_at: '',
	sound: {
		name: '',
		src: '',
	} as SoundInterface,
	enabled: true,
});

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
	if (! validateForm()) {
		return;
	}

	timerStore.updateTimer(form);

	
	// reset the form
	form.name = '';
	form.start_at = '';
	form.sound = {
		name: '',
		src: '',
	} as SoundInterface;
	form.enabled = true;

	router.push({ name: 'Home' });
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

	if (! form.sound) {
		alert('Please provide a sound for the timer');
		return false;
	}

	if (intervals.value.length < 1) {
		alert('Please provide at least one interval for the timer');
		return false;
	}

	if (intervals.value.some(interval => ! interval.duration)) {
		alert('Please provide a duration for each interval');
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

	timerStore.removeTimer(form.id);
	timerIntervalStore.removeForTimer(form.id);

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

function soundSelected(sound: SoundInterface) {
	form.sound = sound;
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
					
					<SoundSelector
						:selected-sound="form.sound"
						@sound-selected="soundSelected"
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