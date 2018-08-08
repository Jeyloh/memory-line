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