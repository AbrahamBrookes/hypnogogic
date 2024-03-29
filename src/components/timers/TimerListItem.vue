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
	<Card>
		<template #title>
			<div style="display: flex" class="ion-justify-content-between">
				<IonLabel>
					{{ timer.name }}
				</IonLabel>
				<IonToggle
					:checked="timer.enabled"
					@ion-change="toggle($event.detail.checked)"
				></IonToggle>
			</div>
		</template>
		<IonLabel>
			Starting at: {{ timer.startAt }}
		</IonLabel>
	</Card>
</template>