<template>
  <div class="login-form">
    <h2>Admin Login or Register</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" required>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" required>
      </div>
      <button type="submit">{{ isLoginMode ? 'Login' : 'Register' }}</button>
      <button type="button" @click="toggleMode">{{ isLoginMode ? 'Switch to Register' : 'Switch to Login' }}</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoginMode = ref(true); 

const submitForm = () => {
  const auth = getAuth();
  if (isLoginMode.value) {
    login(auth);
  } else {
    register(auth);
  }
};

const login = (auth) => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
  
      const user = userCredential.user;
     
      console.log("Admin logged in:", user);
    })
    .catch((error) => {
      errorMessage.value = error.message;
      console.error("Login error:", error.message);
    });
};

const register = (auth) => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {

      const user = userCredential.user;
    
      console.log("Admin registered and logged in:", user);
    })
    .catch((error) => {
      errorMessage.value = error.message;
      console.error("Registration error:", error.message);
    });
};

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value;
  errorMessage.value = ""; 
};
</script>

<style>

</style>
