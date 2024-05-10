<template>
  <div class="calendar-view">
    <Calendar :events="events" :date="date" />
    <EventCard :events="events" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Calendar from '@/components/Calender.vue';
import EventCard from '@/components/EventCard.vue';
import 'v-calendar/style.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export default {
  components: {
    Calendar,
    EventCard
  },
  setup() {
    const date = ref(new Date());
    const events = ref([]);

    // Fetch events from Firestore
    async function fetchEvents() {
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
    }

    onMounted(() => {
      fetchEvents();
    });

    return { date, events };
  }
}
</script>

<style>
.vc-container {
  width: 100%;
}

.calendar-view {
  max-width: 800px;
  margin: auto;
}
</style>
