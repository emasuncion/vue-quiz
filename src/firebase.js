import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyA3hreY09rCaG8sqrH0qOb559KsmJ8-r_Y",
    authDomain: "quiz-fc776.firebaseapp.com",
    databaseURL: "https://quiz-fc776.firebaseio.com",
    projectId: "quiz-fc776",
    storageBucket: "quiz-fc776.appspot.com",
    messagingSenderId: "627839169492"
})

export default firebase
