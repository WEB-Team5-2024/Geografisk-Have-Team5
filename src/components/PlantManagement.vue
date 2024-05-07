<template>
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
</template>

<script setup>


import { ref, onMounted, reactive } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const db = getFirestore();

const plants = ref([]);
const isEditingPlant = ref(false);

// Reactive data for plant and event details
const plantData = reactive({
  id: null,
  name: '',
  origin: '',
  description: '',
  image: null,
  imageURL: ''
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

onMounted(async () => {
  await loadInitialData();
});

async function loadInitialData() {
  await loadPlants();
}

async function loadPlants() {
  const querySnapshot = await getDocs(collection(db, 'plants'));
  plants.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

const handlePlantImageChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    plantData.imageURL = await handleFileUpload(file, 'plants');
  }
};

// CRUD Operations for Plants
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

</script>

<style lang="scss">

.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}
</style>