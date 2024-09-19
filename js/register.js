import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar recargar la página

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Registro exitoso:', userCredential.user);
            window.location.href = 'login.php'; // Redirigir después del registro
        })
        .catch((error) => {
            console.error('Error en el registro:', error.message);
            alert('Error: ' + error.message);
        });
});
