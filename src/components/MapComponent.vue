<template>
    <div ref="mapContainer" class="map-container"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const gardenAreas = [
  { lat: 55.47497952681606, lng: 9.492622188649397, label: 'Hele Haven', color: 'gray' },  
  { lat: 55.473884, lng: 9.494414, label: 'Kina', color: 'red' },      
  { lat: 55.472204, lng: 9.494612, label: 'Japan', color: 'white' },   
  { lat: 55.471681, lng: 9.495576, label: 'Europa', color: 'blue' },   
  { lat: 55.470916, lng: 9.495305, label: 'NordAmerica', color: 'red' },
  { lat: 55.470757, lng: 9.494155, label: 'SydAmerica', color: 'green' },
  { lat: 55.474452, lng: 9.493133, label: 'Asien', color: 'yellow' }  
];

const mapContainer = ref(null);
let map = null;

onMounted(() => {
    map = L.map(mapContainer.value).setView([55.47509029500938, 9.492597226698194], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Adding circles for different areas and enable routing
    gardenAreas.forEach(area => {
        L.circle([area.lat, area.lng], {
            color: area.color,
            fillColor: area.color,
            fillOpacity: 0.5,
            radius: 10
        }).addTo(map)
          .bindPopup(area.label);
    });

    // Locate the user's current position and route
    map.locate({setView: true, maxZoom: 16});

    map.on('locationfound', e => {
        const position = e.latlng;
        L.marker(position).addTo(map)
          .bindPopup('Your Current Location').openPopup();

        // Create routes from current location to each garden area
        gardenAreas.forEach(area => {
            L.Routing.control({
                waypoints: [
                    L.latLng(position.lat, position.lng),
                    L.latLng(area.lat, area.lng)
                ],
                lineOptions: {
                    styles: [{ color: area.color, opacity: 1, weight: 5 }]
                },
                createMarker: function() { return null; } // Disable route markers
            }).addTo(map);
        });
    });

    map.on('locationerror', () => {
        alert('Location access denied. Unable to retrieve your location.');
    });
});
</script>

<style scoped>
.map-container {
    height: 400px;  
}
</style>
