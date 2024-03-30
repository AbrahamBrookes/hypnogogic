<script setup lang="ts">
import Card from '@components/interface/Card.vue';
import { IonLabel, IonRow, IonToggle } from '@ionic/vue';
import { useTimerStore, TimerInterface } from '@stores/timerStore';
const timerStore = useTimerStore();
import { useTimerIntervalStore, TimerIntervalInterface } from '@stores/timerIntervalStore';
import { computed } from 'vue';
const timerIntervalStore = useTimerIntervalStore();

const props = defineProps<{
	timer: TimerInterface;
}>();

function toggle(toggleTo: boolean) {
	timerStore.toggleTimerEnabled(props.timer, toggleTo);
}

const timerIntervals = computed(() => {
	return timerIntervalStore.getForTimer(props.timer.id);
});
</script>

<template>
	<Card :data-testid="'timer-list-item-' + timer.id">
		<IonGrid>
			<IonRow>
				<IonCol size="3">
					<img
						:src="timer.sound.icon"
						alt="Sound"
						class="sound-image"
					/>
				</IonCol>
				<IonCol class="flex ion-align-items-center">
					<div>
						<IonLabel>{{ timer.enabled ? timer.name : timer.name + ' (disabled)' }}</IonLabel>
						<p>{{ timerIntervals.length }} Intervals</p>
						<p>Starting at: {{ timer.start_at }}</p>
					</div>
				</IonCol>
				<IonCol size="2" class="flex ion-align-items-center">
					<IonToggle
						:checked="timer.enabled"
						@ion-change="toggle($event.detail.checked)"
						data-testid="timer-enabled-toggle"
						class="ion-margin-end"
					></IonToggle>
				</IonCol>
			</IonRow>
			<IonRow>
				<IonCol>
					<audio
						controls
						:src="timer.sound.src"
						class="sound-player"
					></audio>
				</IonCol>
			</IonRow>
			<IonRow class="ion-justify-content-end">
				<IonButton
					:router-link="'/timers/edit/' + timer.id"
					router-animation="forward"
					data-testid="edit-timer-button"
					size="small"
					fill="clear"
					class="ion-no-margin ion-margin-top"
				>
					Edit
				</IonButton>
			</IonRow>
		</IonGrid>
	</Card>
</template>