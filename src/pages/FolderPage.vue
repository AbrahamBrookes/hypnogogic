
<template>
	<IonPage>
	  <IonHeader :translucent="true">
		<IonToolbar>
		  <IonButtons slot="start">
			<IonMenuButton color="primary"></IonMenuButton>
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
  
		<div id="container">
		  <strong class="capitalize">{{ $route.params.id }}</strong>
		  <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
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
