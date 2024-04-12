<template>
  <Calendar :date="date" />
</template>

<script setup>
import { ref } from 'vue'; 
import { Calendar } from 'v-calendar';
import 'v-calendar/style.css';

const date = ref(new Date());
</script>

