import {firebase, googleAuthProvider} from '../firebase/firebase'

export const googleSignIn = () => {
    firebase.auth().signInWithPopup(googleAuthProvider)
}

export const googleSignOut = () => {
    firebase.auth().signOut()
}