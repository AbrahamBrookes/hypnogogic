<script setup lang="ts">
import { IonCol, IonRow, IonInput } from '@ionic/vue';
import { reactive } from 'vue';
import { TimerIntervalInterface } from '@stores/timerIntervalStore';

const props = defineProps<{
	timerInterval: TimerIntervalInterface;
}>();

const form = reactive<TimerIntervalInterface>(props.timerInterval);
</script>

<template>
	<IonRow>
		<IonCol>
			<IonInput
				v-model="form.duration"
				placeholder="(minutes)"
				label="Duration:"
				data-testid="duration-input"
				@ion-change="$emit('update', form)"
			/>
		</IonCol>
	</IonRow>
</template>