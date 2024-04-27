<template>
  <div>
    
    <VDatePicker v-model="date" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Calendar as VCalendar, DatePicker as VDatePicker } from 'v-calendar';

const date = ref(new Date());
</script>

<style scoped>

</style>
