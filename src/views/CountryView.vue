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
        <button @click="playAudio">Afspil lydbog</button>
        <button v-if="country.name">
          <RouterLink :to="{ name: 'plantoverview', params: { origin: country.name } }">
            Liste over planter
          </RouterLink>
        </button>
      </div>
      
      <!-- Corrected AudioPlayer integration -->
      <div>
        <AudioPlayer :src="audioUrl"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';  // Assuming your Firebase config is exported from this file

import AudioPlayer from '@/components/AudioPlayer.vue';
import TopNav from '@/components/TopNav.vue';

const route = useRoute();
const country = ref({ name: '', description: '', audioURL: '' });
const imageUrl = ref('');
const audioUrl = ref('');

const loadImage = async (imagePath) => {
  try {
    const storage = getStorage();
    const imgRef = storageRef(storage, imagePath);
    imageUrl.value = await getDownloadURL(imgRef);
  } catch (error) {
    console.error("Error loading image:", error);
  }
};

// Fetch country data from Firestore
const fetchCountryData = async (id) => {
  try {
    const docRef = doc(db, 'areas', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      country.value = docSnap.data();
      const imagePath = `images/${country.value.name}.png`;
      await loadImage(imagePath);
      audioUrl.value = country.value.audioUrl;
      console.log("Audio URL:", audioUrl.value);
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
};

onMounted(() => {
  fetchCountryData(route.params.id);
});
</script>

<style scoped lang="scss">
@import '@/styles/global.scss';

a {
  width: 100%;
}

button {
  @include button;
  margin-left: auto;
  margin-right: auto;
}

body {
  background-color: $background-color;
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

.styled-audio-player {
  width: 100%;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #f0f0f0;
}

audio::-webkit-media-controls-panel {
  background-color: #f0f0f0;
  border-radius: 5px;
}

audio::-webkit-media-controls-play-button,
audio::-webkit-media-controls-mute-button,
audio::-webkit-media-controls-volume-slider {
  color: #333;
}
</style>
