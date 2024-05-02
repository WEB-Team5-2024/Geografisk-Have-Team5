<template>
  <div class="admin-container">
    <TopNav />
    <h1 class="admin-header">Admin Dashboard</h1>

    <!-- Plant Management Section -->
    <section class="admin-section" v-if="editor">
      <h2>{{ isEditingPlant ? 'Edit Plant' : 'Add New Plant' }}</h2>
      <form @submit.prevent="isEditingPlant ? updatePlant() : submitPlant()">
        <input type="text" v-model="plantData.name" placeholder="Plant Name" required />
        <select v-model="plantData.origin" required>
          <option value="">Select Area</option>
          <option v-for="area in areas" :key="area.id" :value="area.name">{{ area.name }}</option>
        </select>

        <!-- Editor Toolbar for Plant Description -->
        <div class="editor-toolbar">
          <div class="style-dropdown">
            <select @change="setStyle(editor, $event.target.value)">
              <option value="">Style</option>
              <option value="bold">Bold</option>
              <option value="italic">Italic</option>
              <option value="underline">Underline</option>
            </select>
          </div>
          <div class="align-dropdown">
            <select @change="setTextAlign(editor, $event.target.value)">
              <option value="">Align</option>
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
          <select @change="setHeadingLevel(editor, $event.target.value)">
            <option value="">Paragraph</option> <!-- Reset to paragraph -->
            <option value="">Heading</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
            <option value="4">Heading 4</option>
            <option value="5">Heading 5</option>
          </select>
        </div>
        <editor-content :editor="editor" />
        
        <textarea v-model="plantData.description" placeholder="palnt description..."></textarea>
        <input type="file" @change="handlePlantImageChange" required />
        <button class="submit-btn">{{ isEditingPlant ? 'Update Plant' : 'Add Plant' }}</button>
      </form>
      <div v-if="!isEditingPlant">
        <h3>Existing Plants</h3>
        <ul class="items-list">
          <li v-for="plant in plants" :key="plant.id">
            {{ plant.name }}
            <div class="button-group">
              <button @click="editPlant(plant)">Edit</button>
              <button @click="deletePlant(plant.id)">Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Event Management Section -->
    <section class="admin-section" v-if="eventEditor">
      <h2>{{ isEditingEvent ? 'Edit Event' : 'Add New Event' }}</h2>
      <form @submit.prevent="isEditingEvent ? updateEvent() : submitEvent()">
        <input type="text" v-model="eventData.title" placeholder="Event Title" required />
        <input type="date" v-model="eventData.date" required />
        <input type="text" v-model="eventData.program" placeholder="Program" required />

        <!-- Editor Toolbar for Event Description -->
        <div class="editor-toolbar">
          <div class="style-dropdown">
            <select @change="setStyle(eventEditor, $event.target.value)">
              <option value="">Style</option>
              <option value="bold">Bold</option>
              <option value="italic">Italic</option>
              <option value="underline">Underline</option>
            </select>
          </div>
          <div class="align-dropdown">
            <select @change="setTextAlign(eventEditor, $event.target.value)">
              <option value="">Align</option>
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
          <select @change="setHeadingLevel(eventEditor, $event.target.value)">
            <option value="">Heading</option>
            <option value="">Paragraph</option> <!-- Reset to paragraph -->
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option> 
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="h5">Heading 5</option>
          </select>
        </div>
        <editor-content :editor="eventEditor" />
        <textarea v-model="eventData.description" placeholder="event description..."></textarea>
        <input type="file" @change="handleEventImageChange" required />
        <button class="submit-btn">{{ isEditingEvent ? 'Update Event' : 'Add Event' }}</button>
      </form>
      <div v-if="!isEditingEvent">
        <h3>Existing Events</h3>
        <ul class="items-list">
          <li v-for="event in events" :key="event.id">
            {{ event.title }}
            <div class="button-group">
              <button @click="editEvent(event)">Edit</button>
              <button @click="deleteEvent(event.id)">Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <button class="signout-button" @click="signout(email)">Sign out</Button>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase';
import TopNav from '@/components/TopNav.vue';
import { signout } from '../composables/Logout';
import { getAuth } from 'firebase/auth';

// Initialize Firestore and other states
const db = getFirestore();
const auth = getAuth();
const areas = ref([]);
const plants = ref([]);
const events = ref([]);
const isEditingPlant = ref(false);
const isEditingEvent = ref(false);
const email = ref(auth.currentUser.email);

// Reactive data for plant and event details
const plantData = reactive({
  id: null,
  name: '',
  origin: '',
  description: '',
  image: null,
  imageURL: ''
});
const eventData = reactive({
  id: null,
  title: '',
  date: '',
  description: '',
  image: null,
  imageURL: '',
  program: ''
});

// Setup TipTap editor for plants
const editor = useEditor({
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ['heading', 'paragraph']
    }),
  ],
  content: '<p>Start typing discription...</p>',
  onUpdate: ({ editor }) => {
    plantData.description = editor.getHTML();
  }
});


// Setup TipTap editor for events
const eventEditor = useEditor({
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ['heading', 'paragraph']
    }),
  ],
  content: '<p>Start typing...</p>',
  onUpdate: ({ editor }) => {
    eventData.description = editor.getHTML();
  }
});

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

// CRUD Operations for Plants and Events
const submitPlant = async () => {
  if (!plantData.description) {
    console.error('Description is missing.');
    return;
  }
  try {
    const newDoc = await addDoc(collection(db, 'plants'), {
      name: plantData.name,
      origin: plantData.origin,
      description: plantData.description,
      imageURL: plantData.imageURL
    });
    plants.value.push({ id: newDoc.id, ...plantData });
    resetPlantForm();
  } catch (error) {
    console.error("Failed to submit plant:", error);
  }
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
    plants.value[index] = { ...plantData };
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
  if (!eventData.description) {
    console.error('Description is missing.');
    return;
  }
  const newDoc = await addDoc(collection(db, 'events'), {
    title: eventData.title,
    date: eventData.date,
    description: eventData.description,
    imageURL: eventData.imageURL,
    program: eventData.program
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
    imageURL: eventData.imageURL,
    program: eventData.program
  });
  const index = events.value.findIndex(e => e.id === eventData.id);
  if (index !== -1) {
    events.value[index] = { ...eventData };
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
  Object.assign(eventData, { id: null, title: '', date: '', description: '', image: null, imageURL: '', program: '' });
  isEditingEvent.value = false;
};

// TipTap editor methods
const setStyle = (editor, style) => {
  if (editor) {
    switch (style) {
      case 'bold':
        editor.chain().focus().toggleBold().run();
        break;
      case 'italic':
        editor.chain().focus().toggleItalic().run();
        break;
      case 'underline':
        editor.chain().focus().toggleUnderline().run();
        break;
      default:
        break;
    }
  }
};

const setTextAlign = (editor, align) => {
  if (editor) {
    editor.chain().focus().setTextAlign(align).run();
  }
};

const setHeadingLevel = (editor, level) => {
  console.log("Received level:", level);  // To check what value is received
  const headingLevel = parseInt(level, 10);  // Ensure the parsing is correct
  console.log("Parsed heading level:", headingLevel);

  if (editor && headingLevel > 0 && headingLevel <= 5) {
    editor.chain().focus().setHeading({ level: headingLevel }).run();
  } else {
    editor.chain().focus().setParagraph().run();  // Fallback to paragraph if no valid level
  }
};





</script>

<style scoped lang="scss">
@import '../styles/global.scss';

.admin-container {
  max-width: 800px;
  margin: auto;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  margin-bottom: 200px;

  .admin-header {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }

  .admin-section {
    margin-bottom: 2rem;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;

    h2 {
      font-size: 18px;
      margin-bottom: 15px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 10px;

      input, select {
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ccc;
      }

      .submit-btn {
        background-color: $primary-color;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
          background-color: darken($primary-color, 10%);
        }
      }
    }

    .items-list {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        .button-group {
          display: flex;
          gap: 5px;
          button {
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            &:first-child {
              background-color: $primary-color;
              color: white;
            }
            &:last-child {
              background-color: #F44336;
              color: white;
            }
            &:hover {
              opacity: 0.8;
            }
          }
        }
      }
    }
  }

  .signout-button {
    display: block;
    width: 100px;
    padding: 10px;
    margin: 20px auto;
    background-color: $primary-color;
    color: white;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: darken(#FF5722, 10%);
    }
  }

  .editor-toolbar {
    display: flex;
    flex-wrap: wrap; /* Allow elements to wrap onto new lines */
    justify-content: space-between; /* Distribute items evenly between rows */
    gap: 5px;
    margin-bottom: 10px;
    font-size: small;
  }

  /* Style for buttons */
  .editor-toolbar button,
  .editor-toolbar select {
    flex-basis: calc(25% - 5px); /* Set the width of each item to 50% with a 5px gap */
    padding: 10px;
    border: none;
    background-color: #E0E0E0;
    border-radius: 4px;
    cursor: pointer;
  }

  /* Style for active items */
  .editor-toolbar button.is-active,
  .editor-toolbar select.is-active {
    background-color: #BDBDBD;
  }

  .style-dropdown,
  .align-dropdown {
    flex-basis: calc(25% - 5px); /* Set the width of each dropdown to 25% with a 5px gap */
  }
}
</style>
