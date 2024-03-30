<script setup lang="ts">
import { IonGrid, IonRow, IonCol, IonRippleEffect  } from '@ionic/vue';
import step2imgUrl from '@media/welcome-step-2.png';

import { useAppSettingStore } from '@stores/appSettingStore';
const appSettingStore = useAppSettingStore();

import { useIonRouter } from '@ionic/vue';
const router = useIonRouter();

function clickStart() {
	appSettingStore.updateAppSetting('hasBeenWelcomed', '1')
		.then(() => {
			router.push({ name: 'Home' });
		});
}
</script>

<template>
	<IonPage data-testid="welcome-flow-slide-2">
	  <IonContent :fullscreen="true">
		<IonGrid
			id="container"
			class="ion-text-center"
		>
			<IonRow
				class="ion-align-items-center ion-justify-content-center"
				style="height: 80vh"
			>
				<IonCol size="12" size-md="6" class="ion-padding-horizontal">
					<img :src="step2imgUrl" alt="Welcome" />
					<p>Practitioners can utilize the hypnogogic state to achieve deep suggestability, lucid dreams and out of body experiences</p>
				</IonCol>
			</IonRow>
		</IonGrid>
		<IonGrid
			class="ion-text-center"
		>
			<IonRow>
				<IonCol>
					<IonButton
						@click="clickStart"
						data-testid="welcome-flow-done"
					>
						Start
					</IonButton>
				</IonCol>
			</IonRow>
		</IonGrid>
	  </IonContent>
	</IonPage>
</template>