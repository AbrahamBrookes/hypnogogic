<script setup lang="ts">
import { IonGrid, IonRow, IonCol, IonRippleEffect  } from '@ionic/vue';
import step1imgUrl from '@media/welcome-step-1.png';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();

function next() {
	localStorage.setItem('hasBeenWelcomed', 'true');
	// navigate to /home
	router.push('/welcome-2');
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
					<img :src="step1imgUrl" alt="Welcome" />
					<p>This app uses timed alerts to wake you from sleep at certain intervals, keeping your mind just above sleep for extended periods</p>
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