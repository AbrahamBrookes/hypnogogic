import { defineStore } from 'pinia';
import { Storage } from '@ionic/storage';
import { v4 as uuidv4 } from 'uuid';

// An AppSetting is a key value pair that can be used to store settings for the app
export interface AppSettingInterface {
	id: string;
	name: string;
	value: string;
}

export const useAppSettingStore = defineStore('appSettingStore', {
	state: () => ({
		loading: false,
		saving: false,
		appSettings: [
			{
				id: uuidv4(),
				name: 'hasBeenWelcomed',
				value: '0',
			}
		] as AppSettingInterface[],
	}),
	actions: {
		async updateAppSetting(name: string, value: string) {
			const index = this.appSettings.findIndex(t => t.name === name);
			if (index >= 0) {
				this.appSettings[index].value = value;
			}
			await this.persistStore();
		},
		async removeAppSetting(remove: AppSettingInterface) {
			this.appSettings = this.appSettings.filter(appSetting => {
				return appSetting !== remove;
			});

			await this.persistStore();
		},
		find(id: string): AppSettingInterface | undefined {
			return this.appSettings.find(t => t.id === id) ||
				this.appSettings.find(t => t.name === id);
		},
		async persistStore() {
			this.saving = true;
			const store = new Storage();
			await store.create()
			await store.set('appSettingstore', JSON.stringify(this.appSettings));
			
			this.saving = false;
		},
		async restoreStore() {
			this.loading = true;
			const store = new Storage();
			await store.create()
			const serialized = await store.get('appSettingstore')
			if (serialized) {
				this.appSettings = JSON.parse(serialized);
			}
			this.loading = false;
		},
		async clearStore() {
			this.appSettings = [];
			await this.persistStore();
		}
	}
});
