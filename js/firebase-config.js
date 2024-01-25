import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore,doc,collection,getDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDpsVdJ9jC4p644ok6UymgDVYOCqNMZCjo",
    authDomain: "sapvertex-af2bc.firebaseapp.com",
    projectId: "sapvertex-af2bc",
    storageBucket: "sapvertex-af2bc.appspot.com",
    messagingSenderId: "634610367499",
    appId: "1:634610367499:web:17c5312e5ccc2680595b0e"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, storage, auth,doc,collection,getDoc };
