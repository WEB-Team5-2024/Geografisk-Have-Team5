<template>
  <div>
    <TopNav />
    <MapComponent :selected-area="selectedArea" />
    <AreaCard />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useLocationStore } from '@/stores/location';

import TopNav from '../components/TopNav.vue';
import MapComponent from '../components/MapComponent.vue';
import AreaCard from '../components/AreaCard.vue';

const locationStore = useLocationStore();

onMounted(() => {
  locationStore.fetchGardenAreas();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      locationStore.updateCurrentPosition({ lat: latitude, lng: longitude });
    });
  }
});
</script>

<style scoped lang="scss">
@import '@/styles/global.scss';
@import 'bootstrap-icons/font/bootstrap-icons.css';
</style>
