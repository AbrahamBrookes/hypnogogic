<script setup lang="ts">
import { ref } from 'vue';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { SoundInterface, useSoundStore } from '@stores/soundStore';
const soundStore = useSoundStore();

const file = ref<File | null>(null);

function fileChanged(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    if (!file || file.type !== "audio/mpeg") {  // Confirm it's an MP3 file
		alert('Only MP3 files are supported.');
		return;
	}

	saveSoundFile(file, file.name);
}

async function saveSoundFile(file: Blob, fileName: string) {
    const reader = new FileReader();
    reader.onloadend = async () => {
        const base64 = reader.result as string;
        const base64Data = base64.split(',')[1];

        try {
            await Filesystem.writeFile({
                path: fileName,
                data: base64Data,
                directory: Directory.Data
            });

            // store the sound in our sound store
            const sound: SoundInterface = {
                name: 'User Sound',
                src: fileName,
                icon: '/sound_icons/helios.png',
            };

            soundStore.addSound(sound);
        } catch (error) {
            alert('Error saving file: ' + error.message);
        }
    };
    reader.onerror = () => {
        alert('File could not be read.');
    };
    reader.readAsDataURL(file);
}
</script>

<template>
	<div data-testid="upload-sound">
  		<input
			type="file"
			name="sound"
			@change="fileChanged"
		/>
	</div>
</template>