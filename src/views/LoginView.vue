<template>
  <div class="login-form">
    <h2>Admin Login</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" required>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
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

<style>

</style>
