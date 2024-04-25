<template>
    <div ref="mapContainer" class="map-container"></div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  
  const props = defineProps({
    selectedArea: Object
  });
  
  const mapContainer = ref(null);
  let map = null;
  let marker = null;
  
  onMounted(() => {
    map = L.map(mapContainer.value).setView([55.6761, 12.5683], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  });
  
  watch(() => props.selectedArea, (newValue) => {
    if (newValue) {
      if (marker) map.removeLayer(marker);
      marker = L.marker([newValue.lat, newValue.lng], { draggable: true })
        .addTo(map)
        .bindPopup(newValue.name);
      map.setView([newValue.lat, newValue.lng], 13);
    }
  });
  </script>
  
  <style scoped>
  .map-container {
    height: 400px;
  }
  </style>
  