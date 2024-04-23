<template>
    <div class="admin-container">
      <TopNav />
      <h1 class="admin-header">Admin Dashboard</h1>
  
      <!-- Plant Management Section -->
      <section class="admin-section">
        <h2>{{ isEditingPlant ? 'Edit Plant' : 'Add New Plant' }}</h2>
        <form @submit.prevent="isEditingPlant ? updatePlant() : submitPlant()">
          <input type="text" v-model="plantData.name" placeholder="Plant Name" />
          <textarea v-model="plantData.description" placeholder="Plant Description"></textarea>
          <input type="file" @change="handlePlantImageChange" />
          <button type="submit">{{ isEditingPlant ? 'Update Plant' : 'Add Plant' }}</button>
        </form>
        <div v-if="!isEditingPlant">
          <h3>Existing Plants</h3>
          <ul class="items-list">
            <li v-for="plant in plants" :key="plant.id">
              {{ plant.name }} - <button @click="editPlant(plant)">Edit</button>
            </li>
          </ul>
        </div>
      </section>
  
      <!-- Event Management Section -->
      <section class="admin-section">
        <h2>{{ isEditingEvent ? 'Edit Event' : 'Add New Event' }}</h2>
        <form @submit.prevent="isEditingEvent ? updateEvent() : submitEvent()">
          <input type="text" v-model="eventData.title" placeholder="Event Title" />
          <input type="date" v-model="eventData.date" />
          <textarea v-model="eventData.description" placeholder="Event Description"></textarea>
          <input type="file" @change="handleEventImageChange" />
          <button type="submit">{{ isEditingEvent ? 'Update Event' : 'Add Event' }}</button>
        </form>
        <div v-if="!isEditingEvent">
          <h3>Existing Events</h3>
          <ul class="items-list">
            <li v-for="event in events" :key="event.id">
              {{ event.title }} - <button @click="editEvent(event)">Edit</button>
            </li>
          </ul>
        </div>
      </section>
  
      <!-- Location Management Section -->
      <section class="admin-section">
        <h2>{{ isEditingLocation ? 'Edit Location' : 'Add New Location' }}</h2>
        <form @submit.prevent="isEditingLocation ? updateLocation() : submitLocation()">
          <input type="text" v-model="locationData.name" placeholder="Location Name" />
          <textarea v-model="locationData.description" placeholder="Location Description"></textarea>
          <input type="file" @change="handleLocationImageChange" />
          <button type="submit">{{ isEditingLocation ? 'Update Location' : 'Add Location' }}</button>
        </form>
        <div v-if="!isEditingLocation">
          <h3>Existing Locations</h3>
          <ul class="items-list">
            <li v-for="location in locations" :key="location.id">
              {{ location.name }} - <button @click="editLocation(location)">Edit</button>
            </li>
          </ul>
        </div>
      </section>
      <Button @click="signout()">Sign out</Button>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue';
  import TopNav from '@/components/TopNav.vue';
  import {signout} from '../composables/Logout';

  
  // Test Sample data for plants, events, locations
  const plants = ref([{ id: 'p1', name: 'Daisy', description: 'A beautiful flower' }]);
  const events = ref([{ id: 'e1', title: 'Spring Festival', date: '2024-05-01', description: 'Annual spring celebration' }]);
  const locations = ref([{ id: 'l1', name: 'Central Park', description: 'A large public park' }]);
  
  const isEditingPlant = ref(false);
  const isEditingEvent = ref(false);
  const isEditingLocation = ref(false);
  
  const plantData = reactive({ id: null, name: '', description: '', image: null });
  const eventData = reactive({ id: null, title: '', date: '', description: '', image: null });
  const locationData = reactive({ id: null, name: '', description: '', image: null });
  
  // Handle file changes
  const handlePlantImageChange = (event) => { plantData.image = event.target.files[0]; };
  const handleEventImageChange = (event) => { eventData.image = event.target.files[0]; };
  const handleLocationImageChange = (event) => { locationData.image = event.target.files[0]; };
  
  // Submit new items
  const submitPlant = () => { /* Implement plant submission logic */ };
  const submitEvent = () => { /* Implement event submission logic */ };
  const submitLocation = () => { /* Implement location submission logic */ };
  
  // Update existing items
  const updatePlant = () => { /* Implement plant update logic */ };
  const updateEvent = () => { /* Implement event update logic */ };
  const updateLocation = () => { /* Implement location update logic */ };
  
  // Editing existing items
  const editPlant = (plant) => {
    Object.assign(plantData, plant);
    isEditingPlant.value = true;
  };
  const editEvent = (event) => {
    Object.assign(eventData, event);
    isEditingEvent.value = true;
  };
  const editLocation = (location) => {
    Object.assign(locationData, location);
    isEditingLocation.value = true;
  };
  
  // Reset forms
  const resetPlantForm = () => { Object.assign(plantData, { id: null, name: '', description: '', image: null }); isEditingPlant.value = false; };
  const resetEventForm = () => { Object.assign(eventData, { id: null, title: '', date: '', description: '', image: null }); isEditingEvent.value = false; };
  const resetLocationForm = () => { Object.assign(locationData, { id: null, name: '', description: '', image: null }); isEditingLocation.value = false; };
  </script>
  
  <style scoped lang="scss">
  @import '../styles/global.scss';
  
  .admin-container {
    max-width: 800px;
    margin: auto;
    padding: 1rem;
  
    .admin-header {
      text-align: center;
      margin-bottom: 2rem;
    }
  
    .admin-section {
      background-color: #f3f3f3;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
  
      h2 {
        margin-bottom: 1.5rem;
      }
  
      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
  
        input[type="text"],
        input[type="date"],
        input[type="file"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
  
        button {
          padding: 0.5rem 1rem;
          background-color: $primary-color;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
  
          &:hover {
            background-color: darken($primary-color, 10%);
          }
        }
      }
  
      .items-list {
        list-style: none;
        padding: 0;
  
        li {
          margin-bottom: 0.5rem;
          button {
            margin-left: 1rem;
          }
        }
      }
    }
  }
  </style>
  