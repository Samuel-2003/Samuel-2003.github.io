import { auth } from '../login/firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

let isLoginMode = true;
const form = document.getElementById('auth-form');
const toggleModeBtn = document.getElementById('toggle-mode');
const submitBtn = document.getElementById('submit-btn');
const registerFields = document.getElementById('register-fields');

toggleModeBtn.addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    registerFields.style.display = isLoginMode ? 'none' : 'block';
    submitBtn.textContent = isLoginMode ? 'Iniciar Sesión' : 'Registrarse';
    toggleModeBtn.textContent = isLoginMode ? 'Cambiar a Registro' : 'Cambiar a Inicio de Sesión';
    form.classList.add(isLoginMode ? 'slide-in' : 'slide-out');
    setTimeout(() => form.classList.remove('slide-in', 'slide-out'), 500);
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (isLoginMode) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Inicio de sesión exitoso:', userCredential.user);
                window.location.href = '../dashboard.html'; // Redirigir después del login
            })
            .catch((error) => {
                console.error('Error en el inicio de sesión:', error.message);
                alert('Error: ' + error.message);
            });
    } else {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Registro exitoso:', userCredential.user);
                alert("Registro exitoso");
                // Aquí puedes guardar los datos adicionales en Firestore si es necesario
                window.location.href = '../dashboard.html'; // Redirigir después del registro
            })
            .catch((error) => {
                console.error('Error en el registro:', error.message);
                alert('Error: ' + error.message);
            });
    }
});

document.getElementById('google-auth').addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log('Inicio de sesión con Google exitoso:', result.user);
            window.location.href = '../dashboard.html'; // Redirigir después del login con Google
        })
        .catch((error) => {
            console.error('Error en el inicio de sesión con Google:', error.message);
            alert('Error: ' + error.message);
        });
});

document.getElementById('phone-auth').addEventListener('click', () => {
    const phoneNumber = prompt("Ingrese su número de teléfono con código de país:");
    if (phoneNumber) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'phone-auth', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        });

        signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                const verificationCode = prompt("Ingrese el código de verificación:");
                return confirmationResult.confirm(verificationCode);
            })
            .then((result) => {
                console.log('Inicio de sesión con teléfono exitoso:', result.user);
                window.location.href = '../dashboard.html'; // Redirigir después del login con teléfono
            })
            .catch((error) => {
                console.error('Error en el inicio de sesión con teléfono:', error.message);
                alert('Error: ' + error.message);
            });
    }
});
