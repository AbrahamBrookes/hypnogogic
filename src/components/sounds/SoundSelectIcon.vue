<script setup lang="ts">
import { computed } from 'vue';
import { SoundInterface } from '@stores/soundStore';

const props = defineProps<{
  sound: SoundInterface;
  selectedSound: SoundInterface;
}>();
</script>

<template>
	<img
		:src="sound.icon"
		:class="{
			selectedSound: selectedSound.src == sound.src
		}"
		@click="$emit('select', sound)"
		:data-testid="'sound-select-icon-' + sound.id"
	/>
</template>

<style>
.selectedSound {
	border: 4px solid var(--ion-color-primary);
	border-radius: 16px;
	padding: 3px;
}
</style>