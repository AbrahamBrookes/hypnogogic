<script setup lang="ts">
import TimerList from '@components/timers/TimerList.vue';
import ToggleAppMenuButton from '@components/interface/ToggleAppMenuButton.vue';
import BatteryOptimizationDialogue from '@/components/interface/BatteryOptimizationDialogue.vue';

import { useTimerStore } from '@stores/timerStore';
const timerStore = useTimerStore();
</script>

<template>
	<IonPage>
	  <IonHeader :translucent="true">
		<IonToolbar>
		  <IonButtons slot="start">
			<ToggleAppMenuButton />
		  </IonButtons>
		  <IonTitle>{{ $route.params.id }}</IonTitle>
		</IonToolbar>
	  </IonHeader>
  
	  <IonContent :fullscreen="true">
		<IonHeader collapse="condense">
		  <IonToolbar>
			<IonTitle size="large">{{ $route.params.id }}</IonTitle>
		  </IonToolbar>
		</IonHeader>
  
		<div id="container ion-align-items-start">
		  <BatteryOptimizationDialogue
		    class="ion-margin-top ion-margin-horizontal"
		  />

		  <TimerList
		    :timers="timerStore.timers"
		  >
		  </TimerList>
		</div>
	  </IonContent>
	</IonPage>
</template>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
