import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDgT6YWuCWzA_v7dLsTH6f0R3UpSEeRiQ",
  authDomain: "proyectoecommercedulceatenea.firebaseapp.com",
  projectId: "proyectoecommercedulceatenea",
  storageBucket: "proyectoecommercedulceatenea.firebasestorage.app",
  messagingSenderId: "162947552534",
  appId: "1:162947552534:web:b50396fdc4c1c52cafac37",
  measurementId: "G-W5PP258C63"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
