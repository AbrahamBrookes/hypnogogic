<script setup lang="ts">
import { IonGrid, IonRow, IonCol, IonRippleEffect  } from '@ionic/vue';
import step1imgUrl from '@media/welcome-step-1.png';
import { pageSlideAnimation } from '@/router/animations'
import { useIonRouter } from '@ionic/vue';
const router = useIonRouter();

function next() {
	router.push('/welcome-2', pageSlideAnimation);
}

</script>

<template>
	<IonPage data-testid="welcome-flow-slide-1">
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
					<img :src="step1imgUrl" alt="Welcome" style="margin-top: 40px;" />
					<h5>This app uses timed alerts to wake you from sleep at certain intervals, keeping your mind just above sleep for extended periods</h5>
				</IonCol>
			</IonRow>
		</IonGrid>
		<IonGrid
			class="ion-text-center"
		>
			<IonRow>
				<IonCol>
					<IonButton
						@click="next"
						data-testid="welcome-flow-next"
					>
						Next
						<IonRippleEffect />
					</IonButton>
				</IonCol>
			</IonRow>
		</IonGrid>
	  </IonContent>
	</IonPage>
</template>