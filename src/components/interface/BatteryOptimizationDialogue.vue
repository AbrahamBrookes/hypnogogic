<script setup lang="ts">
import { computed } from 'vue';
import Info from '@/components/interface/Info.vue';

import { useAppSettingStore, AppSettingInterface } from '@stores/appSettingStore';
const appSettingStore = useAppSettingStore();

const showBatteryOptmizationDialogue = computed<boolean>(() =>
	! parseInt(appSettingStore.find('hasClosedBatteryOptimizationDialogue').value) || props.show
);

function closeBatteryOptimizationDialogue() {
	appSettingStore.updateAppSetting('hasClosedBatteryOptimizationDialogue', '1');
}

const props = defineProps<{
	show: boolean; // override the computed property
}>();

</script>

<template>
	<Info
		v-if="showBatteryOptmizationDialogue"
		@click="closeBatteryOptimizationDialogue"
	>
		<p>Android devices aggressively batch notifications to optimize battery life. You will need to go into your device settings and turn off battery optimization for Hypnogogic in order to get accurate alert timings</p>
	</Info>	
</template>