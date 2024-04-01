<script setup lang="ts">
import TimerListItem from '@components/timers/TimerListItem.vue';
import Card from '@components/interface/Card.vue';
import { TimerInterface } from '@/stores/timerStore';

import { useIonRouter } from '@ionic/vue';
const router = useIonRouter();

function createTimer() {
	router.push({ name: 'CreateTimer' });
}

const props = defineProps<{
	timers: TimerInterface[];
}>();
</script>

<template>
	<div
		class="ion-margin-horizontal"
		data-testid="timer-list"
	>
		<h1>Timers</h1>
		<TimerListItem
			v-for="timer in timers"
			:key="timer.id"
			:timer="timer"
		/>
		<Card
			v-if="!timers.length"
			class="ion-padding-vertical"
		>
			No timers created yet
		</Card>
		<IonButton
			@click="createTimer"
			class="ion-float-right"
			data-testid="create-timer-button"
		>
			Create Timer
		</IonButton>
	</div>
</template>