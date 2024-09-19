import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar recargar la página

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Inicio de sesión exitoso:', userCredential.user);
            window.location.href = '../dashboard.html'; // Redirigir después del login
        })
        .catch((error) => {
            console.error('Error en el inicio de sesión:', error.message);
            alert('Error: ' + error.message);
        });
});
