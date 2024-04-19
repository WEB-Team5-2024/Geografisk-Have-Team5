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
  
  <script>
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
        errorMessage: "",
        isLoginMode: true, // Initially, show login form
      };
    },
    methods: {
      submitForm() {
        const auth = getAuth();
        if (this.isLoginMode) {
          this.login(auth);
        } else {
          this.register(auth);
        }
      },
      login(auth) {
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            // Redirect to admin dashboard or perform other actions
            console.log("Admin logged in:", user);
          })
          .catch((error) => {
            const errorMessage = error.message;
            this.errorMessage = errorMessage;
            console.error("Login error:", errorMessage);
          });
      },
      register(auth) {
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed up successfully
            const user = userCredential.user;
            // Redirect to admin dashboard or perform other actions
            console.log("Admin registered and logged in:", user);
          })
          .catch((error) => {
            const errorMessage = error.message;
            this.errorMessage = errorMessage;
            console.error("Registration error:", errorMessage);
          });
      },
      toggleMode() {
        this.isLoginMode = !this.isLoginMode;
        this.errorMessage = ""; // Reset error message when switching modes
      },
    },
  };
  </script>
  
  <style>
  /* Styles remain the same */
  </style>
  