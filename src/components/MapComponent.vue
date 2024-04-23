<template>
    <div ref="map" id="map"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'; // Import ref and onMounted

import L from 'leaflet';

const mapContainer = ref(null); // Create a ref for the map container


const setup = () => {
    onMounted(() => {
        var map = L.map('map').fitWorld();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
    tileSize: 512,
}).addTo(map);
    });
    
    return { mapContainer }; // Return the map container ref
};

setup();
</script>

<style lang="scss" scoped>
    #map{
        max-height: 40vh;
        width: 100vw;
        overflow: hidden;
        
    }    
   
</style>
