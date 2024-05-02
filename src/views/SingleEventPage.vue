<template>
  <LoadingSpinner :loading="isLoading"  v-if="isLoading"/>
  <div v-else>
  <TopNav />
  <div class="event-hero">
    <img :src="imageUrl || '/default-image.jpg'" alt="Event Image" loading="lazy">
    <div class="text-centered">{{ event ? event.title : 'Loading...' }}</div>
  </div>
  <DetailedEventCard />
  <EventProgram />
</div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import EventProgram from '@/components/EventProgram.vue';
import DetailedEventCard from '@/components/DetailedEventCard.vue';
import TopNav from '@/components/TopNav.vue';
import { useFirebaseStorage } from '@/composables/useFirebaseStorage'; // Import your composable
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const route = useRoute();
const { imageUrl, loadImage } = useFirebaseStorage(); // Destructure the composable
const event = ref(null);
const isLoading = ref(true);
onMounted(async () => {

  const eventDocRef = doc(db, 'events', route.params.id);
  const docSnap = await getDoc(eventDocRef);
  if (docSnap.exists()) {
    event.value = docSnap.data();
    console.log("Event data:", event.value);
    if (event.value && event.value.title) {
      const imagePath = `images/${event.value.title}.png`;
      console.log("Loading image from:", imagePath);
      loadImage(imagePath).then(() => isLoading.value = false);
    }
  } else {
    console.error("Event does not exist!");
  }

});
</script>
<style lang="scss">
@import '../styles/global.scss';

body, html {
  height: 100%;
  margin: 0;
  overflow-y: auto; // Ensure scrolling is enabled
}
.text-centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: $extra-large-font-size;
  font-weight: $bold-weight;
}
.event-hero {  
  position: relative;
  text-align: center;
  color: white;
  overflow: hidden;
}
</style>
