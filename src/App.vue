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

const isLoading = ref(false);

const fetchData = () => {
  // sætter loading til at være "true"
  isLoading.value = true;
  setTimeout(() => {
    // 1. API logik skal insættes her, istedet for en setTimeOut funktion, skal der laves en async/await function.
    // 2. når async/await er færdig sættes isloading tilbage til false så router-view componentet vises.
    isLoading.value = false;
  }, 0);
};

const router = useRouter();
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if(user) {
    if(router.currentRoute.value.path !== "/admin"){
      // router.push("/admin");
    }
  } else {
    if(router.currentRoute.value.path !== "/login") {
      //router.push("/login");
    }
  }
})

onMounted(() => {
  fetchData();
});
</script>

<style scoped lang="scss">
/* Your scoped styles here */
</style>
