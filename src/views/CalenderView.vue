<template>
  <div class="calendar-view">
    <Calendar :events="events" :date="date" />
    <EventCard :events="events" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Calendar from '@/components/Calender.vue';
import EventCard from '@/components/EventCard.vue';
import 'v-calendar/style.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';


const date = ref(new Date());
const events = ref([]);

// Function to fetch events from Firestore
const fetchEvents = async () => {
  const db = getFirestore();
  const eventsCollectionRef = collection(db, 'events');
  const querySnapshot = await getDocs(eventsCollectionRef);
  events.value = querySnapshot.docs.map(doc => {
    const data = doc.data();
    data.id = doc.id;
    // Adjust date formatting as required
    data.date = data.date && data.date.toDate ? data.date.toDate().toISOString().slice(0, 10) : new Date(data.date).toISOString().slice(0, 10);
    return data;
  });
};

// Lifecycle hook
onMounted(() => {
  fetchEvents();
});
</script>

<style lang="scss">
@import '@/styles/global.scss';

.vc-container {
  width: 100%;
}

.calendar-view {
  max-width: 800px;
  margin: auto;
}

.vc-weeks {
  background-color: $secondary-color;
}

.vc-pane {
  background-color: $secondary-color;
}

.vc-header .vc-title {
  text-decoration: none;
  background-color: $secondary-color;
  color: white;
  font: normal normal normal 16px/25px Poppins;
  letter-spacing: 1.6px;
}

.vc-day-content {
  color: white;
}

.vc-highlight, .vc-state-highlight, .vc-day-content-highlight {
  border: 2px solid white; 
  background-color: transparent !important;
  border-radius: 50%; 
  color: white; 
}

.vc-arrow {
  visibility: hidden;
}
</style>
