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
	IonIcon
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
  .component('IonIcon', IonIcon);
  
router.isReady().then(() => {
  app.mount('#app');
});

// load our pinia stores from storage
import { useTimerStore } from '@stores/timerStore';
const timerStore = useTimerStore();
timerStore.restoreStore();

// stuff we want to do just for cypress's sake
if (window.Cypress) {
	window.timerStore = timerStore   // test can see window.store
}
