<template>
  <div class="admin-container">
    <TopNav />
    <h2 class="admin-header">Admin Dashboard</h2>
    <PlantManagement/>
    <EventManagement/>
    <AudioUploader/>

    <button class="signout-button" @click="signout(email)">Sign out</Button>
  </div>
</template>

<script setup>
import TopNav from '@/components/TopNav.vue';
import { signout } from '../composables/Logout';
import PlantManagement from '@/components/PlantManagement.vue';
import EventManagement from '@/components/EventManagement.vue';
import AudioUploader from '@/components/AudioUploader.vue';


//mangler audio recorder component: 07-05/24

import { ref } from 'vue';
import { getAuth } from 'firebase/auth';

// Initializer Firestore og andre states
const auth = getAuth();
const email = ref(auth.currentUser.email);
</script>

<style scoped lang="scss">
@import '../styles/global.scss';

.admin-container {
  max-width: 800px;
  margin: auto;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  margin-bottom: 200px;

  .admin-header {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }

  .admin-section {
    margin-bottom: 2rem;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;

    h2 {
      font-size: 18px;
      margin-bottom: 15px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 10px;

      input, select {
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ccc;
      }

      .submit-btn {
        background-color: $primary-color;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
          background-color: darken($primary-color, 10%);
        }
      }
    }

    .items-list {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        .button-group {
          display: flex;
          gap: 5px;
          button {
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            &:first-child {
              background-color: $primary-color;
              color: white;
            }
            &:last-child {
              background-color: #F44336;
              color: white;
            }
            &:hover {
              opacity: 0.8;
            }
          }
        }
      }
    }
  }

  .signout-button {
    display: block;
    width: 100px;
    padding: 10px;
    margin: 20px auto;
    background-color: $primary-color;
    color: white;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: darken(#FF5722, 10%);
    }
  }

  .editor-toolbar {
    display: flex;
    flex-wrap: wrap; 
    justify-content: space-between; 
    gap: 5px;
    margin-bottom: 10px;
    font-size: small;
  }

  /* Style for buttons */
  .editor-toolbar button,
  .editor-toolbar select {
    flex-basis: calc(25% - 5px); 
    padding: 10px;
    border: none;
    background-color: #E0E0E0;
    border-radius: 4px;
    cursor: pointer;
  }

  /* Style for active items */
  .editor-toolbar button.is-active,
  .editor-toolbar select.is-active {
    background-color: #BDBDBD;
  }

  .style-dropdown,
  .align-dropdown {
    flex-basis: calc(25% - 5px); 
  }
}
</style>
