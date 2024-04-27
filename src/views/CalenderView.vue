<template>
  <div class="calender-view">
    <Calendar :events="events" :date="date" />
    <EventCard />
  </div>
</template>

<script>
import Calendar from '@/components/Calender.vue';
import EventCard from '@/components/EventCard.vue';
import 'v-calendar/style.css';

export default {
  components: {
    Calendar,
    EventCard
  },
  data() {
    return {
      date: new Date(),
      events: []
    };
  },
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
