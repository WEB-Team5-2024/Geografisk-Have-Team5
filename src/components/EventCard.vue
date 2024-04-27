<template>
    <div class="event-box" v-for="event in events" :key="event.id">
      <img :src="event.imageUrl" alt="Event image" class="event-image"/>
      <div class="event-details">
        <h3>{{ event.title }}</h3>
        <p>{{ event.description }}</p>
        <p>{{ event.date ? event.date.toDateString() : '' }}</p>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getFirestore, collection, getDocs } from 'firebase/firestore';
  import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
  
  const db = getFirestore();
  const storage = getStorage();
  const events = ref([]);
  
  onMounted(async () => {
  const eventsCollectionRef = collection(db, 'events');
  const querySnapshot = await getDocs(eventsCollectionRef);
  const eventsData = await Promise.all(querySnapshot.docs.map(async doc => {
    const data = doc.data();
    data.id = doc.id;

    // Convert the Firestore timestamp to a JavaScript Date object
    if (data.date && data.date.toDate) { // assuming 'date' is a Firestore Timestamp
      data.date = data.date.toDate();
    } else if (data.date) { // if 'date' is a string
      data.date = new Date(data.date);
    }

    if (data.imageURL) {
      const imageRef = storageRef(storage, data.imageURL);
      data.imageUrl = await getDownloadURL(imageRef);
    }
    return data;
  }));

  events.value = eventsData;
});
  </script>
  
  <style scoped>
  .event-box {
    display: flex;
    background-color: #6C6E83;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    padding: 20px;
  }
  
  .event-image {
    width: 120px;
    height: 120px;
    border-radius: 10px;
    margin-right: 20px;
  }
  
  .event-details h3 {
    margin: 0;
    color: white;
    font-weight: bold;
  }
  
  .event-details p {
    margin: 5px 0;
    color: white;
  }
  </style>
  