import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBqoMuKgDDU-Aq-4LKD_WKrfWdtr0eJ8yE",
  authDomain: "chatbud-55cd8.firebaseapp.com",
  projectId: "chatbud-55cd8",
  storageBucket: "chatbud-55cd8.appspot.com",
  messagingSenderId: "27705194223",
  appId: "1:27705194223:web:3b615c46c9e03502898d1a",
  measurementId: "G-V05CERF75M"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;