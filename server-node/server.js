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

const firebase = admin.initializeApp({
  credential: admin.credential.cert(require('../src/firebase/credentials/server')),
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

    server.get('/api/accessToken', async (req, res) => {
      if (!req.body) return res.sendStatus(400)
      else {
        const accessToken = await googleapi.getAccessToken();
        console.log(accessToken);
        return accessToken;
        // googleapi.getAccessToken()
        //   .then( res => {
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
