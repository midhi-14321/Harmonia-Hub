import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
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
const database = getDatabase(app);
const auth = getAuth(app);

const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const emailPattern = /^[a-z\d]+@(gmail|yahoo|outlook)+\.(com|in|org|co)$/;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[$%&#@]).{8,16}$/;

  if (!emailPattern.test(email)) {
    alert(
      "Invalid email format! Please use a valid email (e.g., user@gmail.com)."
    );
    return;
  }

  if (!passwordPattern.test(password)) {
    alert(
      "Invalid password format! Password must contain at least:\n" +
        "- 1 lowercase letter\n" +
        "- 1 uppercase letter\n" +
        "- 1 digit\n" +
        "- 1 special character ($, %, &, #, @)\n" +
        "- Length between 8-16 characters."
    );
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      set(ref(database, "users/" + user.uid), {
        email: email,
        password: password,
      });

      alert("Account created successfully!");
      window.location.href = "./login.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert("Error: " + errorMessage);
    });
});
