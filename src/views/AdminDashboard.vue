<template>
  <div class="admin-container">
    <TopNav />
    <h1 class="admin-header">Admin Dashboard</h1>

    <!-- Plant Management Section -->
    <section class="admin-section">
      <h2>{{ isEditingPlant ? 'Edit Plant' : 'Add New Plant' }}</h2>
      <form @submit.prevent="isEditingPlant ? updatePlant() : submitPlant()">
        <input type="text" v-model="plantData.name" placeholder="Plant Name" required />
        <select v-model="plantData.origin" required>
          <option value="">Select Area</option>
          <option v-for="area in areas" :key="area.id" :value="area.name">{{ area.name }}</option>
        </select>
        <quill-editor v-model="plantData.description" placeholder="Plant Description" required />
        <input type="file" @change="handlePlantImageChange" required />
        <button type="submit">{{ isEditingPlant ? 'Update Plant' : 'Add Plant' }}</button>
      </form>
      <div v-if="!isEditingPlant">
        <h3>Existing Plants</h3>
        <ul class="items-list">
          <li v-for="plant in plants" :key="plant.id">
            {{ plant.name }} - 
            <button @click="editPlant(plant)">Edit</button>
            <button @click="deletePlant(plant.id)">Delete</button>
          </li>
        </ul>
      </div>
    </section>

    <!-- Event Management Section -->
    <section class="admin-section">
      <h2>{{ isEditingEvent ? 'Edit Event' : 'Add New Event' }}</h2>
      <form @submit.prevent="isEditingEvent ? updateEvent() : submitEvent()">
        <input type="text" v-model="eventData.title" placeholder="Event Title" required />
        <input type="date" v-model="eventData.date" required />
        <quill-editor v-model="eventData.description" placeholder="Event Description" required />

        <input type="file" @change="handleEventImageChange" required />
        <button type="submit">{{ isEditingEvent ? 'Update Event' : 'Add Event' }}</button>
      </form>
      <div v-if="!isEditingEvent">
        <h3>Existing Events</h3>
        <ul class="items-list">
          <li v-for="event in events" :key="event.id">
            {{ event.title }} - 
            <button @click="editEvent(event)">Edit</button>
            <button @click="deleteEvent(event.id)">Delete</button>
          </li>
        </ul>
      </div>
    </section>

    <Button class="signout-button" @click="signout()">Sign out</Button>
  </div>
</template>



<script setup>
import { QuillEditor } from '@vueup/vue-quill';
import 'quill/dist/quill.core.css'; // import quill core styles
import 'quill/dist/quill.snow.css'; // import quill theme styles
import 'quill/dist/quill.bubble.css'; // (optional) import bubble theme styles
import { reactive, ref, onMounted } from 'vue';
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase'; 
import TopNav from '@/components/TopNav.vue';
import { signout } from '../composables/Logout';

const db = getFirestore();
const areas = ref([]);
const plants = ref([]);
const events = ref([]);
const isEditingPlant = ref(false);
const isEditingEvent = ref(false);
const plantData = reactive({ id: null, name: '', origin: '', description: '', image: null, imageURL: '' });
const eventData = reactive({ id: null, title: '', date: '', description: '', image: null, imageURL: '' });

onMounted(async () => {
  await loadInitialData();
});

async function loadInitialData() {
  await loadAreas();
  await loadPlants();
  await loadEvents();
}

async function loadAreas() {
  const querySnapshot = await getDocs(collection(db, 'areas'));
  areas.value = querySnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
}

async function loadPlants() {
  const querySnapshot = await getDocs(collection(db, 'plants'));
  plants.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function loadEvents() {
  const querySnapshot = await getDocs(collection(db, 'events'));
  events.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function handleFileUpload(file, path) {
  if (!file) {
    console.error('No file selected');
    return;
  }
  const fileRef = storageRef(storage, `${path}/${file.name}`);
  const snapshot = await uploadBytes(fileRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

const handlePlantImageChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    plantData.imageURL = await handleFileUpload(file, 'plants');
  }
};

const handleEventImageChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    eventData.imageURL = await handleFileUpload(file, 'events');
  }
};

// CRUD Operations for Plants
const submitPlant = async () => {
  if (!plantData) {
    console.error('No image URL provided.');
    return;
  }
  const newDoc = await addDoc(collection(db, 'plants'), {
    name: plantData.name,
    origin: plantData.origin,
    description: plantData.description,
    imageURL: plantData.imageURL
  });
  plants.value.push({ id: newDoc.id, ...plantData });
  resetPlantForm();
};

const updatePlant = async () => {
  if (!plantData.id) return;
  await updateDoc(doc(db, 'plants', plantData.id), {
    name: plantData.name,
    origin: plantData.origin,
    description: plantData.description,
    imageURL: plantData.imageURL
  });
  const index = plants.value.findIndex(p => p.id === plantData.id);
  if (index !== -1) {
    plants.value[index] = {...plantData};
  }
  resetPlantForm();
};

const deletePlant = async (plantId) => {
  await deleteDoc(doc(db, 'plants', plantId));
  plants.value = plants.value.filter(p => p.id !== plantId);
};

const editPlant = (plant) => {
  Object.assign(plantData, plant);
  isEditingPlant.value = true;
};

const resetPlantForm = () => {
  Object.assign(plantData, { id: null, name: '', origin: '', description: '', image: null, imageURL: '' });
  isEditingPlant.value = false;
};

// CRUD Operations for Events
const submitEvent = async () => {
  if (!eventData) {
    console.error('No image URL provided.');
    return;
  }
  const newDoc = await addDoc(collection(db, 'events'), {
    title: eventData.title,
    date: eventData.date,
    description: eventData.description,
    imageURL: eventData.imageURL
  });
  events.value.push({ id: newDoc.id, ...eventData });
  resetEventForm();
};

const updateEvent = async () => {
  if (!eventData.id) return;
  await updateDoc(doc(db, 'events', eventData.id), {
    title: eventData.title,
    date: eventData.date,
    description: eventData.description,
    imageURL: eventData.imageURL
  });
  const index = events.value.findIndex(e => e.id === eventData.id);
  if (index !== -1) {
    events.value[index] = {...eventData};
  }
  resetEventForm();
};

const deleteEvent = async (eventId) => {
  await deleteDoc(doc(db, 'events', eventId));
  events.value = events.value.filter(e => e.id !== eventId);
};

const editEvent = (event) => {
  Object.assign(eventData, event);
  isEditingEvent.value = true;
};

const resetEventForm = () => {
  Object.assign(eventData, { id: null, title: '', date: '', description: '', image: null, imageURL: '' });
  isEditingEvent.value = false;
};
</script>


  
 
  
  
  <style scoped lang="scss">
  @import '../styles/global.scss';
  
  .admin-container {
    max-width: 800px;
    margin: auto;
    padding: 1rem;
    padding-bottom: 1000px;
  
    .admin-header {
      text-align: center;
      margin-bottom: 2rem;
    }
  
    .admin-section {
      background-color: #f3f3f3;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
  
      h2 {
        margin-bottom: 1.5rem;
      }
  
      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
  
        input[type="text"],
        input[type="date"],
        input[type="file"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
  
        button {
          padding: 0.5rem 1rem;
          background-color: $primary-color;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
  
          &:hover {
            background-color: darken($primary-color, 10%);
          }
        }
      }
  
      .items-list {
        list-style: none;
        padding: 0;
        li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5rem;

        .edit-button, .delete-button {
        
          font-weight: $bold-weight;
          margin: 0 0.5rem;
          text-align: center;
          align-items: center;

          &:hover {
            background-color: darken($secondary-color, 10%);
          }
        }

        .delete-button {
          background-color: $btn-color;
        }
      }
    }
  }

  .signout-button {
    @include button;
    display: block;
    width: 100px;
    margin: 2rem auto;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: darken($btn-color, 10%);
    }
  }
}
  </style>
  