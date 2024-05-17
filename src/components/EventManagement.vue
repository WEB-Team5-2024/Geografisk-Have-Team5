<template lang="">
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
</template>

<script setup>
import { getAuth } from 'firebase/auth';

import { ref, onMounted, reactive } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';


const db = getFirestore();

const areas = ref([]);
const events = ref([]);
const isEditingEvent = ref(false);

const eventData = reactive({
  id: null,
  title: '',
  date: '',
  description: '',
  image: null,
  imageURL: '',
  program: ''
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
  await loadEvents();
}

async function loadAreas() {
  const querySnapshot = await getDocs(collection(db, 'areas'));
  areas.value = querySnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
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

const handleEventImageChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    eventData.imageURL = await handleFileUpload(file, 'events');
  }
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
    Object.assign(
        eventData, 
        {   
            id: null,    
            title: '', 
            date: '', 
            description: '', 
            image: null, 
            imageURL: '', 
            program: '' 
        }
    );
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
  console.log("Received level:", level);  
  const headingLevel = parseInt(level, 10);  
  console.log("Parsed heading level:", headingLevel);

  if (editor && headingLevel > 0 && headingLevel <= 5) {
    editor.chain().focus().setHeading({ level: headingLevel }).run();
  } else {
    editor.chain().focus().setParagraph().run();  
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
    flex-wrap: wrap; 
    justify-content: space-between; 
    gap: 5px;
    margin-bottom: 10px;
    font-size: small;
  }


  .editor-toolbar button,
  .editor-toolbar select {
    flex-basis: calc(25% - 5px); 
    padding: 10px;
    border: none;
    background-color: #E0E0E0;
    border-radius: 4px;
    cursor: pointer;
  }


  .editor-toolbar button.is-active,
  .editor-toolbar select.is-active {
    background-color: #BDBDBD;
  }

  .style-dropdown,
  .align-dropdown {
    flex-basis: calc(25% - 5px); 
  }
}
</style>
