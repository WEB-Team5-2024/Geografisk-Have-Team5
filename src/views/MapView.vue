<template>
  <div>
    <TopNav />
    <MapComponent @distance-calculated="handleDistanceCalculation" />
    <AreaCard :distance="distanceResult" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useLocationStore } from '@/stores/location';

import TopNav from '../components/TopNav.vue';
import MapComponent from '../components/MapComponent.vue';
import AreaCard from '../components/AreaCard.vue';

import { ref } from 'vue';

const distanceResult = ref(null);

function handleDistanceCalculation(distance) {
    distanceResult.value = distance;
}


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
