import { defineStore } from 'pinia';
import { Storage } from '@ionic/storage';
import { v4 as uuidv4 } from 'uuid';

// TimerInterval is the subsequent alerts that are played after the initial timerInterval
export interface TimerIntervalInterface {
	id: string;
	timer_id: string;
	duration: number;
	sound: string;
}

export const useTimerIntervalStore = defineStore('timerIntervalStore', {
	state: () => ({
		loading: false,
		saving: false,
		timerIntervals: [] as TimerIntervalInterface[],
	}),
	actions: {
		addTimerInterval(timerInterval: TimerIntervalInterface) {
			console.log('Adding timer interval', timerInterval);

			// only allow one timerinterval with no timer_id at a time
			// this is so we don't have a bunch of dangling creates in there
			if (this.timerIntervals.find(t => !t.timer_id)) {
				return;
			}
			
			this.timerIntervals.push({
				...timerInterval,
				id: uuidv4(),
			});

			this.persistStore();
		},
		updateTimerInterval(timerInterval: TimerIntervalInterface) {
			const index = this.timerIntervals.findIndex(t => t.id === timerInterval.id);
			if (index >= 0) {
				this.timerIntervals[index] = {...timerInterval}; // spreading the timerInterval object to avoid reference issues
			}

			this.persistStore();
		},
		removeTimerInterval(remove: TimerIntervalInterface) {
			this.timerIntervals = this.timerIntervals.filter(timerInterval => {
				return timerInterval !== remove;
			});

			this.persistStore();
		},
		find(id: string): TimerIntervalInterface | undefined {
			return this.timerIntervals.find(t => t.id === id);
		},
		getForTimer(timer_id: string): TimerIntervalInterface[] {
			return this.timerIntervals.filter(t => t.timer_id === timer_id);
		},
		persistStore() {
			this.saving = true;
			const store = new Storage();
			store.create()
				.then(() => {
					store.set('timerIntervalstore', JSON.stringify(this.timerIntervals));
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
					return store.get('timerIntervalstore')
				})
				.then((value) => {
					if (value) {
						this.timerIntervals = JSON.parse(value);
					}
				})
				.finally(() => {
					this.loading = false;
				})
		},
		clearStore() {
			this.timerIntervals = [];
			this.persistStore();
		}
	}
});
