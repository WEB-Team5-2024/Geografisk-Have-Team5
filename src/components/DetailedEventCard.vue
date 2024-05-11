<template>
  <div v-if="event" class="event-card">
    <div class="event-card-title">
      <p>{{ event.title }}</p>
    </div>
    <div class="event-card-description">
      <p>{{ event.description }}</p>
    </div>
    <div class="button-container">
      <div class="buy-button"> <p>Køb Billet</p> </div>
    </div>
  </div>
  <div v-else>
    Loading event details...
  </div>
</template>

  
  
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { db } from '@/firebase';
  import { doc, getDoc } from 'firebase/firestore';
  
  const route = useRoute();
  const event = ref(null);
  
  onMounted(async () => {
    const eventID = route.params.id; // Assuming your route has a parameter "id"
    const eventDocRef = doc(db, 'events', eventID);
    try {
      const eventDocSnap = await getDoc(eventDocRef);
      if (eventDocSnap.exists()) {
        event.value = eventDocSnap.data();
      } else {
        console.error('Event document does not exist');
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  });
  </script>
  

  <style lang="scss" scoped>
@import '../styles/global.scss'; // Adjust this path if necessary

.event-card {
  background-color: $secondary-color;
  box-shadow: $drop-shadow;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5%;
  margin-top: 2%;
  height: 200px;
  width: 320px;
}

.event-card-description {
  font: $primary-font;
  font-size: $extra-small-font-size;
  font-weight: $regular-weight;
  color: $background-color;
  text-align: center;
}

.event-card-title {
  font: $primary-font;
  font-size: $large-font-size;
  font-weight: $bold-weight;
  color: $background-color;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
}

.button-container {
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  height: 20%;
}

.buy-button {
  height: 100%;
  width: 100%;
  background-color: #4A4C63;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $background-color;
}
</style>
