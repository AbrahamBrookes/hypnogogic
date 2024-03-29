<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/vue';
const props = defineProps<{
	title?: string;
	subtitle?: string;
}>();
</script>

<template>
	<IonCard class="ion-no-margin">
		<IonCardHeader v-if="title || subtitle || $slots.title">
			<IonCardTitle
				v-if="title || $slots.title"
			>
				{{ title }}
				<slot name="title"></slot>
			</IonCardTitle>
			<IonCardSubtitle
				v-if="subtitle"
			>
				{{ subtitle }}
			</IonCardSubtitle>
		</IonCardHeader>
		<IonCardContent>
			<slot></slot>
		</IonCardContent>
	</IonCard>
</template>