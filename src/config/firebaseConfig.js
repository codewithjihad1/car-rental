import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3bSJ-_z-UM5TjuUXM2ZUYe4FKx8iw2r4",
    authDomain: "car-rental-c9294.firebaseapp.com",
    projectId: "car-rental-c9294",
    storageBucket: "car-rental-c9294.firebasestorage.app",
    messagingSenderId: "614949256971",
    appId: "1:614949256971:web:7b991c19fa6c7d0eee6c0e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);