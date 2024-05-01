<template>
  <div class="page-container">
    <header class="header">
      <img :src="headerImageUrl" alt="Plant banner" class="plant-banner">
      <div class="plant-name">
        <h2>{{ plantDetails?.name }}</h2>
      </div>
    </header>
    <main class="content">
      <section class="plant-details">
        <!-- Directly render the description without iterating over sections -->
        <article>
          <p v-html="plantDetails?.description || 'No description available'"></p>
        </article>
      </section>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useFirebaseStorage } from '@/composables/useFirebaseStorage';

export default {
  setup() {
    const route = useRoute();
    const plantDetails = ref(null);
    const { imageUrl, loadImage } = useFirebaseStorage();

    onMounted(async () => {
      const plantId = route.params.id;
      if (!plantId) {
        console.error('Plant ID is not defined');
        return;
      }

      const plantRef = doc(db, 'plants', plantId);
      const plantSnap = await getDoc(plantRef);

      if (plantSnap.exists()) {
        plantDetails.value = plantSnap.data();
        if (plantDetails.value && plantDetails.value.name) {
          loadImage(`images/${plantDetails.value.name}.png`);
        }
      } else {
        console.error('Plant not found');
      }
    });

    return { plantDetails, headerImageUrl: imageUrl };
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/global.scss";

.page-container {
  .header {
    position: relative;
    text-align: center;
    .plant-banner {
      width: 100%;
      height: auto;
    }
    .plant-name {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: $extra-large-font-size;
      font-weight: $bold-weight;
      padding: 0.5rem 1rem; 
    }
  }

  .content {
    .plant-details {
      margin-top: 50px;
      margin-left: 1rem;
      
      article {
        p {
          color: black; 
          font-size: $medium-font-size;
          margin-bottom: 4rem;
        }
      }
    }
  }
}
</style>
