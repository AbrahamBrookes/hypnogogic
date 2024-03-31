import { defineStore } from 'pinia';
import { Storage } from '@ionic/storage';
import { v4 as uuidv4 } from 'uuid';
import { SoundInterface, useSoundStore } from '@stores/soundStore';
import { useTimerIntervalStore } from '@stores/timerIntervalStore';
import { LocalNotificationDescriptor, ScheduleResult } from '@capacitor/local-notifications';
import { DateTime } from 'luxon';

// the Timer is the main object we are storing in the store
export interface TimerInterface {
	id: string;
	name: string;
	start_at: string;
	sound: SoundInterface;
	enabled: boolean;
	notification?: LocalNotificationDescriptor;
}

export const useTimerStore = defineStore('timerStore', {
	state: () => ({
		loading: false,
		saving: false,
		timers: [] as TimerInterface[],
	}),
	actions: {
		// given a timer object, add it to the store
		async addTimer(timer: TimerInterface): Promise<TimerInterface> {
			this.timers.push({
				...timer,
				id: uuidv4(),
				enabled: true,
			});

			await this.persistStore();

			return this.timers[this.timers.length - 1];
		},

		// given a timer object, update it in the store
		async updateTimer(timer: TimerInterface) {
			const index = this.timers.findIndex(t => t.id === timer.id);
			if (index >= 0) {
				this.timers[index] = {...timer}; // spreading the timer object to avoid reference issues
			}

			await this.persistStore();
		},

		// given a timer id, remove it from the store
		async removeTimer(id: string) {
			this.timers = this.timers.filter(timer => {
				return timer.id !== id;
			});

			await this.persistStore();
		},

		// given a timer id, find the timer
		find(id: string): TimerInterface | undefined {
			return this.timers.find(t => t.id === id);
		},

		// given a timer object, toggle the enabled state and handle notifications
		async toggleTimerEnabled(timer: TimerInterface, enabled: boolean) {
			const index = this.timers.findIndex(t => t.id === timer.id);

			if (index < 0) {
				return;
			}

			let selectedTimer = this.timers[index];
			selectedTimer.enabled = enabled;

			const soundStore = useSoundStore();
			const timerIntervalStore = useTimerIntervalStore();

			// if the timer is disabled, cancel the notification
			if (!enabled && selectedTimer.notification) {
				await soundStore.cancelNotification(selectedTimer.notification);
				await timerIntervalStore.cancelNotificationsForTimer(selectedTimer.id);

				selectedTimer.notification = undefined;
			}

			// if the timer is enabled, schedule the notification
			if (enabled) {
				const targetTime = this.startTime(selectedTimer);

				// schedule the notification
				soundStore.scheduleNotification(selectedTimer.sound, targetTime)
				.then((result: ScheduleResult) => {
					// save the notification to the timer so we can cancel it later
					this.timers[index].notification = result.notifications[0];
				})
				.then(() => {
					// schedule the timer intervals
					timerIntervalStore.scheduleNotificationsForTimer(selectedTimer.id);
				})
				.catch((e) => {
					alert('Failed to schedule notification: ' + e.message);
					throw 'Failed to schedule notification: ' + e.message;
				});
			}

			await this.persistStore();
		},

		// persist the store to storage
		async persistStore() {
			this.saving = true;
			const store = new Storage();
			await store.create();
			await store.set('timerStore', JSON.stringify(this.timers));
			this.saving = false;
		},

		// restore the store from storage
		async restoreStore() {
			this.loading = true;
			const store = new Storage();
			await store.create();
			const value = await store.get('timerStore')
			if (value) {
				this.timers = JSON.parse(value);
			}
			this.loading = false;
		},

		// clear the store
		async clearStore() {
			this.timers = [];
			await this.persistStore();
		}
	},

	getters: {
		// given a timer, return the start time
		startTime: (state) => (timer: TimerInterface) : Date => {
			const [hours, minutes] = timer.start_at.split(':').map(Number);
			let targetTime = DateTime.now().set({ hour: hours, minute: minutes, second: 0, millisecond: 0 });
		
			// If the target time is in the past (earlier today), add one day to schedule for tomorrow
			if (targetTime <= DateTime.now()) {
				targetTime = targetTime.plus({ days: 1 });
			}
		
			return targetTime.toJSDate();
		}
	}
});