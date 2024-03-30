<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/vue';
const props = defineProps<{
	title?: string;
	subtitle?: string;
}>();
</script>

<template>
	<IonCard class="ion-no-margin ion-margin-bottom">
		<IonCardHeader v-if="title || subtitle || $slots.title || $slots.subtitle">
			<IonCardTitle
				v-if="title || $slots.title"
			>
				{{ title }}
				<slot name="title"></slot>
			</IonCardTitle>
			<IonCardSubtitle
				v-if="subtitle || $slots.subtitle"
			>
				{{ subtitle }}
				<slot name="subtitle"></slot>
			</IonCardSubtitle>
		</IonCardHeader>
		<IonCardContent>
			<slot></slot>
		</IonCardContent>
	</IonCard>
</template>