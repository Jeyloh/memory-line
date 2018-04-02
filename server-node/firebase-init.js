const admin = require('firebase-admin')
const google = require("googleapis");

const serviceAccount = require('../src/firebase/credentials/admin');

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://diary-chain.firebaseio.com/'
})

const db = admin.database();

// Define the required scopes.
const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/firebase.database",
  "https://www.googleapis.com/auth/calendar"
];

// Authenticate a JWT client with the service account.
const jwtClient = new google.google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  scopes
);


exports = {
  firebaseApp,
  jwtClient,
  db
};