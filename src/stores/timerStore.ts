// src/stores/yourStore.js
import { defineStore } from 'pinia';
import { Storage } from '@ionic/storage';
import { v4 as uuidv4 } from 'uuid';

export interface TimerInterface {
	id: string;
	name: string;
	startAt: string;
	sound: string;
	enabled: boolean;
}

export interface TimerDurationInterface {
	id: string;
	duration: number;
	sound: string;
}

export const useTimerStore = defineStore('timerStore', {
	state: () => ({
		loading: false,
		saving: false,
		timers: [] as TimerInterface[],
	}),
	actions: {
		addTimer(timer: TimerInterface) {
			console.log('Adding timer', timer);
			
			this.timers.push({
				...timer,
				id: uuidv4(),
				enabled: true,
			});

			this.persistStore();
		},
		updateTimer(timer: TimerInterface) {
			const index = this.timers.findIndex(t => t.id === timer.id);
			if (index >= 0) {
				this.timers[index] = {...timer}; // spreading the timer object to avoid reference issues
			}

			this.persistStore();
		},
		removeTimer(remove: TimerInterface) {
			this.timers = this.timers.filter(timer => {
				return timer !== remove;
			});

			this.persistStore();
		},
		find(id: string): TimerInterface | undefined {
			return this.timers.find(t => t.id === id);
		},
		toggleTimerEnabled(timer: TimerInterface, enabled: boolean) {
			const index = this.timers.findIndex(t => t.id === timer.id);
			if (index >= 0) {
				this.timers[index].enabled = enabled;
			}

			this.persistStore();
		},
		persistStore() {
			this.saving = true;
			const store = new Storage();
			store.create()
				.then(() => {
					store.set('timerStore', JSON.stringify(this.timers));
				})
				.finally(() => {
					this.saving = false;
				})
		},
		restoreStore() {
			this.loading = true;
			const store = new Storage();
			store.create()
				.then(() => {
					return store.get('timerStore')
				})
				.then((value) => {
					if (value) {
						this.timers = JSON.parse(value);
					}
				})
				.finally(() => {
					this.loading = false;
				})
		},
		clearStore() {
			this.timers = [];
			this.persistStore();
		}
	}
});
