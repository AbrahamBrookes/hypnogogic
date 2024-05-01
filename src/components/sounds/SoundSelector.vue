<script setup lang="ts">
import SoundSelectIcon from '@components/sounds/SoundSelectIcon.vue';
import UploadSound from '@components/sounds/UploadSound.vue';
import SoundPlayer from '@components/sounds/SoundPlayer.vue';

import { ref, computed } from 'vue';
import { useSoundStore, SoundInterface } from '@stores/soundStore';
import { IonHeader, IonLabel } from '@ionic/vue';
const soundStore = useSoundStore();

const props = defineProps<{
	selectedSound: SoundInterface;
}>();

const emit = defineEmits<{
	(event: 'sound-selected', sound: SoundInterface): void;
}>();


const chunkedStockSounds = computed(() => {
	const rows = [];
	for (let i = 0; i < soundStore.stockSounds.length; i += 4) {
		rows.push(soundStore.stockSounds.slice(i, i + 4));
	}
	return rows;
});

const chunkedUserSounds = computed(() => {
	const rows = [];
	for (let i = 0; i < soundStore.userSounds.length; i += 4) {
		rows.push(soundStore.userSounds.slice(i, i + 4));
	}
	return rows;
});

function soundSelected(sound: SoundInterface) {
	emit('sound-selected', sound);
}
</script>

<template>
	<IonGrid class="ion-no-margin ion-no-padding ion-margin-vertical">
		<IonRow>
			<IonCol>
				<IonLabel>Select a sound:</IonLabel>
			</IonCol>
		</IonRow>
		<IonRow v-for="(row, rowIndex) in chunkedStockSounds" :key="`row-${rowIndex}`">
			<IonCol v-for="(item, colIndex) in row" :key="`col-${rowIndex}-${colIndex}`">
				<SoundSelectIcon
					:sound="item"
					:selected-sound="selectedSound"
					@select="soundSelected"
				/>
			</IonCol>
		</IonRow>
		<IonHeader>
			<IonLabel>Or</IonLabel>
		</IonHeader>
		<IonRow>
			<IonCol>
				<IonLabel>Upload a sound:</IonLabel>
			</IonCol>
		</IonRow>
		<UploadSound />
		<IonRow v-for="(row, rowIndex) in chunkedUserSounds" :key="`row-${rowIndex}`">
			<IonCol v-for="(item, colIndex) in row" :key="`col-${rowIndex}-${colIndex}`">
				<SoundSelectIcon
					:sound="item"
					:selected-sound="selectedSound"
					@select="soundSelected"
				/>
			</IonCol>
		</IonRow>
		<IonRow class="ion-margin-top">
			<IonCol>
				<IonLabel>Preview:</IonLabel>
				<SoundPlayer :sound="selectedSound" />
			</IonCol>
		</IonRow>
	</IonGrid>	
</template>