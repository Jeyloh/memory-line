import firebase from 'firebase';
import config from "./credentials/client"

firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth()
auth.useDeviceLanguage();

const fdb = firebase.database();
const routines = firebase.database().ref('routines');
const users = firebase.database().ref('users');

export {fdb, auth, provider};

