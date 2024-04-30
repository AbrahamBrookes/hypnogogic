<script setup lang="ts">
import { ref } from 'vue';
import { Filesystem, Directory } from '@capacitor/filesystem';

const file = ref<File | null>(null);

async function fileChanged(event: Event) {
	const target = event.target as HTMLInputElement;
	const file = target.files?.[0];
	if (!file) {
		return;
	}

	const reader = new FileReader();
	reader.onloadend = (e) => {
		const result = e.target?.result;
		console.log(result);
	};
	reader.readAsDataURL(file);

	// save the file to res/raw and assets/public/sounds
	
	// convert the file to base64
	const base64Data: string = await convertBlobToBase64(file) as string;

	// save the base64 to res/raw
	const resRawPath: string = 'src/main/res/raw/';
	const path: string = resRawPath + file.name;
	const savedFile = await Filesystem.writeFile({
		path: path,
		data: base64Data,
		directory: Directory.Data,
	});

	
}

const convertBlobToBase64 = (blob: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
</script>

<template>
	<div
		data-testid="upload-sound"
	>
		<IonLabel>Upload a sound</IonLabel>
  		<input type="file" name="photo" @change="fileChanged" />
	</div>
</template>