<template>
  <div>
    <div class="TopNavcontainer">
      <div @click="goBack"> <!-- Use the goBack method to handle back navigation -->
        <svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
      </div>
    </div>
    <div class="menuContainer" v-if="!locationStore.selectedArea">
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
        <div class="infoContainer">
          <div class="imageContainer">
            <img :src="locationStore.selectedArea.imageURL" :alt="`${locationStore.selectedArea.name} Image`" />
          </div>
          <div class="textContainer">
            <div class="titleAndDistance">
              <h3>{{ locationStore.selectedArea.name }}</h3>
              <p class="distanceText">{{ locationStore.selectedArea.distance !== null ? `${locationStore.selectedArea.distance} meters` : 'Calculating...' }}</p>
            </div>
            <p>{{ locationStore.selectedArea.description }}</p>
          </div>
        </div>
        <button @click="navigateToMoreInfo(locationStore.selectedArea)">Flere informationer <i class="bi bi-arrow-right-circle"></i></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useLocationStore } from '@/stores/location';

const router = useRouter();
const route = useRoute();
const locationStore = useLocationStore();
const previousRoute = ref(null);

function selectArea(area) {
  locationStore.updateSelectedArea(area);
}

function navigateToMoreInfo(area) {
  router.push({ name: 'countryView', params: { id: area.id } });
}

function goBack() {
  if (locationStore.selectedArea) {
    locationStore.updateSelectedArea(null); 
    router.push({ name: 'map' }); 
  } else if (previousRoute.value) {
    router.push(previousRoute.value); 
  } else {
    router.back(); 
  }
}


watch(
  () => locationStore.selectedArea,
  (newSelectedArea) => {
    if (newSelectedArea) {
      selectArea(newSelectedArea);
    }
  },
  { immediate: true }
);

watch(route, (newRoute, oldRoute) => {
  if (oldRoute && oldRoute.name) {
    previousRoute.value = { name: oldRoute.name, params: oldRoute.params };
  }
}, { immediate: true });
</script>


<style scoped lang="scss">
@import '@/styles/global.scss';
@import 'bootstrap-icons/font/bootstrap-icons.css';

.TopNavcontainer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $primary-color;
  border-bottom: 1px solid var(--color-border);
  width:  60px;
  height: 60px;
  border-radius: 50%;
  padding: 0;
  margin: 5px;

  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100000000;
}

.arrow {
  display: flex;
  fill: $background-color;
  width:  30px;
  height: 30px;
}

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
    flex-direction: column;
    background: $secondary-color;
    box-shadow: $menuContainer-shadow;
    border-radius: $border-radius;
    padding: 20px;
    color: $font-color;
    position: relative;
    gap: 10px;
    font-size: 20px;

    .infoContainer{
      display: flex;
      flex-direction: row;
    }


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

    button {  
      display: flex;
      justify-content: center;
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
</style>
