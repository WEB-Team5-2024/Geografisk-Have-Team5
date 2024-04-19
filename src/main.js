import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

const firebaseConfig = {
  apiKey: "AIzaSyDrmtxQRs_dtjJ_aVAWEIeZQNqx9oDhQ2A",
  authDomain: "geografisk-have-webteam5.firebaseapp.com",
  projectId: "geografisk-have-webteam5",
  storageBucket: "geografisk-have-webteam5.appspot.com",
  messagingSenderId: "350894266794",
  appId: "1:350894266794:web:8c3d3487b823536f8873d3",
  measurementId: "G-VDFEE8D343"
};


const firebaseapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseapp);


