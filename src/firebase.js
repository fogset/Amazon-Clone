// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBkroNSEyAsZ15DeMd-VpXgk8KWxj8PXLw",
    authDomain: "clone-11bb6.firebaseapp.com",
    projectId: "clone-11bb6",
    storageBucket: "clone-11bb6.appspot.com",
    messagingSenderId: "457101925045",
    appId: "1:457101925045:web:35ddecf225637231197cfc",
    measurementId: "G-Q6FBBL25S4"
};



if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
