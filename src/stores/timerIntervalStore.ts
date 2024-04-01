import { defineStore } from 'pinia';
import { Storage } from '@ionic/storage';
import { v4 as uuidv4 } from 'uuid';
import { useTimerStore } from '@stores/timerStore';
import { LocalNotificationDescriptor, ScheduleResult } from '@capacitor/local-notifications';
import { useSoundStore } from '@stores/soundStore';
import { DateTime } from 'luxon';

// TimerInterval is the subsequent alerts that are played after the initial timerInterval
export interface TimerIntervalInterface {
	id: string;
	index: number; // the order of the timerInterval in the sequence
	timer_id: string;
	duration: number|null;
	sound: string;
	notification?: LocalNotificationDescriptor;
}

export const useTimerIntervalStore = defineStore('timerIntervalStore', {
	state: () => ({
		loading: false,
		saving: false,
		timerIntervals: [] as TimerIntervalInterface[],
	}),
	actions: {
		// given a timerInterval object, add it to the store
		async addTimerInterval(timerInterval: TimerIntervalInterface) {
			// we need to calculate the index of the timerInterval
			const timerIntervals = this.getForTimer(timerInterval.timer_id);

			// if there are no timerIntervals, this is the first one
			if (timerIntervals.length === 0) {
				timerInterval.index = 0;
			} else {
				// otherwise, this is the last one
				timerInterval.index = timerIntervals[timerIntervals.length - 1].index + 1;
			}

			this.timerIntervals.push({
				...timerInterval,
				id: uuidv4(),
			});

			await this.persistStore();
		},

		// given a timerInterval object, update it in the store
		async updateTimerInterval(timerInterval: TimerIntervalInterface) {
			const index = this.timerIntervals.findIndex(t => t.id === timerInterval.id);
			if (index >= 0) {
				this.timerIntervals[index] = {...timerInterval}; // spreading the timerInterval object to avoid reference issues
			}

			await this.persistStore();
		},

		// given a timerInterval object, remove it from the store
		async removeTimerInterval(remove: TimerIntervalInterface) {
			this.timerIntervals = this.timerIntervals.filter(timerInterval => {
				return timerInterval !== remove;
			});

			await this.persistStore();
		},

		// given a timerInterval id, find the timerInterval
		find(id: string): TimerIntervalInterface | undefined {
			return this.timerIntervals.find(t => t.id === id);
		},

		// given a timer id, return all the timerIntervals for that timer
		getForTimer(timer_id: string): TimerIntervalInterface[] {
			return this.timerIntervals.filter(t => t.timer_id === timer_id);
		},

		// given a timer id, remove all the timerIntervals for that timer
		removeForTimer(timer_id: string): TimerIntervalInterface[] {
			this.timerIntervals = this.timerIntervals.filter(t => t.timer_id !== timer_id);
			return this.timerIntervals;
		},
		
		// given a timer id, schedule all the notifications for the timerIntervals
		async scheduleNotificationsForTimer(timer_id: string) {
			const soundStore = useSoundStore();
			const timerStore = useTimerStore();
			const timer = timerStore.find(timer_id);
			if (!timer) {
				throw 'Cannot find timer to schedule notifications for';
			}

			const timerIntervals = this.getForTimer(timer_id);

			for (const timerInterval of timerIntervals) {
				const targetTime = this.startTime(timerInterval, timerStore.startTime(timer));

				await soundStore.scheduleNotification(timer.sound, targetTime)
				.then((result: ScheduleResult) => {
					timerInterval.notification = result.notifications[0];
					this.updateTimerInterval(timerInterval);
				})
				.catch((e) => {
					alert('Failed to schedule notification: ' + e.message);
					throw 'Failed to schedule notification: ' + e.message;
				});
			}

			this.persistStore();
		},

		// given a timer id, cancel all the notifications for the timerIntervals
		async cancelNotificationsForTimer(timer_id: string) {
			const soundStore = useSoundStore();
			const timerStore = useTimerStore();
			const timerIntervals = this.getForTimer(timer_id);
			const timer = timerStore.find(timer_id);
			if (!timer) {
				throw 'Cannot find timer to cancel notifications for';
			}

			timerIntervals.forEach(async (timerInterval: TimerIntervalInterface) => {
				if (timerInterval.notification) {
					await soundStore.cancelNotification(timerInterval.notification)
					.catch((e) => {
						alert('Failed to cancel notification: ' + e.message);
						throw 'Failed to cancel notification: ' + e.message;
					});

					timerInterval.notification = undefined;
				}
			});

			await this.persistStore();
		},

		// persist the store to the device
		async persistStore() {
			this.saving = true;
			const store = new Storage();
			await store.create();
			await store.set('timerIntervalstore', JSON.stringify(this.timerIntervals));
			this.saving = false;
		},

		// restore the store from the device
		async restoreStore() {
			this.loading = true;
			const store = new Storage();
			await store.create();
			const value = await store.get('timerIntervalstore')
			if (value) {
				this.timerIntervals = JSON.parse(value);
			}
			this.loading = false;
		},

		// clear the store
		async clearStore() {
			this.timerIntervals = [];
			await this.persistStore();
		}
	},

	getters: {
		// given a timerInterval object, calculate the time when the notification should be scheduled
		startTime: (state) => (timerInterval: TimerIntervalInterface, start_time: Date): Date => {

			// get all the timerIntervals for the timer up until this one
			const timerIntervals = state.timerIntervals
				.filter(t => t.timer_id === timerInterval.timer_id && t.index <= timerInterval.index)
				.sort((a, b) => a.index - b.index);

			for (const interval of timerIntervals) {
				if (interval.duration) {
					start_time = DateTime.fromJSDate(start_time).plus({ minutes: interval.duration }).toJSDate();
				}
			}

			return start_time;
		}
	}
});
