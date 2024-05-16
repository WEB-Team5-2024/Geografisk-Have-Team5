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
  
  const geoJSONData = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "info": "Kina"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [9.49266, 55.474597],
              [9.492885, 55.47509],
              [9.494022, 55.474974],
              [9.495739, 55.471909],
              [9.495353, 55.471891],
              [9.494902, 55.472603],
              [9.494591, 55.472755],
              [9.493572, 55.474786],
              [9.493314, 55.47481],
              [9.493121, 55.474463],
              [9.49266, 55.474597]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "info": "Asian"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [9.492643, 55.474573],
              [9.493105, 55.474396],
              [9.493609, 55.473755],
              [9.492681, 55.473445],
              [9.492182, 55.473469],
              [9.492643, 55.474573]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "info": "Japan"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [9.492027, 55.473059],
              [9.492075, 55.473232],
              [9.492365, 55.473341],
              [9.493282, 55.47325],
              [9.493786, 55.472958],
              [9.494591, 55.472749],
              [9.494918, 55.472587],
              [9.495277, 55.47201],
              [9.495074, 55.471952],
              [9.495175, 55.4718],
              [9.494929, 55.471745],
              [9.494677, 55.471648],
              [9.494414, 55.471222],
              [9.494247, 55.471627],
              [9.494274, 55.471773],
              [9.494129, 55.471757],
              [9.494027, 55.471633],
              [9.494011, 55.471499],
              [9.494022, 55.471411],
              [9.493781, 55.471383],
              [9.493411, 55.471465],
              [9.493394, 55.471411],
              [9.493126, 55.471462],
              [9.492976, 55.471584],
              [9.492885, 55.471657],
              [9.492928, 55.471824],
              [9.492933, 55.471937],
              [9.493035, 55.472171],
              [9.493126, 55.472451],
              [9.493116, 55.47246],
              [9.493185, 55.47256],
              [9.493266, 55.47273],
              [9.493142, 55.472913],
              [9.492027, 55.473059]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "info": "Europa"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [9.495744, 55.471909],
              [9.495363, 55.471894],
              [9.495277, 55.472004],
              [9.495079, 55.471952],
              [9.495181, 55.471794],
              [9.495519, 55.471706],
              [9.495776, 55.471192],
              [9.496146, 55.471216],
              [9.495744, 55.471909]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "info": "Nord Amerika"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [9.494419, 55.471219],
              [9.494677, 55.471645],
              [9.495175, 55.471803],
              [9.495535, 55.471706],
              [9.495766, 55.471183],
              [9.496141, 55.471219],
              [9.4959, 55.470888],
              [9.495234, 55.470842],
              [9.494736, 55.470885],
              [9.494419, 55.471219]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "info": "Syd Amerika"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [9.494033, 55.47048],
              [9.493813, 55.470547],
              [9.493743, 55.470581],
              [9.493802, 55.470693],
              [9.494027, 55.470803],
              [9.494194, 55.470663],
              [9.494033, 55.47048]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "info": "Nord Amerika"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [9.493378, 55.470529],
              [9.493749, 55.470806],
              [9.493684, 55.470909],
              [9.493185, 55.471061],
              [9.492815, 55.471292],
              [9.492751, 55.471149],
              [9.492778, 55.470955],
              [9.492981, 55.470757],
              [9.493378, 55.470529]
            ]
          ]
        }
      }
    ]
  };
  
  onMounted(() => {
    map = L.map(mapContainer.value, { zoomControl: false}).setView([55.47509029500938, 9.492597226698194], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
      {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  
    // Layer for lines
    linesLayer = L.layerGroup().addTo(map);
  
    // Add polygons from GeoJSON data
    geoJSONData.features.forEach(feature => {
      const coordinates = feature.geometry.coordinates[0].map(coord => [coord[1], coord[0]]);
      const properties = feature.properties;
      const info = properties.info;
  
      const polygon = L.polygon(coordinates, {
        color: 'gray',
        fillColor: 'gray',
        fillOpacity: 0.5
      }).addTo(map);
  
      polygon.on('click', () => {
        const distance = locationStore.calculateDistance(locationStore.currentPosition, polygon.getBounds().getCenter());
        emits('update:areaDistance', distance);
        drawLineToArea(polygon.getBounds().getCenter().lat, polygon.getBounds().getCenter().lng);
  
        // Update the popup content with the distance
        const popupContent = `${info}<br>Distance: ${distance} meters`;
        polygon.bindPopup(popupContent).openPopup();
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
  
    watch(() => props.areaDistance, (newVal, oldVal) => {
      if (newVal === null && oldVal !== null) {
        // If area distance falls back to "Connecting..."
        locationStore.calculateDistances();
      }
    });
  });
  
  function drawLineToArea(lat, lng) {
    linesLayer.clearLayers();  
    if (currentLocationMarker) {
      L.polyline([
        currentLocationMarker.getLatLng(),
        [lat, lng]
      ], {
        color: 'blue',
        weight: 4,
        dashArray: '10, 10',
        lineCap: 'round'
      }).addTo(linesLayer);
    }
  }
  </script>
  
  <style scoped>
  .map-container {
    height: 400px;
  }
  </style>
  