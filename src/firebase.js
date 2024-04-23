// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import getStorage

const firebaseConfig = {
  apiKey: "AIzaSyDrmtxQRs_dtjJ_aVAWEIeZQNqx9oDhQ2A",
  authDomain: "geografisk-have-webteam5.firebaseapp.com",
  projectId: "geografisk-have-webteam5",
  storageBucket: "geografisk-have-webteam5.appspot.com",
  messagingSenderId: "350894266794",
  appId: "1:350894266794:web:8c3d3487b823536f8873d3",
  measurementId: "G-VDFEE8D343"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp); // Initialize storage

export { db, storage }; // Export storage
