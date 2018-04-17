require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const helmet = require("helmet");
const FileStore = require("session-file-store")(session);
const path = require("path");
const authRouter = require("./routes/auth-router");
const calendarRouter = require("./routes/calendar-router");
const memoryRouter = require("./routes/memory-router");

const app = express();
const port = parseInt(process.env.PORT) || 5000;
const firebase = require("./firebase-setup/index");

app.get("env");

// Use the static React app as front end
app.use(express.static(path.join(__dirname, "../client-react/build")));

// Setup session
app.use(
  session({
    secret: "geheimnis",
    saveUninitialized: true,
    store: new FileStore({
      path: "/tmp/sessions",
      secret: "geheimnis"
    }),
    resave: false,
    rolling: true,
    httpOnly: true,
    cookie: {
      maxAge: 604800000
    } // week
  })
);

// Initialize firebase
app.use((req, res, next) => {
  req.firebaseServer = firebase.initializeApp;
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Logger middleware
app.use(helmet());

// server.use(bodyParser.json())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Setup routes
app.use("/calendar", calendarRouter);
app.use("/auth", authRouter);
app.use("/memory", memoryRouter);

// Handle other routes
app.get("*", (req, res) => {
  return handle(req, res);
});

// Start app on port
app.listen(port, err => {
  if (err) throw err;
  console.log(
    `> Successfully booted env vars for projectId: ${
      process.env.REACT_APP_PROJECT_ID
    }`
  );
  console.log(`> Ready on http://localhost:${port}`);
});
