<template>
    <div class="julemarkedProgram">
      <div class="julemarkedProgram-titel">
        <p>Program</p>
      </div>
      <div class="julemarkedProgram-beskrivelse">
        <p>{{ programDescription }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { db } from '@/firebase';
  import { doc, getDoc } from 'firebase/firestore';
  
  const programDescription = ref('');
  
  onMounted(async () => {
    try {
      const eventDocRef = doc(db, 'events', 'xp15vc8P4mqdl0iM2t3J'); // Replace 'xp15vc8P4mqdl0iM2t3J' with the actual document ID
      const eventDocSnap = await getDoc(eventDocRef);
  
      if (eventDocSnap.exists()) {
        const eventData = eventDocSnap.data();
        programDescription.value = eventData.programDescription || 'No program description available';
      } else {
        console.error('Event document does not exist');
      }
    } catch (error) {
      console.error('Error fetching event data:', error);
    }
  });
  </script>
  
<style lang="scss" scoped>
@import '../styles/global.scss';
.julemarkedProgram{
    background-color: $secondary-color;
    box-shadow: $drop-shadow;
    border-radius: 10px;

    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20%;
    height: auto;
    width: 320px;
    
}
.julemarkedProgram-beskrivelse{
    font: $primary-font;
    font-size: $extra-small-font-size;
    font-weight: $regular-weight;
    color: $background-color;
    text-align: center;
}
.julemarkedProgram-titel{
    font: $primary-font;
    font-size: $large-font-size;
    font-weight: $bold-weight;
    color: $background-color;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>