<script setup lang="ts">
import { useTimerStore } from '@stores/timerStore';
const timerStore = useTimerStore();
</script>

<template>
	<IonPage data-testid="settings-page">
	  <IonHeader :translucent="true">
		<IonToolbar>
		  <IonButtons slot="start">
			<IonMenuButton color="primary"></IonMenuButton>
		  </IonButtons>
		  <IonTitle>Settings</IonTitle>
		</IonToolbar>
	  </IonHeader>
  
	  <IonContent :fullscreen="true">
		<IonHeader collapse="condense">
		  <IonToolbar>
			<IonTitle size="large">Settings</IonTitle>
		  </IonToolbar>
		</IonHeader>
  
		<div id="container ion-align-items-start">
			asd
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
