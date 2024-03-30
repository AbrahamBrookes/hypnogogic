<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

import Card from '@components/interface/Card.vue';
import SoundSelector from '@components/sounds/SoundSelector.vue';
import ToggleAppMenuButton from '@components/interface/ToggleAppMenuButton.vue';
import CreateTimerIntervalRow from '@components/timerIntervals/CreateTimerIntervalRow.vue';
import { TimerInterface } from '@stores/timerStore';
import { TimerIntervalInterface } from '@stores/timerIntervalStore';

import { IonButton, IonGrid, IonInput } from '@ionic/vue';
import { add, save } from 'ionicons/icons';

import { useIonRouter } from '@ionic/vue';
const router = useIonRouter();

import { useTimerStore } from '@stores/timerStore';
const timerStore = useTimerStore();

import { useTimerIntervalStore } from '@stores/timerIntervalStore';
const timerIntervalStore = useTimerIntervalStore();


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

	timerStore.addTimer(form)
		// now that the form has an id, update the intervals with the timer_id
		.then((timer: TimerInterface) => {
			intervals.value.forEach(async interval => {
				interval.timer_id = timer.id;
				await timerIntervalStore.updateTimerInterval(interval);
			});
	
			// reset the form
			form.name = '';
			form.start_at = '';
			form.sound = '';
			form.enabled = true;

			// return back to home
			router.push({ name: 'Home' });
		});
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

	return true;
}

function cancel() {
	// remove all timer intervals with the form id as the timer_id
	timerIntervalStore.removeForTimer(form.id);

	router.push({ name: 'Home' });
}

function addInterval() {
	timerIntervalStore.addTimerInterval({
		id: '',
		timer_id: form.id,
		duration: null,
		sound: '',
	});
}

const intervals = computed<TimerIntervalInterface[]>(() => {
	return timerIntervalStore.getForTimer(form.id);
});

function updateInterval(interval: TimerIntervalInterface) {
	timerIntervalStore.updateTimerInterval(interval);
}

function soundSelected(sound: string) {
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
					<IonInput
						type="text"
						label="Sound:"
						helper-text="The sound to play when the timer goes off"
						v-model="form.sound"
						data-testid="timer-sound-input"
						disabled
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

<style>
.selectedSound {
	border: 4px solid var(--ion-color-primary);
	border-radius: 16px;
	padding: 3px;
}
</style>