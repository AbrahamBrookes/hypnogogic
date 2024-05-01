<script setup lang="ts">
import { Filesystem, Directory } from '@capacitor/filesystem';
import { SoundInterface } from '@/stores/soundStore';
import { ref, watch } from 'vue';

const props = defineProps<{
	sound: SoundInterface;
}>();

// a reference to the audio element
const audioElement = ref<HTMLAudioElement | null>(null);

async function loadAudioFile(fileName: string): Promise<string> {
	let url = null
	try {
		alert(JSON.stringify({
			path: fileName,
			directory: Directory.Data
		}))
		const readFile = await Filesystem.readFile({
			path: fileName,
			directory: Directory.Data
		});
		
		const blob = new Blob([new Uint8Array(readFile.data)], { type: 'audio/mp3' });
		url = URL.createObjectURL(blob);
	} catch (error) {
		alert(error);
		return 'not found';
	}

	return url;
}


// whenever the sound changes, load the new sound
watch(() => props.sound.src, async (newSrc, oldSrc) => {
    if (newSrc) {
        const url = await loadAudioFile(newSrc);
		alert(url)

        if (audioElement.value) {
            audioElement.value.src = url;
            audioElement.value.load();     // Force reload of the audio element
            audioElement.value.play().catch(e => alert(e)); // Optionally play audio
        }
    }
}, { immediate: true }); // Trigger on initial load and subsequent changes

</script>

<template>
	<audio
		ref="audioElement"
		controls
		src=""
	/>
				{{ JSON.stringify(sound) }}
</template>