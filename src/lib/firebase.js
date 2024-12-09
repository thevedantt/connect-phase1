import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";  // Import Firebase Storage

// Replace these with your actual Firebase project config values
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY || "your-api-key",  // Added fallback for env variable
  authDomain: "your-auth-domain.firebaseapp.com",
  projectId: "exaconnect-8c4b7",
  storageBucket: "exaconnect-8c4b7.appspot.com",  // Correct storage bucket URL
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID || "your-messaging-sender-id",  // Added fallback
  appId: import.meta.env.VITE_APP_ID || "your-app-id",  // Added fallback
  measurementId: import.meta.env.VITE_MEASUREMENT_ID || "your-measurement-id",  // Added fallback
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth, Firestore, and Firebase Storage instances
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);  // Export Firebase Storage
