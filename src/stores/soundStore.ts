import { defineStore } from 'pinia';
import { Storage } from '@ionic/storage';
import { v4 as uuidv4 } from 'uuid';

export interface SoundInterface {
	id: string;
	name: string;
	icon: string;
	src: string;
}

// the stock sounds that are available to the user
export const stockSounds: SoundInterface[] = [
	{
		id: '1',
		name: 'afra',
		icon: '/sound_icons/afra.png',
		src: 'afra.mp3',
	},
	{
		id: '2',
		name: 'atrium',
		icon: '/sound_icons/atrium.png',
		src: 'atrium.mp3',
	},
	{
		id: '3',
		name: 'yartus',
		icon: '/sound_icons/yartus.png',
		src: 'yartus.mp3',
	},
	{
		id: '4',
		name: 'dionese',
		icon: '/sound_icons/dionese.png',
		src: 'dionese.mp3',
	},
	{
		id: '5',
		name: 'extria',
		icon: '/sound_icons/extria.png',
		src: 'extria.mp3',
	},
	{
		id: '6',
		name: 'helios',
		icon: '/sound_icons/helios.png',
		src: 'helios.mp3',
	},
	{
		id: '7',
		name: 'hon',
		icon: '/sound_icons/hon.png',
		src: 'hon.mp3',
	},
	{
		id: '8',
		name: 'xiv',
		icon: '/sound_icons/xiv.png',
		src: 'xiv.mp3',
	},
	{
		id: '9',
		name: 'putis',
		icon: '/sound_icons/putis.png',
		src: 'putis.mp3',
	},
	{
		id: '10',
		name: 'sene',
		icon: '/sound_icons/sene.png',
		src: 'sene.mp3',
	},
	{
		id: '11',
		name: 'shus',
		icon: '/sound_icons/shus.png',
		src: 'shus.mp3',
	},
	{
		id: '12',
		name: 'tago',
		icon: '/sound_icons/tago.png',
		src: 'tago.mp3',
	},
];

export const useSoundStore = defineStore('soundStore', {
	state: () => ({
		loading: false,
		saving: false,
		stockSounds,
		sounds: [] as SoundInterface[],
	}),
	actions: {
		async addSound(sound: SoundInterface): Promise<SoundInterface> {
			this.sounds.push({
				...sound,
				id: uuidv4(),
			});

			await this.persistStore();

			return this.sounds[this.sounds.length - 1];
		},
		async updateSound(sound: SoundInterface) {
			const index = this.sounds.findIndex(t => t.id === sound.id);
			if (index >= 0) {
				this.sounds[index] = {...sound}; // spreading the sound object to avoid reference issues
			}

			await this.persistStore();
		},
		async removeSound(id: string) {
			this.sounds = this.sounds.filter(sound => {
				return sound.id !== id;
			});

			await this.persistStore();
		},
		find(id: string): SoundInterface | undefined {
			return this.sounds.find(t => t.id === id);
		},
		async persistStore() {
			this.saving = true;
			const store = new Storage();
			await store.create();
			await store.set('soundStore', JSON.stringify(this.sounds));
			this.saving = false;
		},
		async restoreStore() {
			this.loading = true;
			const store = new Storage();
			await store.create();
			const value = await store.get('soundStore')
			if (value) {
				this.sounds = JSON.parse(value);
			}
			this.loading = false;
		},
		async clearStore() {
			this.sounds = [];
			await this.persistStore();
		}
	}
});
