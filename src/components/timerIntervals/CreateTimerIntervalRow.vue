<script setup lang="ts">
import { IonCol, IonRow, IonInput, IonIcon } from '@ionic/vue';
import { reactive } from 'vue';
import { TimerIntervalInterface } from '@stores/timerIntervalStore';
import { close } from 'ionicons/icons';

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
				autofocus="true"
			/>
		</IonCol>
		<IonCol size="3">
			<IonButton
				color="danger"
				@click="$emit('remove', form)"
				data-testid="delete-button"
				fill="clear"
			>
				<IonIcon slot="icon-only" :icon="close" />
			</IonButton>
		</IonCol>
	</IonRow>
</template>