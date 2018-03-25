const google = require("googleapis");
const axios = require('axios');

//TODO: Implement from here https://firebase.google.com/docs/database/rest/auth

// Load the service account key JSON file.
const serviceAccount = require("../src/firebase/credentials/server");

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

// Use the JWT client to generate an access token.
exports.getAccessToken = () => {
  return new Promise( resolve => {
    jwtClient.authorize((error, tokens) => {
      if (error) {
        console.log("Error making request to generate access token:", error);
        return Promise.reject(error);
      } else if (tokens.access_token === null) {
        console.log("Provided service account does not have permission to generate access tokens");
      } else {
        const accessToken = tokens.access_token;
        // See the "Using the access token" section below for information
        // on how to use the access token to send authenticated requests to
        // the Realtime Database REST API.
        console.log("googleapi: " + accessToken)
        resolve(accessToken);
      }
    })
  })
}
// Use the JWT client to generate an access token.
exports.getCalendarList = (accessToken) => {
  const url = "https://www.googleapis.com/calendar/v3/users/me/calendarList/primary";
  const headers = { "Authorization": `Bearer ${accessToken}`};
  return new Promise(resolve => {
    axios.get(url, {headers: headers})
      .then(response => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch(error => {
        console.table(error);
        resolve(error);
      });
  })
}
// Use the JWT client to generate an access token.
exports.getCalendarEvents = (calendarId, accessToken) => {
  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`;
  const headers = { "Authorization": `Bearer ${accessToken}`};
  return new Promise(resolve => {
    axios.get(url, {headers: headers})
      .then(response => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch(error => {
        console.table(error);
        resolve(error);
      });
  })
}