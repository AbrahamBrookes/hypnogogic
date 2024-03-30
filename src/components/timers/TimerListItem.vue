<script setup lang="ts">
import Card from '@components/interface/Card.vue';
import { IonLabel, IonToggle } from '@ionic/vue';
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
		<template #title>
			<div class="flex ion-justify-content-between">
				<IonLabel
					class="ion-text-wrap"
				>
					{{ timer.name }}
				</IonLabel>
				<IonToggle
					:checked="timer.enabled"
					@ion-change="toggle($event.detail.checked)"
					data-testid="timer-enabled-toggle"
					class="ion-margin-end"
				></IonToggle>
			</div>
		</template>
		<IonGrid>
			<IonRow class="ion-margin-bottom">
				<IonCol class="ion-no-padding">
					<IonLabel>{{ timerIntervals.length }} Intervals</IonLabel>
				</IonCol>
				<IonCol class="ion-no-padding ion-text-right">
					Starting at: {{ timer.start_at }}
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