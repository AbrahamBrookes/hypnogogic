<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  sound: string;
  selectedSound: string;
}>();

// import the png url from @media/sound_icons/{props.sound}
const soundIconUrl = computed(() => `/sound_icons/${props.sound}.png`);
</script>

<template>
	<img
		:src="soundIconUrl"
		:class="{
			selectedSound: selectedSound == sound
		}"
		@click="$emit('select', sound)"
	/>
</template>