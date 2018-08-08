const admin = require("firebase-admin");
const google = require("googleapis");

const serviceAccount = require("./credentials");


// Define the required scopes.
const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/firebase.database",
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/photoslibrary.sharing"
];

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://diary-chain.firebaseio.com/"
});

// Authenticate a JWT client with the service account.
const jwtClient = new google.google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  scopes
);

const db = admin.database();

module.exports = {
  firebaseApp,
  jwtClient,
  db
};
