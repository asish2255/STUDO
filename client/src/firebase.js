import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_APP.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "ID",
  appId: "APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
