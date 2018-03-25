import firebase from 'firebase';
import config from "./credentials/client"

firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/calendar");
const auth = firebase.auth();
auth.useDeviceLanguage();

const fdb = firebase.database();
const memories = firebase.database().ref('memories');
const users = firebase.database().ref('users');

export {fdb, auth, provider};

