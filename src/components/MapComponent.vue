<template>
    <div>
      <div ref="mapContainer" class="map-container"></div>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLocationStore } from '@/stores/location';

const mapContainer = ref(null);
let map = null;
let routingControl = null;
let heleHavenPolygon = null;  

const locationStore = useLocationStore();

const heleHavenPunkter = [
  [55.4754694, 9.4916197], [55.4753040, 9.4929526], [55.4751092, 9.4928845],
  [55.4749764, 9.4940302], [55.4707746, 9.4962617], [55.4693387, 9.4929228],
  [55.4711935, 9.4896023]
];
  
  const gardenAreas = [
    { lat: 55.473884, lng: 9.494414, label: 'Kina', color: 'red' },      
    { lat: 55.472204, lng: 9.494612, label: 'Japan', color: 'white' },   
    { lat: 55.471681, lng: 9.495576, label: 'Europa', color: 'blue' },   
    { lat: 55.470916, lng: 9.495305, label: 'NordAmerica', color: 'red' },
    { lat: 55.470757, lng: 9.494155, label: 'SydAmerica', color: 'green' },
    { lat: 55.474452, lng: 9.493133, label: 'Asien', color: 'yellow' }  
  ];
  
  onMounted(() => {
    map = L.map(mapContainer.value).setView([55.47509029500938, 9.492597226698194], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  
    // Adding polygon for hele haven area
    const heleHavenPolygon = L.polygon(heleHavenPunkter, {
      color: 'gray',
      fillColor: 'gray',
      fillOpacity: 0.5
    }).addTo(map)
      .bindPopup('Hele Haven');
  
    // Adding circles for different areas
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
  
      // Check if the current position is within the garden area
      const isInGarden = heleHavenPolygon.getBounds().contains(position);
  
      // If the current position is within the garden area, show marker and route
      if (isInGarden) {
        L.marker(position).addTo(map)
          .bindPopup('Your Current Location').openPopup();
  
        // Create routes from current location to each garden area
        routingControl = L.Routing.control({
          waypoints: [
            L.latLng(position.lat, position.lng),
            L.latLng(locationStore.selectedArea.lat, locationStore.selectedArea.lng)
          ],
          lineOptions: {
            styles: [{ color: 'blue', opacity: 1, weight: 5 }]
          },
          createMarker: function() { return null; } // Disable route markers
        }).addTo(map);
      } else {
        alert('You are not in the garden area.');
      }
    });
  
    map.on('locationerror', () => {
      alert('Location access denied. Unable to retrieve your location.');
    });
  });
  
  watch(() => locationStore.selectedArea, (selectedArea) => {
  console.log("Selected Area Changed:", selectedArea);
  if (routingControl && selectedArea) {
    // Update the waypoints of the routing control
    routingControl.setWaypoints([
      L.latLng(map.getCenter().lat, map.getCenter().lng), // Current map center
      L.latLng(selectedArea.lat, selectedArea.lng)
    ]);
  }
});

  </script>
  
  <style scoped>
  .map-container {
    height: 400px;  
  }
  </style>
  