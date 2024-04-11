<template>
    <Calendar/>
    <div class="eventCalendar">
      <h2>Event Kalender</h2>
      <div class="eventList">
        <div class="eventItem" v-for="(event, index) in events" :key="index">
          <div class="eventDetails">
            <h3>{{ event.title }}</h3>
            <p>{{ event.description }}</p>
          </div>
          <div class="eventDateTime">
            <p>{{ event.date }}</p>
            <p>{{ event.time }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>

  import Calendar from '@/components/Calendar.vue';
  //json dummydata
  const events = [
    { title: 'Event 1', description: 'Description for Event 1', date: 'April 10, 2024', time: '10:00 AM' },
    { title: 'Event 2', description: 'Description for Event 2', date: 'April 15, 2024', time: '2:00 PM' },
  ];
  </script>
  
  <style scoped>
  .eventCalendar {
    margin-top: 20px;
  }
  
  .eventList {
    display: grid;
    gap: 20px;
  }
  
  .eventItem {
    display: flex;
    justify-content: space-between;
    background: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
  }
  
  .eventDetails {
    flex: 1;
  }
  
  .eventDateTime {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  </style>
  