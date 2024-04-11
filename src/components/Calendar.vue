<template>
    <div class="calendar">
      <h2>{{ monthName }} {{ year }}</h2>
      <div class="daysOfWeek">
        <div v-for="day in daysOfWeek" :key="day" class="dayOfWeek">{{ day }}</div>
      </div>
      <div class="daysGrid">
        <div v-for="day in days" :key="day.date" class="day">{{ day.day }}</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Function to get the name of the month from its number
  const getMonthName = (month) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
  };
  
  // Get the current date
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Generate an array of days in the month
  const generateDays = (month, year) => {
    const days = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: i, day: i });
    }
    
    // Add placeholders for days of the previous month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.unshift({ date: 0, day: '' });
    }
    
    // Add placeholders for days of the next month to fill out the grid
    const daysInGrid = 7 * 5; // Assuming a 7x5 grid
    const remainingDays = daysInGrid - days.length;
    for (let i = 0; i < remainingDays; i++) {
      days.push({ date: 0, day: '' });
    }
    
    return days;
  };
  
  const monthName = ref(getMonthName(currentMonth));
  const year = ref(currentYear);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days = ref(generateDays(currentMonth, currentYear));
  </script>
  
  <style scoped>
  .calendar {
    text-align: center;
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
    border: 1px solid #ddd;
    padding: 5px;
  }
  </style>
  