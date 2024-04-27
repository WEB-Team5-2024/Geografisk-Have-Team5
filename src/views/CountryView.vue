<template>
    <TopNav/>
    <div>
        <div class="container">
        <img :src="imageUrl" alt="Country image">
        <h2 class="centered">{{ country.name }}</h2>
    </div>
    <p>{{ country.description }}</p>
        <div class="buttonContainer">
        <button>Afspil lydbog</button>
        <button v-if="country.name">
      <!-- Ensure country.name is used for origin parameter -->
      <RouterLink :to="{ name: 'plantoverview', params: { origin: country.name } }">
        Liste over planter
      </RouterLink>
    </button>
        </div>
        <div>
            <audio controls>
              <source :src="audioUrl" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
          </div>
    </div>
</template>

<script setup>
    import TopNav from '@/components/TopNav.vue';
    import { ref, onMounted } from 'vue';
    import { useFirebaseStorage } from '@/composables/useFirebaseStorage';
    import { useRoute } from 'vue-router';
    import { db } from '@/firebase'; 
    import { doc, getDoc } from 'firebase/firestore';
    import { useFirebaseAudio } from '@/composables/useFirebaseAudio';
    import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';


    const { audioUrl } = useFirebaseAudio('https://firebasestorage.googleapis.com/v0/b/geografisk-have-webteam5.appspot.com/o/audio%2Fsample.mp3?alt=media&token=994b95b0-0b9e-484e-baba-26d5410475db')
    const route = useRoute();
    const country = ref({ name: '', description: '' });
    const { imageUrl, loadImage } = useFirebaseStorage();
    const areaId = route.params.id; 

    // Firestore document fetch
const fetchCountryData = async (id) => {
  try {
    const docRef = doc(db, 'areas', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Update country data
      country.value = docSnap.data();

      // Now load the image using the country name
      const imagePath = `images/${country.value.name}.png`;
      loadImage(imagePath); // This will update the imageUrl ref
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
};
onMounted(() => {
  fetchCountryData(areaId);
});

// Example usage of loading an audio file (you'd replace the URL with your Firestore data)
//loadAudio('audio/sample.mp3'); // This will update the audioUrl ref
</script>

<style scoped lang="scss">
    @import '@/styles/global.scss';

    a{
        width: 100%;
    }

    button{
        @include button;
        margin-left: auto;
        margin-right: auto;
        
    }

    body{
        background-color: $background-color;
    }

    .buttonContainer {
        display: flex;
        flex-direction: column;
        gap: 30px;
        margin-top: 50px;
    }
    p{
        color: black;
        text-align:center;
       

    }
    a{
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