// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAgEKor5QoYFwin8U4I2glnn3xseuR-7mg",
    authDomain: "fitness-6ed77.firebaseapp.com",
    projectId: "fitness-6ed77",
    storageBucket: "fitness-6ed77.appspot.com",
    messagingSenderId:"G-BEQS6KCKGF",
    appId: "1:298933235248:web:e53f634314572a3f5e87f5"
  };

const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);