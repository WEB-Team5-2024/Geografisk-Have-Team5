<template>
    <div ref="mapContainer" class="map-container"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const gardenAreas = [
  { lat: 55.47497952681606, lng: 9.492622188649397, label: 'Hele Haven', color: 'gray' },  // Neutral color for the entire garden
  { lat: 55.473884, lng: 9.494414, label: 'Kina', color: 'red' },      // Red for China
  { lat: 55.472204, lng: 9.494612, label: 'Japan', color: 'white' },   // White for Japan, can use a red dot icon
  { lat: 55.471681, lng: 9.495576, label: 'Europa', color: 'blue' },   // Blue for European Union
  { lat: 55.470916, lng: 9.495305, label: 'NordMurica', color: 'red' },// Red for North America
  { lat: 55.470757, lng: 9.494155, label: 'SydMurica', color: 'green' },// Green for South America
  { lat: 55.470900, lng: 9.492946, label: 'NordMurica(2)', color: 'red' }, // Another red for an additional North America marker
  { lat: 55.474452, lng: 9.493133, label: 'Asien', color: 'yellow' }  // Yellow, representing many Asian countries
];

const mapContainer = ref(null);
let map = null;

onMounted(() => {
    // Adjusted to show the broader view of the entire garden
    map = L.map(mapContainer.value).setView([55.47509029500938, 9.492597226698194], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Adding circles for different areas
    gardenAreas.forEach(area => {
        L.circle([area.lat, area.lng], {
            color: area.color,
            fillColor: area.color,
            fillOpacity: 0.5,
            radius: 10 // Adjust the radius size as needed
        }).addTo(map)
          .bindPopup(area.label);
    });
});
</script>

<style scoped>
.map-container {
    height: 400px;
}
.map-label {
    background-color: white;
    color: black;
    font-weight: bold;
    padding: 6px;
    border-radius: 3px;
    border: 1px solid grey;
}
</style>
