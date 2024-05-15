<template>
  <div>
    <!-- Top Navigation -->
    <TopNav />

    <!-- Country Details -->
    <div>
      <div class="container">
        <img :src="imageUrl" alt="Country image" />
        <h2 class="centered">{{ country.name }}</h2>
      </div>
      <p>{{ country.description }}</p>
      <div class="buttonContainer">
        <button @click="toggleAudioPlayer">
          {{ showAudioPlayer ? 'Skjul lydbog' : 'Afspil lydbog' }}
        </button>
        <button v-if="country.name">
          <RouterLink 
            :to="{ 
              name: 'plantoverview', 
              params: { origin: country.name } 
            }">
          Liste over planter
          </RouterLink>
        </button>
      </div>
    </div>

    <AudioPlayer v-if="showAudioPlayer" :src="audioUrl"/>
  
  </div>
</template>

<script setup>
import TopNav from '@/components/TopNav.vue';
import { ref, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';  
import AudioPlayer from '@/components/AudioPlayer.vue';

const route = useRoute();
const country = ref({ name: '', description: '', audioURL: '' });
const imageUrl = ref('');
const audioUrl = ref('');

 const showAudioPlayer = ref(false);

const loadImage = async (imagePath) => {
  try {
    const storage = getStorage();
    const imgRef = storageRef(storage, imagePath);
    imageUrl.value = await getDownloadURL(imgRef);
  } catch (error) {
    console.error("Error loading image:", error);
  }
};

const fetchCountryData = async (id) => {
  try {
    const docRef = doc(db, 'areas', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      country.value = docSnap.data();
      const imagePath = `images/${country.value.name}.png`;
      await loadImage(imagePath);
      audioUrl.value = country.value.audioURL;
      console.log("Audio URL:", audioUrl.value);  // Log audio URL for debugging
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
};

const toggleAudioPlayer = () => {
  showAudioPlayer.value = !showAudioPlayer.value;
};

onMounted(() => {
  fetchCountryData(route.params.id);
});
</script>

<style scoped lang="scss">
@import '@/styles/global.scss';

button {
  @include button;
  margin-left: auto;
  margin-right: auto;
}
.buttonContainer {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 50px;
}
p {
  color: black;
  text-align: center;
}
a {
  margin-left: auto;
  margin-right: auto;
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.container {
  position: relative;
  text-align: center;
  color: white;
}



</style>


