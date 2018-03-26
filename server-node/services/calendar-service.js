const axios = require('axios');
const firebase = require("../firebase-init");

//TODO: Implement from here https://firebase.google.com/docs/database/rest/auth


// Use the JWT client to generate an access token.
exports.getAccessToken = () => {
  return new Promise( resolve => {
    firebase.jwtClient.authorize((error, tokens) => {
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