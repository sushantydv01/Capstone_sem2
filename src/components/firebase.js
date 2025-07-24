// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0KjUKkORopSrWwBQqmlK1IhS4XOh3jI0",
  authDomain: "meal-planner-e5c32.firebaseapp.com",
  projectId: "meal-planner-e5c32",
  storageBucket: "meal-planner-e5c32.firebasestorage.app",
  messagingSenderId: "369269820441",
  appId: "1:369269820441:web:5beb18f3d2a9285891ae88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };