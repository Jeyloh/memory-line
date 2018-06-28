const admin = require("firebase-admin");
const google = require("googleapis");

const serviceAccount = require("./credentials");

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://diary-chain.firebaseio.com/"
});

const db = admin.database();

exports = {
  firebaseApp,
  jwtClient,
  db
};
