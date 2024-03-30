<script setup lang="ts">
import { stockSounds } from '@/stores/soundStore';
import SoundSelectIcon from '@components/sounds/SoundSelectIcon.vue';
import { ref, computed } from 'vue';
import { useSoundStore, SoundInterface } from '@stores/soundStore';
const soundStore = useSoundStore();

const props = defineProps<{
	selectedSound: SoundInterface;
}>();

const emit = defineEmits<{
	'sound-selected': (sound: SoundInterface) => void;
}>();


const chunkedSounds = computed(() => {
	const rows = [];
	for (let i = 0; i < soundStore.stockSounds.length; i += 4) {
		rows.push(soundStore.stockSounds.slice(i, i + 4));
	}
	return rows;
});

function soundSelected(sound: SoundInterface) {
	emit('sound-selected', sound);
}
</script>

<template>
	<IonGrid>
		<IonRow>
			<IonCol>
				<audio
					ref="audioPlayer"
					:src="selectedSound.src"
					controls
				/>
			</IonCol>
		</IonRow>
		<IonRow v-for="(row, rowIndex) in chunkedSounds" :key="`row-${rowIndex}`">
			<IonCol v-for="(item, colIndex) in row" :key="`col-${rowIndex}-${colIndex}`">
				<SoundSelectIcon
					:sound="item"
					:selected-sound="selectedSound"
					@select="soundSelected"
				/>
			</IonCol>
		</IonRow>
	</IonGrid>	
</template>