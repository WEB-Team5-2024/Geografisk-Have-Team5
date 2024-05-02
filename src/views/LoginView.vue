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
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import router from '@/router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const submitForm = async () => {
  const auth = getAuth();
  await login(auth);
};

// Login function
const login = async (auth) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;
    console.log("Admin logged in:", user);
    router.push("/admin");
  } catch (error) {
    errorMessage.value = error.message;
    console.error("Login error:", error.message);
  }
};


</script>

<style>
/* Styles remain the same */
</style>
