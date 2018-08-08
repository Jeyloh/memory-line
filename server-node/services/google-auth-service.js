const firebase = require("../firebase-setup/index");
//TODO: Implement from here https://firebase.google.com/docs/database/rest/auth


// Use the JWT client to generate an access token.
exports.getAccessToken = () => {

  return new Promise(resolve => {
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