import * as firebase from "firebase";
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc,
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCiPfGYovt6CrqW2SURajJezVXxgm19PmU",
    authDomain: "pluto-d5d86.firebaseapp.com",
    projectId: "pluto-d5d86",
    storageBucket: "pluto-d5d86.appspot.com",
    messagingSenderId: "475587413678",
    appId: "1:475587413678:web:26af2722a2d426106f8f3f",
    measurementId: "G-8DD9JB4454"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;