<template>
    <div class="spinner-container" v-if="loading">
      <div class="spinner"></div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    loading: {
      type: Boolean,
      required: true
    }
  });
  </script>
  
  <style lang="scss">
  @import '../styles/global.scss';
  
  .spinner-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* Ensures it's on top of other content */
  }
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 3px solid #f3f3f3;
    border-radius: 50%;
    border-top: 3px solid #61805b;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  