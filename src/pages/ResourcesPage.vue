<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue';
import { trash } from 'ionicons/icons';
import Card from '@components/interface/Card.vue';
</script>

<template>
	<IonPage data-testid="resources-page">
	  <IonHeader :translucent="true">
		<IonToolbar>
		  <IonButtons slot="start">
			<IonMenuButton color="primary"></IonMenuButton>
		  </IonButtons>
		  <IonTitle>Resources</IonTitle>
		</IonToolbar>
	  </IonHeader>
  
	  <IonContent :fullscreen="true">
		<IonHeader collapse="condense">
		  <IonToolbar>
			<IonTitle size="large">Resources</IonTitle>
		  </IonToolbar>
		</IonHeader>
		
		<div class="ion-padding">
			<Card
				title="Online communities"
				subtitle="Other people do this stuff too"
			>
				<p>
					<a href="https://www.reddit.com/r/AstralProjection/">Astral Projection Reddit</a>
				</p>
			</Card>
			
			<Card
				title="Binaural Beats"
				subtitle="Freely available on YouTube"
			>
				<p>
					These are three binaural beat tracks that I have personally used to achieve out of body experiences.
					Use stereo headphones that are comfortable to sleep in like galaxy buds or airpods. Use breathing
					techniques, relax your body and observe the movements of your mind. You may experience vibrations,
					auditory hallucinations, and other sensations. If you feel fear, you are on the right track. Don't
					let it hold you back, lean into it and enjoy the experience. Nothing can harm you in this state.
				</p>
				<iframe
					width="100%"
					height="200"
					src="https://www.youtube.com/embed/CwPdkuFB1C0?si=XyU4znDdNHZ6xv4i"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
					style="margin-top: 16px; margin-bottom: 10px;"
				></iframe>
				<iframe
					width="100%"
					height="200"
					src="https://www.youtube.com/embed/fkb_LtPg5t4?si=YGOHrv0iF-lJ2yHT"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
					style="margin-top: 10px; margin-bottom: 10px;"
				></iframe>
				<iframe
					width="100%"
					height="200"
					src="https://www.youtube.com/embed/LTQ2Sc9xUO4?si=3k2l3SVN3y7jkyFQ"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
			</Card>
		</div>
	  </IonContent>
	</IonPage>
</template>
