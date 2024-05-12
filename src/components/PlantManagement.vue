<template>
  <section class="admin-section" v-if="editor">
    <h2>{{ isEditingPlant ? 'Edit Plant' : 'Add New Plant' }}</h2>
    <form @submit.prevent="isEditingPlant ? updatePlant() : submitPlant()">
      <input type="text" v-model="plantData.name" placeholder="Plant Name" required />
      
      <select v-model="plantData.origin" required>
        <option value="">Select Origin</option>
        <option v-for="area in areas" :key="area.id" :value="area.name">{{ area.name }}</option>
      </select>

      <editor-content :editor="editor" />
      <textarea v-model="plantData.description" placeholder="Plant description..."></textarea>
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
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const db = getFirestore();
const storage = getStorage();
const plants = ref([]);
const areas = ref([]);
const isEditingPlant = ref(false);
const plantData = reactive({
  id: null,
  name: '',
  origin: '',
  description: '',
  image: null,
  imageURL: ''
});

const editor = useEditor({
  extensions: [StarterKit, TextAlign.configure({ types: ['heading', 'paragraph'] })],
  content: '<p>Start typing description...</p>',
  onUpdate: ({ editor }) => {
    plantData.description = editor.getHTML();
  }
});

onMounted(async () => {
  await fetchAreas();
  await loadPlants();
});

async function fetchAreas() {
  const querySnapshot = await getDocs(collection(db, 'areas'));
  areas.value = querySnapshot.docs.map(doc => doc.data());
}

async function loadPlants() {
  const querySnapshot = await getDocs(collection(db, 'plants'));
  plants.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

const handlePlantImageChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageRef = storageRef(storage, `plants/${file.name}`);
    await uploadBytes(imageRef, file);
    plantData.imageURL = await getDownloadURL(imageRef);
  }
};

const submitPlant = async () => {
  if (!plantData.description || !plantData.imageURL) {
    console.error('Description or image URL is missing.');
    return;
  }
  try {
    const newDocRef = await addDoc(collection(db, 'plants'), {
      name: plantData.name,
      origin: plantData.origin,
      description: plantData.description,
      imageURL: plantData.imageURL
    });
    plants.value.push({ id: newDocRef.id, ...plantData });
    resetPlantForm();
  } catch (error) {
    console.error("Failed to submit plant:", error);
  }
};

const updatePlant = async () => {
  if (!plantData.id) return;
  await updateDoc(doc(db, 'plants', plantData.id), plantData);
  const index = plants.value.findIndex(p => p.id === plantData.id);
  plants.value[index] = { ...plantData };
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