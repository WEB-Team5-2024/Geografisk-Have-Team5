<template>
    <div class="register-form">
      <h2>Admin Register</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label>Email:</label>
          <input type="email" v-model="email" required>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" v-model="password" required>
        </div>
        <button type="submit">Register</button>
        
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  
  const email = ref('');
  const password = ref('');
  const errorMessage = ref('');
  
  const submitForm = async () => {
    const auth = getAuth();
    await register(auth);
  };
  
  const register = async (auth) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;
      console.log("Admin registered and logged in:", user);
    } catch (error) {
      errorMessage.value = error.message;
      console.error("Registration error:", error.message);
    }
  };

  </script>
  
  <style>

  </style>