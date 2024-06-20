// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAgEKor5QoYFwin8U4I2glnn3xseuR-7mg",
    authDomain: "fitness-6ed77.firebaseapp.com",
    projectId: "fitness-6ed77",
    storageBucket:"298933235248",
    messagingSenderId:"fitness-6ed77.appspot.com",
    appId: "1:298933235248:web:e53f634314572a3f5e87f5",
    measurementId: "G-BEQS6KCKGF"
  };

const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);

