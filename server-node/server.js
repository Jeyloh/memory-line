const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const next = require('next')
const admin = require('firebase-admin')
const googleapi = require('./googleapi')
const port = parseInt(process.env.PORT, 10) || 3001
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const serverCredentials = require('../src/firebase/credentials/server');
const firebase = admin.initializeApp({
  credential: admin.credential.cert(serverCredentials),
  databaseURL: ''
}, 'server')

app.prepare()
  .then(() => {
    const server = express()

    server.use(bodyParser.json())
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
      req.firebaseServer = firebase
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next()
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
          const calendarListResponse = await googleapi.getCalendarList(accessToken);
          console.log("calendarListResponse: ", calendarListResponse);

          try {
            const events = await googleapi.getCalendarEvents(calendarListResponse.id, accessToken);
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
        // Promise.resolve()
        //   .then(await googleapi.getAccessToken)
        //   .then( res => {
        //     console.log("api/accesstoken: ", res);
        //     return res;
        //   })
        //   .catch( (err) => {
        //     console.log(err)
        //     return err;
        //   })
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
