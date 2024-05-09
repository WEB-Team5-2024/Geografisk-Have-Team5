<template>
  <div>
    <VDatePicker 
      v-model="date"
      :attributes="attrs"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { DatePicker as VDatePicker } from 'v-calendar';

const props = defineProps({
  events: Array 
});

const date = ref(new Date());

const attrs = computed(() => {
  return props.events.map(event => ({
    key: event.date,
    highlight: {
      class: 'event-highlight',
    },
    dates: event.date, 
  }));
});

</script>

<style scoped>
.event {
  background-color: #ffecb3; 
}
</style>
