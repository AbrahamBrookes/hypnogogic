<script setup lang="ts">
import Card from '@components/interface/Card.vue';
import { IonLabel, IonToggle } from '@ionic/vue';
import { useTimerStore, TimerInterface } from '@stores/timerStore';
const timerStore = useTimerStore();

const props = defineProps<{
	timer: TimerInterface;
}>();

function toggle(toggleTo: boolean) {
	timerStore.toggleTimerEnabled(props.timer, toggleTo);
}
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
			<IonRow>
				Starting at: {{ timer.startAt }}
			</IonRow>
			<IonRow class="ion-justify-content-end">
				<IonButton
					:router-link="'/timers/edit/' + timer.id"
					router-animation="forward"
					data-testid="edit-timer-button"
					size="small"
					fill="clear"
					class="ion-no-margin"
				>
					Edit
				</IonButton>
			</IonRow>
		</IonGrid>
	</Card>
</template>