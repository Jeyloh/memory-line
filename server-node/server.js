const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const next = require('next')
const controllers = require('./controllers')

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

    // Initiate controllers
    server.use(controllers.memoryController(server));
    server.use(controllers.calendarController(server))


    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
