<script setup lang="ts">
import Card from '@components/interface/Card.vue';
</script>

<template>
	<Card
		style="
			background: var(--ion-color-danger);
			color: var(--ion-color-light);
		"
	>
		<slot></slot>
	</Card>
</template>