const calendarService = require('../services/calendar-service')

exports.getAccessToken = async (req, res) => {
  try {
    const accessToken = await calendarService.getAccessToken();
    console.log("accessToken: ", accessToken);
    res.status(200).send({
      accessToken: accessToken
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
exports.getGoogleCalendarEvents = async (req, res) => {
  try {
    const accessToken = req.params.access;
    const calendarListResponse = await calendarService.getCalendarList(accessToken);
    console.log("calendarListResponse: ", calendarListResponse);
    try {
      const events = await calendarService.getCalendarEvents(calendarListResponse.id, accessToken);
      console.log("events: ", events);

      res.status(200).send({
        calendarEvents: events,
        simpleBoolean: true
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}