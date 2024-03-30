import { defineStore } from 'pinia';
import { Storage } from '@ionic/storage';
import { v4 as uuidv4 } from 'uuid';
import { SoundInterface } from '@stores/soundStore';

// the Timer is the main object we are storing in the store
export interface TimerInterface {
	id: string;
	name: string;
	start_at: string;
	sound: SoundInterface;
	enabled: boolean;
}

export const useTimerStore = defineStore('timerStore', {
	state: () => ({
		loading: false,
		saving: false,
		timers: [] as TimerInterface[],
	}),
	actions: {
		async addTimer(timer: TimerInterface): Promise<TimerInterface> {
			this.timers.push({
				...timer,
				id: uuidv4(),
				enabled: true,
			});

			await this.persistStore();

			return this.timers[this.timers.length - 1];
		},
		async updateTimer(timer: TimerInterface) {
			const index = this.timers.findIndex(t => t.id === timer.id);
			if (index >= 0) {
				this.timers[index] = {...timer}; // spreading the timer object to avoid reference issues
			}

			await this.persistStore();
		},
		async removeTimer(id: string) {
			this.timers = this.timers.filter(timer => {
				return timer.id !== id;
			});

			await this.persistStore();
		},
		find(id: string): TimerInterface | undefined {
			return this.timers.find(t => t.id === id);
		},
		async toggleTimerEnabled(timer: TimerInterface, enabled: boolean) {
			const index = this.timers.findIndex(t => t.id === timer.id);
			if (index >= 0) {
				this.timers[index].enabled = enabled;
			}

			await this.persistStore();
		},
		async persistStore() {
			this.saving = true;
			const store = new Storage();
			await store.create();
			await store.set('timerStore', JSON.stringify(this.timers));
			this.saving = false;
		},
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
		async clearStore() {
			this.timers = [];
			await this.persistStore();
		}
	}
});
