<template>
  <div class="login-form-container">
    <h2 class="form-title">Admin Login</h2>
    <form @submit.prevent="submitForm" class="login-form">
      <div class="input-group">
        <label for="email">Email:</label>
        <input id="email" type="email" v-model="email" required>
      </div>
      <div class="input-group">
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="password" required>
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>


<script setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';

const { login, clearErrorMessage } = useAuthStore();
const email = ref('');
const password = ref('');

const submitForm = async () => {
  await login(email.value, password.value);
};

watch([email, password], () => {
  clearErrorMessage();
});
</script>

<style scoped lang="scss">
@import '@/styles/global.scss'; // Ensure this path matches where your global styles are defined

.login-form-container {
  background-color: $background-color;
  padding: 2rem;
  border-radius: $border-radius;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  margin: 50px auto 0;

  .form-title {
    color: $primary-color;  // Use primary color for the title
    font-size: $extra-large-font-size;
    font-weight: $bold-weight;
    text-align: center;
    margin-bottom: 2rem;
  }

  .input-group {
    margin-bottom: 1.5rem;
    
    label {
      display: block;
      color: $primary-color;  
      font-size: $medium-font-size;
      font-weight: $regular-weight;
      margin-bottom: 0.5rem;
    }

    input {
      width: 100%;
      padding: 0.8rem;
      border: none;
      border-radius: $border-radius;
      font-size: $medium-font-size;
      box-shadow: $inner-shadow;
      background: $font-color; 
      color: $primary-color; 
    }
  }

  .login-button {
    width: 100%;
    background-color: $primary-color; 
    color: $font-color;
    padding: 0.8rem;
    font-size: $medium-font-size;
    font-weight: $bold-weight;
    border: none;
    border-radius: $border-radius;
    box-shadow: $btn-shadow;
    cursor: pointer;

    &:hover {
      background-color: darken($primary-color, 10%); 
    }
  }

  .error-message {
    color: #FF6347; 
    font-size: $small-font-size;
    text-align: center;
    margin-top: 1rem;
  }
}
</style>
