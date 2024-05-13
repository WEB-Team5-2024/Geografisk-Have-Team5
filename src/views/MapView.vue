<template>
    <div>
      <TopNav/>

      <MapComponent :selected-area="selectedArea" />
      <div class="menuContainer" v-if="!selectedArea">
        <!-- Loop through areas only if none is selected -->
        <div class="menuItem" v-for="area in areas" :key="area.id" @click="selectArea(area)">
          <div class="imageContainer">
            <img :src="area.imageURL" :alt="`${area.name} Image`" />
          </div>
          <div class="textContainer">
            <div class="titleAndDistance">
              <h3>{{ area.name }}</h3>
            <p class="distanceText">{{ area.distance ? `${area.distance} meters` : 'Calculating...' }}</p>
            
            </div>
            <p>{{ area.description }}</p>
          </div>
          <i class="bi bi-arrow-right-circle"></i>
        </div>
      </div>
      <div v-else class="selectedAreaContainer">
        <!-- Display the selected area details -->
        <div class="menuItem">
          <div class="imageContainer">
            <img :src="selectedArea.imageURL" :alt="`${selectedArea.name} Image`" />
          </div>
          <div class="textContainer">
            <h3>{{ selectedArea.name }}</h3>
            <p>{{ selectedArea.description }}</p>
            <button @click="navigateToMoreInfo(selectedArea)">Flere informationer <i class="bi bi-arrow-right-circle"></i></button>
               
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'; 
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useFirebaseStorage } from '@/composables/useFirebaseStorage';
import TopNav from '../components/TopNav.vue';
import MapComponent from '../components/MapComponent.vue';
import { useLocationStore } from '@/stores/location'; // Importer Pinia-butik til at få den valgte destination
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';




const areas = ref([]);
const router = useRouter(); 

const { imageUrl, loadImage } = useFirebaseStorage();

const areasCollectionRef = collection(db, 'areas');
const selectedArea = ref(null);
const locationStore = useLocationStore();

onMounted(async () => {
  const querySnapshot = await getDocs(areasCollectionRef);
  console.log('################################################################')
  console.log(locationStore);

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
      distance: data.distance,
      imageURL: imageUrl.value, 
    };
  }));
});

function selectArea(area) {
  selectedArea.value = area; 
    if (!area.lat || !area.lng) {
        console.error("Missing latitude or longitude for the area", area);
        return;
    }
    selectedArea.value = area; // Antag at selectedArea er en reaktiv reference
    locationStore.updateSelectedArea(area); // Opdater det valgte område i butikken
    console.log(`Selected Area Lat: ${area.lat}, Lng: ${area.lng}`); // Log lat og lng
}



const navigateToMoreInfo = (area) => {
  router.push({ name: 'countryView', params: { id: area.id } });
};
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

