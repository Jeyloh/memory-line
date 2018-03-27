const calendarService = require('./services/calendar-service')
const memoryService = require('./services/memory-service')


exports.memoryController = server => {
  server.get('/api/get-async-memory-list/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const list = await memoryService.setupAsyncMemoryList(userId)
      console.log("success! list: ", list)
      res.status(200).send({
        memoryList: list
      })
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  })

  server.post('/api/add-memory/:userId', async (req, res) => {
    if (!req.body) return res.sendStatus(400)

    try {
      console.log(req.body);
      const requestBody = req.body;
      console.log(req.params.userId);
      const newMemoryModel = {
        ...requestBody,
        userId: req.params.userId
      };
      console.log("---- body ");
      console.log(newMemoryModel);

      const addMemoryResponse = await memoryService.addMemory(newMemoryModel);
      console.log("response: ", addMemoryResponse);
      res.status(200).send({
        message: "Memory was added"
      })
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  })

  server.post('/api/login', (req, res) => {
    if (!req.body) return res.sendStatus(400)

    const token = req.body.token
    console.log(token);
    firebase.auth().verifyIdToken(token)
      .then((decodedToken) => {
        req.session.decodedToken = decodedToken
        return decodedToken
      })
      .then((decodedToken) => res.json({ status: true, decodedToken }))
      .catch((error) => res.json({ error }))
  })

}

exports.calendarController = server => {
  server.get('/api/getAccessToken', async (req, res) => {
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
  })

  server.get('/api/getGoogleCalendarEvents/:access', async (req, res) => {
    if (!req.body) return res.sendStatus(400)
    else {
      try {
        const accessToken = req.params.access;
        const calendarListResponse = await calendarService.getCalendarList(accessToken);
        console.log("calendarListResponse: ", calendarListResponse);

        try {
          const events = await calendarService.getCalendarEvents(calendarListResponse.id, accessToken);
          console.log("events: ", events);

          res.status(200).send({
            calendarEvents: events,
            sendHvafaenDuVil: true
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
  })
}

