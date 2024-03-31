import { defineStore } from 'pinia';
import { Storage } from '@ionic/storage';
import { v4 as uuidv4 } from 'uuid';
import { TimerInterface, useTimerStore } from './timerStore';
import {
	LocalNotificationDescriptor,
	LocalNotifications,
	ScheduleResult
} from '@capacitor/local-notifications';

// TimerInterval is the subsequent alerts that are played after the initial timerInterval
export interface TimerIntervalInterface {
	id: string;
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
		scheduleNotificationsForTimer(timer_id: string) {
			const timerStore = useTimerStore();
			const timerIntervals = this.getForTimer(timer_id);

			timerIntervals.forEach(async (timerInterval: TimerIntervalInterface) => {
				const index = this.timerIntervals.findIndex(t => t.id === timerInterval.id);

				const targetTime = this.startTime(timerInterval);

				LocalNotifications.schedule({
					notifications: [
						{
							title: 'Hypnogogic',
							body: 'Timer interval alert',
							id: index + timerStore.timers.length + 1,
							schedule: { 
								at: targetTime,
								allowWhileIdle: true,
							},
							channelId: timerInterval.timer_id,
						}
					]
				})
				.then((result: ScheduleResult) => {
					this.timerIntervals[index].notification = result.notifications[0];
				})
				.catch((e) => {
					alert('Failed to schedule notification: ' + e.message);
					throw 'Failed to schedule notification: ' + e.message;
				});
			});

			this.persistStore();
		},

		// given a timer id, cancel all the notifications for the timerIntervals
		async cancelNotificationsForTimer(timer_id: string) {
			const timerStore = useTimerStore();
			const timerIntervals = this.getForTimer(timer_id);

			timerIntervals.forEach(async (timerInterval: TimerIntervalInterface) => {
				const index = this.timerIntervals.findIndex(t => t.timer_id === timer_id);

				if (timerInterval.notification) {
					await LocalNotifications.cancel({
						notifications: [timerInterval.notification]
					}).catch((e) => {
						alert('Failed to cancel notification: ' + e.message);
						throw 'Failed to cancel notification: ' + e.message;
					});

					this.timerIntervals[index].notification = undefined;
				}

				this.persistStore();
			});
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
		startTime: (state) => (timerInterval: TimerIntervalInterface): Date => {
			const timerStore = useTimerStore();
			const timer: TimerInterface | undefined = timerStore.find(timerInterval.timer_id);
			if (!timer) {
				throw 'Timer not found';
			}
		
			const targetTime = timerStore.startTime(timer);
			if (timerInterval.duration) {
				targetTime.setMinutes(targetTime.getMinutes() + timerInterval.duration);

				return targetTime;
			}

			throw 'Could not calculate start time for timerInterval';
		}
	}
});
