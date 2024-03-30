<script setup lang="ts">
import SoundSelectIcon from '@components/sounds/SoundSelectIcon.vue';
import UploadSound from '@components/sounds/UploadSound.vue';

import { ref, computed } from 'vue';

const props = defineProps<{
	selectedSound: string;
}>();

const emit = defineEmits<{
	'sound-selected': (sound: string) => void;
}>();

const sounds = ref<string[]>([
	'afra',
	'atrium',
	'yartus',
	'dionese',
	'extria',
	'helios',
	'hon',
	'xiv',
	'putis',
	'sene',
	'shus',
	'tago',
]);

const chunkedSounds = computed(() => {
	const rows = [];
	for (let i = 0; i < sounds.value.length; i += 4) {
		rows.push(sounds.value.slice(i, i + 4));
	}
	return rows;
});

function soundSelected(sound: string) {
	emit('sound-selected', sound);
}
</script>

<template>
	<IonGrid>
		<IonRow v-for="(row, rowIndex) in chunkedSounds" :key="`row-${rowIndex}`">
			<IonCol v-for="(item, colIndex) in row" :key="`col-${rowIndex}-${colIndex}`">
				<SoundSelectIcon
					:sound="item"
					:selected-sound="selectedSound"
					@select="soundSelected"
				/>
			</IonCol>
		</IonRow>
		<IonRow>
			<IonCol>
				<UploadSound />
			</IonCol>
		</IonRow>
	</IonGrid>	
</template>