<template>
    <div class="overviewContainer">
      <!-- Your TopNav component, if any -->
      <h1 class="plantheader">Planter i Japan</h1>
      <div v-if="!plants.length">No plants available.</div>
      <div class="plantsGrid">
        <PlantElement
          v-for="plant in plants"
          :key="plant.id"
          :plant="plant"
        />
      </div>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase';
  import { collection, getDocs } from 'firebase/firestore';
  import { ref, onMounted } from 'vue';
  import PlantElement from '@/components/PlantElement.vue';
  
  export default {
    components: { PlantElement },
    setup() {
      const plants = ref([]);
    
      onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'plants'));
    plants.value = querySnapshot.docs.map(doc => ({
      id: doc.id, // Firestore-generated ID
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching plants:", error);
  }
});
    
      return { plants };
    },
  };
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
  