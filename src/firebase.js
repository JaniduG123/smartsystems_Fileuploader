import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Verified production Firebase Configuration keys
const firebaseConfig = {
  apiKey: "AIzaSyDH72dByukkvCu6XhrvNjfufvgEXA0Zc3c",
  authDomain: "smartsystems-2dc70.firebaseapp.com",
  projectId: "smartsystems-2dc70",
  storageBucket: "smartsystems-2dc70.firebasestorage.app",
  messagingSenderId: "626823660107",
  appId: "1:626823660107:web:a37f66f7ddffe985d483ce",
  measurementId: "G-R7C1VKFCGZ"
};

// Initialize Firebase App instance
const app = initializeApp(firebaseConfig);

// Export Authentication interfaces
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Add scope settings for profile picture and details
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
