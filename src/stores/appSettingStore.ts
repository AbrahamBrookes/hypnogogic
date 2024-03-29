import { defineStore } from 'pinia';
import { Storage } from '@ionic/storage';
import { v4 as uuidv4 } from 'uuid';

// An AppSetting is a key value pair that can be used to store settings for the app
export interface AppSettingInterface {
	id: string;
	name: string;
	value: number;
}

export const useAppSettingStore = defineStore('appSettingStore', {
	state: () => ({
		loading: false,
		saving: false,
		appSettings: [
			{
				id: uuidv4(),
				name: 'hasBeenWelcomed',
				value: 0,
			}
		] as AppSettingInterface[],
	}),
	actions: {
		updateAppSetting(appSetting: AppSettingInterface) {
			const index = this.appSettings.findIndex(t => t.id === appSetting.id);
			if (index >= 0) {
				this.appSettings[index] = {...appSetting}; // spreading the appSetting object to avoid reference issues
			}

			this.persistStore();
		},
		removeAppSetting(remove: AppSettingInterface) {
			this.appSettings = this.appSettings.filter(appSetting => {
				return appSetting !== remove;
			});

			this.persistStore();
		},
		find(id: string): AppSettingInterface | undefined {
			return this.appSettings.find(t => t.id === id) ||
				this.appSettings.find(t => t.name === id);
		},
		persistStore() {
			this.saving = true;
			const store = new Storage();
			store.create()
				.then(() => {
					store.set('appSettingstore', JSON.stringify(this.appSettings));
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
					return store.get('appSettingstore')
				})
				.then((value) => {
					if (value) {
						this.appSettings = JSON.parse(value);
					}
				})
				.finally(() => {
					this.loading = false;
				})
		},
		clearStore() {
			this.appSettings = [];
			this.persistStore();
		}
	}
});
