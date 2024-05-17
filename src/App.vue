<template>
  <div>
    <!-- her bruger jeg conditional rendering til at vise loadingspinner eller router-view-->
    <template v-if="isLoading">
      <loading-spinner :loading="true" />
    </template>
    <template v-else>
      <router-view />
    </template>
    
  </div>
  <!-- Bottom nav vises alti' alti' -->
  <BottomNav />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import BottomNav from '@/components/bottomNav.vue';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};

console.log(import.meta.env.VUE_APP_FIREBASE_MEASUREMENT_ID)
console.log(process.env.VUE_APP_FIREBASE_MEASUREMENT_ID)

const firebaseApp = initializeApp(firebaseConfig);
const db  = getFirestore(firebaseApp);
 const storage = getStorage(firebaseApp);


const isLoading = ref(true);

const fetchData = async () => {
  // sætter loading til at være "true"
  isLoading.value = true;

  try {
    // 1. API logik skal insættes her
    // For example, if you're using fetch to make an API call:
    // const response = await fetch('your-api-url');
    // const data = await response.json();

    // Remember to replace the above with your actual API call
  } catch (error) {
    console.error("Error fetching data: ", error);
  } finally {
    // 2. når async/await er færdig sættes isloading tilbage til false så router-view componentet vises.
    isLoading.value = false;
  }
};

const router = useRouter();
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if(user) {
    if(router.currentRoute.value.path !== "/admin"){
    }
  } else {
    if(router.currentRoute.value.path !== "/login") {
    }
  }
})

onMounted(() => {
  fetchData();
});
</script>

<style scoped lang="scss">
</style>
