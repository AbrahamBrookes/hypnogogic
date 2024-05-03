<script setup lang="ts">
import { IonGrid, IonRow, IonCol, IonRippleEffect  } from '@ionic/vue';
import step0imgUrl from '@media/welcome-step-0.png';
import { pageSlideAnimation } from '@/router/animations'
import { useIonRouter } from '@ionic/vue';
const router = useIonRouter();

function next() {
	router.push('/welcome-1', pageSlideAnimation);
}

</script>

<template>
	<IonPage data-testid="welcome-flow-slide-0">
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
					<img :src="step0imgUrl" alt="Welcome" style="margin-top: 40px;" />
					<H1 class="capitalize">Welcome to Hypnogogic</H1>
					<h5>The hypnogogic state is a state of consciousness between awake and asleep</h5>
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
						router-animation="forward"
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