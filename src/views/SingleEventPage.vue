<template>
  <LoadingSpinner :loading="isLoading"  v-if="isLoading"/>
  <div v-else>
    <TopNav />
    <div class="event-hero">
      <!-- Use the imageUrl directly, ensure it is reactive -->
      <img :src="event?.imageURL || '/default-image.jpg'" alt="Event Image" loading="lazy">
      <div class="text-centered">{{ event ? event.title : 'Loading...' }}</div>
    </div>
    <DetailedEventCard />
    <EventProgram />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
//import { db } from '@/firebase';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import EventProgram from '@/components/EventProgram.vue';
import DetailedEventCard from '@/components/DetailedEventCard.vue';
import TopNav from '@/components/TopNav.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
const db = getFirestore();
const route = useRoute();
const event = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  const eventDocRef = doc(db, 'events', route.params.id);
  const docSnap = await getDoc(eventDocRef);
  if (docSnap.exists()) {
    event.value = docSnap.data();
    console.log("Event data:", event.value);
    isLoading.value = false;  // Assume image URL is directly stored in Firestore and valid
  } else {
    console.error("Event does not exist!");
    isLoading.value = false;
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
