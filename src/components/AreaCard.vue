<template>
    <div>
      <div class="menuContainer" v-if="!selectedArea">
        <div class="menuItem" v-for="area in locationStore.gardenAreas" :key="area.id" @click="selectArea(area)">
          <div class="imageContainer">
            <img :src="area.imageURL" :alt="`${area.name} Image`" />
          </div>
          <div class="textContainer">
            <div class="titleAndDistance">
              <h3>{{ area.name }}</h3>
              <p class="distanceText">{{ area.distance !== null ? `${area.distance} meters` : 'Calculating...' }}</p>
            </div>
            <p>{{ area.description }}</p>
          </div>
          <i class="bi bi-arrow-right-circle"></i>
        </div>
      </div>
      <div v-else class="selectedAreaContainer">
        <div class="menuItem">
          <div class="imageContainer">
            <img :src="selectedArea.imageURL" :alt="`${selectedArea.name} Image`" />
          </div>
          <div class="textContainer">
            <h3>{{ selectedArea.name }}</h3>
            <p>{{ selectedArea.description }}</p>
            <p class="distanceText">{{ selectedArea.distance !== null ? `${selectedArea.distance} meters` : 'Calculating...' }}</p>
            <button @click="navigateToMoreInfo(selectedArea)">Flere informationer <i class="bi bi-arrow-right-circle"></i></button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { useFirebaseStorage } from '@/composables/useFirebaseStorage';
  import { useLocationStore } from '@/stores/location';
  import { collection, getDocs } from 'firebase/firestore';
  import { db } from '@/firebase';
  
  const areas = ref([]);
  const selectedArea = ref(null);
  const router = useRouter();
  
  const { imageUrl, loadImage } = useFirebaseStorage();
  const areasCollectionRef = collection(db, 'areas');
  const locationStore = useLocationStore();
  
  onMounted(async () => {
    const querySnapshot = await getDocs(areasCollectionRef);
    areas.value = await Promise.all(querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const filePath = `images/${data.name}.png`;
      try {
        await loadImage(filePath);
      } catch (error) {
        console.error('Error loading image:', error);
      }
      return {
        id: doc.id,
        name: data.name,
        description: data.description,
        lat: data.lat, // Ensure latitude is included
        lng: data.lng, // Ensure longitude is included
        distance: areas.distance, // Start with null until distance is calculated
        imageURL: imageUrl.value,
      };
    }));
  
    // Update garden areas in the store
    locationStore.$patch({ gardenAreas: areas.value });
  
    // Calculate distances initially if currentPosition is already set
    if (locationStore.currentPosition.lat && locationStore.currentPosition.lng) {
      calculateDistances();
    }
  });
  
  // Watch for updates to currentPosition and recalculate distances
  watch(
    () => locationStore.currentPosition,
    (newPosition) => {
      if (newPosition.lat && newPosition.lng) {
        calculateDistances();
      }
    },
    { immediate: true, deep: true }
  );
  
  function calculateDistances() {
    if (locationStore.currentPosition.lat && locationStore.currentPosition.lng) {
      areas.value.forEach(area => {
        if (area.lat && area.lng) {
          area.distance = locationStore.calculateDistance(locationStore.currentPosition, { lat: area.lat, lng: area.lng });
        }
      });
    }
  }
  
  function selectArea(area) {
    selectedArea.value = area;
    if (!area.lat || !area.lng) {
      console.error("Missing latitude or longitude for the area", area);
      return;
    }
    locationStore.updateSelectedArea(area);
  }
  
  function navigateToMoreInfo(area) {
    router.push({ name: 'countryView', params: { id: area.id } });
  }
  
  // Watch for updates to the selected area in the store
  watch(
    () => locationStore.selectedArea,
    (newSelectedArea) => {
      selectedArea.value = newSelectedArea;
    },
    { immediate: true }
  );
  
  import MapComponent from './MapComponent.vue';
  
  // Define the method to update the map for the selected area
  let mapComponentRef = ref(null);
  
  function updateMapForArea(area) {
    if (mapComponentRef.value) {
      mapComponentRef.value.updateMapForArea(area);
    }
  }
  </script>
  
  <style scoped lang="scss">
  @import '@/styles/global.scss';
  @import 'bootstrap-icons/font/bootstrap-icons.css';
  
  .menuContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 8px 15px 0px 15px;
    margin-bottom: 100px;
  
    .menuItem {
      display: flex;
      align-items: center;
      background: $secondary-color;
      box-shadow: $menuContainer-shadow;
      border-radius: $border-radius;
      padding: 20px;
      color: $font-color;
      position: relative;
      gap: 10px;
  
      .imageContainer {
        flex-shrink: 0;
        width: 100px;
        height: 100px;
        border-radius: $border-radius;
        overflow: hidden;
        margin-right: 10px;
  
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
  
      .textContainer {
        flex-grow: 1;
  
        .titleAndDistance {
          display: flex;
          justify-content: space-between;
          align-items: center;
  
          h3 {
            font-size: $medium-font-size;
            margin: 0;
            color: $font-color;
            font-size: 16px;
          }
  
          .distance {
            background: #FFFFFF;
            color: #000000;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
          }
  
          .distanceText {
            color: $distancetext-color;
          }
        }
  
        p {
          font-size: $small-font-size;
          margin: 0;
          font-size: 12px;
          color: $font-color;
        }
      }
  
      .bi-arrow-right-circle {
        font-size: 30px;
        margin-left: auto;
        color: #FFF;
      }
    }
  }
  .selectedAreaContainer {
    display: flex;
    gap: 15px;
    margin: 10px;
  
    .menuItem {
      display: flex;
      align-items: center;
      background: $secondary-color;
      box-shadow: $drop-shadow-light;
      border-radius: $border-radius;
      padding: 20px;
      color: $font-color;
      position: relative;
  
      .imageContainer {
        padding: 5px;
        flex-shrink: 0;
        width: 100px;
        height: 100px;
        border-radius: $border-radius;
        overflow: hidden;
        margin-right: 10px;
  
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
  
      .textContainer {
        h3 {
          margin: 0;
          color: $font-color;
          font-size: $medium-font-size;
        }
  
        p {
          margin: 0;
          font-size: $small-font-size;
          color: $font-color;
        }
  
        button {
          margin-top: 20px;
          display: flex;
          padding: 10px 15px;
          border-radius: 15px;
          font-size: 1rem;
          background-color: #4A4C63;
          color: white;
          border: none;
          cursor: pointer;
          display: inline-block;
          text-align: center;
        }
      }
    }
  }
  </style>
  