import { defineStore } from 'pinia';
import { Storage } from '@ionic/storage';
import { v4 as uuidv4 } from 'uuid';
import {
	LocalNotificationDescriptor,
	LocalNotifications,
	ScheduleResult
} from '@capacitor/local-notifications';

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
		notifications: [] as LocalNotificationDescriptor[], // purely for calculating unique integer ids
	}),
	actions: {
		// given a sound object, add it to the store
		async addSound(sound: SoundInterface): Promise<SoundInterface> {
			this.sounds.push({
				...sound,
				id: sound.id || uuidv4(),
			});

			// request permissions to schedule notifications
			LocalNotifications.requestPermissions();
			
			// create a notification channel for this sound if none exists
			checkAndCreateNotificationChannel(sound);

			await this.persistStore();

			return this.sounds[this.sounds.length - 1];
		},

		// schedule a notification for a sound
		async scheduleNotification(sound: SoundInterface, date: Date): Promise<ScheduleResult> {
			return await LocalNotifications.schedule({
				notifications: [
					{
						title: 'Hypnogogic alert',
						body: 'Playing ' + sound.name,
						id: this.notifications.length + 1,
						schedule: { 
							at: date,
							allowWhileIdle: true,
						},
						channelId: sound.id,
						smallIcon: sound.icon,
						largeIcon: sound.icon,
					}
				]
			})
			.then((result: ScheduleResult) => {
				this.notifications.push(result.notifications[0]);
				alert('Notification scheduled: ' + JSON.stringify(result));
				return result;
			})
			.catch((e) => {
				alert('Failed to schedule notification: ' + e.message);
				throw 'Failed to schedule notification: ' + e.message;
			});
		},

		// cancel a notification for a sound
		async cancelNotification(notification: LocalNotificationDescriptor) {
			await LocalNotifications.cancel({
				notifications: [notification]
			}).catch((e) => {
				alert('Failed to cancel notification: ' + e.message);
				throw 'Failed to cancel notification: ' + e.message;
			});
		},

		// given a sound object, update it in the store
		async updateSound(sound: SoundInterface) {
			const index = this.sounds.findIndex(t => t.id === sound.id);
			if (index >= 0) {
				this.sounds[index] = {...sound}; // spreading the sound object to avoid reference issues
			}

			await this.persistStore();
		},

		// given a sound id, remove it from the store
		async removeSound(id: string) {
			this.sounds = this.sounds.filter(sound => {
				return sound.id !== id;
			});

			await this.persistStore();
		},

		// given a sound id, find the sound
		find(id: string): SoundInterface | undefined {
			return this.sounds.find(t => t.id === id);
		},

		// persist the store to storage
		async persistStore() {
			this.saving = true;
			const store = new Storage();
			await store.create();
			await store.set('soundStore', JSON.stringify({
				sounds: this.sounds,
				notifications: this.notifications
			}));
			this.saving = false;
		},

		// restore the store from storage
		async restoreStore() {
			// because we are creating notification channels when we add sounds to the store
			// we need to call the addSound method when we restore the store so that the channels are created
			this.loading = true;

			// load the stock sounds first
			this.stockSounds.forEach((sound: SoundInterface) => {
				this.addSound(sound);
			});
			
			const store = new Storage();
			await store.create();
			const value = await store.get('soundStore')
			
			if (value) {
				const data = JSON.parse(value);
				this.notifications = data.notifications;

				// load the user sounds
				data.sounds.forEach((sound: SoundInterface) => {
					this.addSound(sound);
				});
			}
			this.loading = false;
		},

		// clear the store
		async clearStore() {
			this.sounds = [];
			await this.persistStore();
		}
	}
});

// check if the notification channel exists, and create it if it doesn't
function checkAndCreateNotificationChannel(sound: SoundInterface) {
	LocalNotifications.listChannels().then((channels) => {
		let channel = channels.channels.find((channel) => channel.id === sound.id);

		if (!channel) {
			LocalNotifications.createChannel({
				id: sound.id,
				name: sound.name,
				description: 'Hypnogogic alarm channel',
				importance: 5,
				sound: sound.src,
				vibration: false
			}).catch((e) => {
				alert('Failed to create channel: ' + e.message);
				throw 'Failed to create channel: ' + e.message;
			});
		}
	}).catch((e) => {
		console.error('Failed to list channels: ', e);
	})
}