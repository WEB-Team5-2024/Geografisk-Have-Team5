<template>
    <div>
      <div ref="mapContainer" class="map-container"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, defineProps, defineEmits } from 'vue';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import { useLocationStore } from '@/stores/location';
  
  const props = defineProps({
    selectedArea: {
      type: Object,
      default: null
    },
    areaDistance: {
      type: Number,
      default: null
    }
  });
  
  const emits = defineEmits(['update:areaDistance']);
  
  const mapContainer = ref(null);
  let map = null;
  let currentLocationMarker = null;
  let linesLayer = null;
  
  const locationStore = useLocationStore();
  
  onMounted(() => {
    map = L.map(mapContainer.value).setView([55.47509029500938, 9.492597226698194], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  
    // Layer for lines
    linesLayer = L.layerGroup().addTo(map);
  
    // Define and add polygon for Hele Haven area
    const heleHavenPunkter = [
      [55.4754694, 9.4916197], [55.4753040, 9.4929526], [55.4751092, 9.4928845],
      [55.4749764, 9.4940302], [55.4707746, 9.4962617], [55.4693387, 9.4929228],
      [55.4711935, 9.4896023]
    ];
    L.polygon(heleHavenPunkter, {
      color: 'gray',
      fillColor: 'gray',
      fillOpacity: 0.5
    }).addTo(map).bindPopup('Hele Haven');
  
    // Add markers for each garden area
    locationStore.gardenAreas.forEach(area => {
      const marker = L.circle([area.lat, area.lng], {
        color: area.color,
        fillColor: area.color,
        fillOpacity: 0.5,
        radius: 50
      }).addTo(map);
  
      // Layer for lines
      linesLayer = L.layerGroup().addTo(map);
  
      // Define and add polygon for Hele Haven area
      const heleHavenPunkter = [
          [55.4754694, 9.4916197], [55.4753040, 9.4929526], [55.4751092, 9.4928845],
          [55.4749764, 9.4940302], [55.4707746, 9.4962617], [55.4693387, 9.4929228],
          [55.4711935, 9.4896023]
      ];
      L.polygon(heleHavenPunkter, {
          color: 'gray',
          fillColor: 'gray',
          fillOpacity: 0.5
      }).addTo(map).bindPopup('Hele Haven');
  
      // Add markers for each garden area
      locationStore.gardenAreas.forEach(area => {
          const marker = L.circle([area.lat, area.lng], {
              color: area.color,
              fillColor: area.color,
              fillOpacity: 0.5,
              radius: 50
          }).addTo(map);
  
          marker.on('click', () => {
              drawLineToArea(area.lat, area.lng);
              setTimeout(() => {
                  marker.bindPopup(`<strong>${area.name}</strong><br>Distance: ${area.distance ? `${area.distance} meters` : 'Calculating...'}`, {
                      offset: L.point(0, -40) // Lift the popup above the line
                  }).openPopup();
              }, 200); // Delay popup opening to draw attention to the line
          });
      });
    });
  
    // Locate and mark the user's current location
    map.locate({ setView: true, maxZoom: 16 });
    map.on('locationfound', e => {
      locationStore.updateCurrentPosition(e.latlng);
      if (!currentLocationMarker) {
        currentLocationMarker = L.marker(e.latlng).addTo(map);
        currentLocationMarker.bindPopup('Your Current Location').openPopup();
      } else {
        currentLocationMarker.setLatLng(e.latlng);
      }
    });
  
    map.on('locationerror', () => {
      alert('Location access denied. Unable to retrieve your location.');
    });
  });
  
  function drawLineToArea(lat, lng) {
    linesLayer.clearLayers();  // Clear previous lines
    if (currentLocationMarker) {
      L.polyline([
        currentLocationMarker.getLatLng(),
        [lat, lng]
      ], {
        color: 'blue',
        weight: 4,
        dashArray: '10, 10', // Dashed line style
        lineCap: 'round'
      }).addTo(linesLayer);
    }
  }
  
  watch(() => props.areaDistance, (newVal, oldVal) => {
    if (newVal === null && oldVal !== null) {
      // If area distance falls back to "Connecting..."
      locationStore.updateDistances();
    }
  });
  </script>
  
  <style scoped>
  .map-container {
    height: 400px;
  }
  </style>
  