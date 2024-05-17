<template>
  <div class="overviewContainer">
    <!-- Your TopNav component, if any -->
    <h1 class="plantheader">{{ areaName }}</h1>
    <div v-if="!plants.length">No plants available.</div>
    <div v-else class="plantsGrid">
      <PlantElement
        v-for="plant in plants"
        :key="plant.id"
        :plant="plant"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { db } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import PlantElement from '@/components/PlantElement.vue';

const route = useRoute();
const plants = ref([]);
const areaName = ref('');

onMounted(async () => {
  const origin = route.params.origin;
  if (origin) {
    try {
      const plantsQuery = query(collection(db, 'plants'), where('origin', '==', origin));
      const querySnapshot = await getDocs(plantsQuery);
      console.log(querySnapshot.docs); // Log the documents to see what you get
      plants.value = querySnapshot.docs.map(doc => ({
        id: doc.id, // Make sure id is assigned properly
        ...doc.data() // Spread the document data into the object
      }));
      areaName.value = origin; // Assuming you want to set this to the name of the origin
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  }
});


</script>



<style scoped lang="scss">
@import "@/styles/global.scss";

.overviewContainer {
display: flex;
flex-direction: column;
align-items: center;
padding: 0 16px;
}

.plantheader {
text-align: center;
margin-top: 50px;
margin-bottom: 20px;
font-weight: bold;
}

.plantsGrid {
display: grid;
width: 100%; 
grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); 
gap: 10px; 
justify-content: center;
}

.plantContainer {
background-color: $secondary-color;
border-radius: 8px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
overflow: hidden; 
padding: 5px;
}
</style>
