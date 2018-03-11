const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.use(bodyParser.json())

  server.post('/api/login', (req, res) => {
    if (!req.body) return res.sendStatus(400)

    const token = req.body.token
    //TODO: Add request calls here vs. AWS API Rest?

  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
