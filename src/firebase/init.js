import firebase from 'firebase';
import config from "./credentials/client.js"

firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/calendar");
const auth = firebase.auth();
auth.useDeviceLanguage();

const fdb = firebase.database();

export {fdb, auth, provider};

