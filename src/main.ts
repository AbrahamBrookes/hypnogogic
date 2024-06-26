import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar,
	IonIcon,
	IonGrid,
	IonRow,
	IonCol
} from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* custom css */
import './theme/utilities.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(createPinia())
  .component('IonPage', IonPage)
  .component('IonHeader', IonHeader)
  .component('IonContent', IonContent)
  .component('IonButtons', IonButtons)
  .component('IonButton', IonButton)
  .component('IonMenuButton', IonMenuButton)
  .component('IonTitle', IonTitle)
  .component('IonToolbar', IonToolbar)
  .component('IonIcon', IonIcon)
  .component('IonGrid', IonGrid)
  .component('IonRow', IonRow)
  .component('IonCol', IonCol);
  
router.isReady().then(() => {
  app.mount('#app');
});

// load our pinia stores from storage
import { useTimerStore } from '@stores/timerStore';
const timerStore = useTimerStore();
timerStore.restoreStore();
import { useTimerIntervalStore } from '@stores/timerIntervalStore';
const timerIntervalStore = useTimerIntervalStore();
timerIntervalStore.restoreStore();
import { useAppSettingStore } from '@stores/appSettingStore';
const appSettingStore = useAppSettingStore();
appSettingStore.restoreStore();
import { useSoundStore } from '@stores/soundStore';
const soundStore = useSoundStore();
soundStore.restoreStore();

// stuff we want to do just for cypress's sake
if (window.Cypress) {
	// expose stores to cupress via window
	window.timerStore = timerStore
	window.timerIntervalStore = timerIntervalStore
	window.appSettingStore = appSettingStore
	window.soundStore = soundStore
}
