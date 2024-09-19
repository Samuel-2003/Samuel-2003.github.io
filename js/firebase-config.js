// firebase-config.js
// Importa las funciones necesarias
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Configuración de tu aplicación web de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA4bY0PZ7UZ8uWQycbHlgFwoFN5MMRZVU8",
    authDomain: "lineablanca-5d28d.firebaseapp.com",
    projectId: "lineablanca-5d28d",
    storageBucket: "lineablanca-5d28d.appspot.com",
    messagingSenderId: "297441304190",
    appId: "1:297441304190:web:958028385de2e80f28c22f",
    measurementId: "G-GTP0E7CBLC"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Inicializa la autenticación

export { auth }; // Exporta la instancia de autenticación
