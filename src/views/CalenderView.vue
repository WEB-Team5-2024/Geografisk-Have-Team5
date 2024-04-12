<template>
  <TopNav/>
  <div class="calendar">
    <h2>{{ monthName }} {{ year }}</h2>
    <div class="daysOfWeek">
      <div v-for="dayOfWeek in daysOfWeek" :key="dayOfWeek" class="dayOfWeek">{{ dayOfWeek }}</div>
    </div>
    <div class="daysGrid">
      <div v-for="day in days" :key="day.date" class="day" @click="selectDay(day)">
        <span>{{ day.day }}</span>
        <div v-if="hasEventsOnDay(day.date)" class="eventIndicator"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopNav from '@/components/TopNav.vue';
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  events: {
    type: Array,
    default: () => []
  }
});



const emit = defineEmits(['day-clicked']);

// Function to get the name of the month from its number
const getMonthName = (month) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[month];
};

// Generate an array of days in the current month
const generateDays = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const days = [];
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({ date: new Date(currentYear, currentMonth, i), day: i });
  }

  // Add placeholders for days of the previous month
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.unshift({ date: null, day: '' });
  }

  // Add placeholders for days of the next month to fill out the grid
  const daysInGrid = 7 * 5; // Assuming a 7x5 grid
  const remainingDays = daysInGrid - days.length;
  for (let i = 0; i < remainingDays; i++) {
    days.push({ date: null, day: '' });
  }

  return days;
};

const monthName = ref(getMonthName(new Date().getMonth()));
const year = ref(new Date().getFullYear());
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const days = ref(generateDays());

function selectDay(day) {
  emit('day-clicked', day.date);
}

function hasEventsOnDay(date) {
  if (!date) return false; // Handle null date gracefully
  return props.events.some(event => new Date(event.date).toDateString() === date.toDateString());
}
</script>

<style scoped lang="scss">
@import '@/styles/global.scss';
.calendar {
  text-align: center;
  padding-top: 70px;
  background-color: $btn-color;
  color: white;
  border-style: none;
  margin-bottom: 100px;
}

.daysOfWeek {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.dayOfWeek {
  width: calc(100% / 7);
  font-weight: bold;
}

.daysGrid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.day {
  padding: 5px;
  position: relative;
  cursor: pointer; /* Add cursor pointer to indicate clickable */
}

.day span {
  display: block;
}

.eventIndicator {
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background-color: #f00; /* Adjust color as needed */
  border-radius: 50%;
}
</style>
