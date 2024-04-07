<template>
  <div>
    <!-- Use conditional rendering to display either the loading spinner or router-view -->
    <template v-if="isLoading">
      <loading-spinner :loading="true" />
    </template>
    <template v-else>
      <router-view />
    </template>
    <!-- Always display BottomNav -->
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import BottomNav from './components/bottomNav.vue';

const isLoading = ref(false);

const fetchData = () => {
  // Simulating app loading
  isLoading.value = true;
  setTimeout(() => {
    // Your API logic should be here
    // When API loading is finished, set isLoading back to false
    isLoading.value = false;
  }, 2000);
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped lang="scss">
/* Your scoped styles here */
</style>
