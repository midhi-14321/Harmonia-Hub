import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCf4flEa33jFfQPNsqwx9x85U3q2J_3y5c",
  authDomain: "harmonia-hub.firebaseapp.com",
  projectId: "harmonia-hub",
  storageBucket: "harmonia-hub.firebasestorage.app",
  messagingSenderId: "106965962398",
  appId: "1:106965962398:web:1701b9e178c106cc7ef58f",
  measurementId: "G-Y1RPMTRD0Z",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginButton = document.getElementById("login");
loginButton.addEventListener("click", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const emailPattern = /^[a-z\d]+@(gmail|yahoo|outlook)+\.(com|in|org|co)$/;

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address (e.g., user@gmail.com).");
    return;
  }

  if (!password) {
    alert("Please enter your password.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login successful!");
      window.location.href = "./product.html";
    })
    .catch((error) => {
      const errorCode = error.code;

      if (errorCode === "auth/user-not-found") {
        alert("User not found. Please register first.");
      } else if (errorCode === "auth/wrong-password") {
        alert("Password is incorrect. Please try again.");
      } else {
        alert("An error occurred: " + error.message);
      }
    });
});
const reset = document.getElementById("reset");
reset.addEventListener("click", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
      alert("Email sent");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert(errorMessage);
    });
});
