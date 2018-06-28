const axios = require('axios');
const firebase = require("../firebase-setup/index");


// Use the JWT client to generate an access token.
exports.getCalendarList = (accessToken) => {
  const url = "https://www.googleapis.com/calendar/v3/users/me/calendarList/primary";
  const headers = {
    "Authorization": `Bearer ${accessToken}`
  };
  return new Promise(resolve => {
    axios.get(url, {
        headers: headers
      })
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
  const headers = {
    "Authorization": `Bearer ${accessToken}`
  };
  return new Promise(resolve => {
    axios.get(url, {
        headers: headers
      })
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