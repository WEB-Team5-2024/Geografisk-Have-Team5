import { defineStore } from 'pinia';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    errorMessage: '',
    isLoggedIn: false,
  }),

  actions: {
    async login(email, password) {
      const auth = getAuth();
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User logged in:', user);
        this.isLoggedIn = true;
        router.push('/admin');
      } catch (error) {
        this.errorMessage = error.message;
        console.error('Login error:', error.message);
      }
    },

    async logout() {
      const auth = getAuth();
      try {
        await signOut(auth);
        this.isLoggedIn = false;
        router.push('/'); // Redirect til landing page
      } catch (error) {
        console.error('Logout error:', error.message);
      }
    },

    clearErrorMessage() {
      this.errorMessage = '';
    },
  },
});
