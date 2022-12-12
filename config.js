import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCT6IFpfhSAmK2sjBScl3SBrLVx9c9GgtI",
    authDomain: "todolist-c170a.firebaseapp.com",
    projectId: "todolist-c170a",
    storageBucket: "todolist-c170a.appspot.com",
    messagingSenderId: "91200862535",
    appId: "1:91200862535:web:353242f09e756e82623462", 
    measurementId: "G-TBBMF5Z0EP"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export{firebase}