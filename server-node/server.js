const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const next = require('next')

const calenderController = require('./services/calendar-service')
const memoryController = require('./services/memory-service')
const firebase = require('./firebase-init')

const port = parseInt(process.env.PORT, 10) || 3001
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()


    // server.use(bodyParser.json())
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }));

    server.use(session({
      secret: 'geheimnis',
      saveUninitialized: true,
      store: new FileStore({path: '/tmp/sessions', secret: 'geheimnis'}),
      resave: false,
      rolling: true,
      httpOnly: true,
      cookie: { maxAge: 604800000 } // week
    }))

    server.use((req, res, next) => {
      req.firebaseServer = firebase.initializeApp;
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next()
    })

    server.get('/api/get-async-memory-list/:userId', async (req, res) => {
      try {
        const userId = req.params.userId;
        const list = await memoryController.setupAsyncMemoryList(userId)
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

        const addMemoryResponse = await memoryController.addMemory(newMemoryModel);
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

    server.get('/api/getCalendarList/:access', async (req, res) => {
      if (!req.body) return res.sendStatus(400)
      else {
        try {
          const accessToken = req.params.access;
          const calendarListResponse = await calenderController.getCalendarList(accessToken);
          console.log("calendarListResponse: ", calendarListResponse);

          try {
            const events = await calenderController.getCalendarEvents(calendarListResponse.id, accessToken);
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

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
