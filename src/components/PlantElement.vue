<template>
  <div class="plantContainer" @click="navigateToPlant">
    <img :src="plantDetails?.imageURL || '/default-image.jpg'" alt="Plant image" class="plantImage">
    <div class="plantTextContainer">
      <p class="plantText">{{ plantDetails?.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
//import { db } from '@/firebase';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const db = getFirestore();

const props = defineProps(['plant']);
const router = useRouter();
const route = useRoute();
const plantDetails = ref(null);


onMounted(async () => {
  if (!props.plant.id) {
    console.error('Plant ID is undefined or empty');
    return;
  }

  const plantRef = doc(db, 'plants', props.plant.id);
  const plantSnap = await getDoc(plantRef);

  if (plantSnap.exists()) {
    plantDetails.value = plantSnap.data();
  } else {
    console.error('Plant not found');
    plantDetails.value = { name: 'Unknown', imageURL: '/default-image.jpg' }; // Default fallback
  }
});

// Function to navigate to detailed plant page
const navigateToPlant = () => {
  router.push({ name: 'PlantPage', params: { id: props.plant.id } });
};
</script>

<style scoped lang="scss">
@import '@/styles/global.scss';

.plantContainer {
  display: flex;
  align-items: center;
  border-radius: $border-radius;
  overflow: hidden;
  box-shadow: $drop-shadow-light;
  margin: 10px 0;
  width: 100%;
}

.plantImage {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}

.plantTextContainer {
  padding: 10px;
  color: $font-color;
}

.plantText {
  font-family: $primary-font;
}
</style>
