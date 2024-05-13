<template>
  <div class="eventProgram">
    <div class="eventProgram-title">
      <p>Program</p>
    </div>
    <div class="eventProgram-description">
      <p>{{ program }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const router = useRouter();
const eventId = router.currentRoute.value.params.id;  // Assuming you're using Vue Router to manage routes
const program = ref('Loading...');

onMounted(async () => {
  try {
    const eventDocRef = doc(db, 'events', eventId); // Dynamically use the event ID
    const eventDocSnap = await getDoc(eventDocRef);

    if (eventDocSnap.exists()) {
      const eventData = eventDocSnap.data();
      program.value = eventData.program || 'No program description available';
    } else {
      console.error('Event document does not exist');
      programDescription.value = 'No program information available';
    }
  } catch (error) {
    console.error('Error fetching event data:', error);
    program.value = 'Error loading program information';
  }
});
</script>

<style scoped lang="scss">
@import '../styles/global.scss';
.eventProgram{
    background-color: $secondary-color;
    box-shadow: $drop-shadow-light;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20%;
    height: auto;
    width: 320px;
}
.eventProgram-description{
    font: $primary-font;
    font-size: $extra-small-font-size;
    font-weight: $regular-weight;
    color: $background-color;
    text-align: center;
    padding: 0px 10px 0px 10px;
}
.eventProgram-title{
    font: $primary-font;
    font-size: $large-font-size;
    font-weight: $bold-weight;
    color: $background-color;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>
