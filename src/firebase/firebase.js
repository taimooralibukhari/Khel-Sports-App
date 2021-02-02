import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyAbtq4lk7wUaUorDIcI3zh-ndpHRAJrKzo",
    authDomain: "khel-sports-app.firebaseapp.com",
    databaseURL: "https://khel-sports-app.firebaseio.com",
    projectId: "khel-sports-app",
    storageBucket: "khel-sports-app.appspot.com",
    messagingSenderId: "819237749663",
    appId: "1:819237749663:web:5ec92588b94705304473aa",
    measurementId: "G-3K3GPSR4SD"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database()


const googleAuthProvider = new firebase.auth.GoogleAuthProvider()


export {firebase, googleAuthProvider, database as default}
