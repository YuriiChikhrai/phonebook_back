require("./checkEnv");

const { join } = require("path");
const express = require("express");
const mongoose = require("mongoose");
const { isCelebrateError } = require("celebrate");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const nunjucks = require("nunjucks");
const passport = require("passport");
const { Strategy } = require("passport-local");

const { PORT, mongodb } = require("./config");
const config = require("./config");
const { isAuthorized } = require("./api/v1/middlewares");
const {
  compareUserPassword,
  getUserData,
} = require("./api/v1/user/user.service");

mongoose.connect(mongodb.uri, mongodb.options);
mongoose.set("debug", process.env.NODE_ENV !== "prod");

passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      // passReqToCallback: true,
    },
    async (email, password, cb) => {
      try {
        const user = await compareUserPassword(email, password);
        cb(null, user);
      } catch (e) {
        cb(e);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser(async (userId, cb) => {
  try {
    const user = await getUserData(userId);
    cb(null, user);
  } catch (e) {
    cb(e);
  }
});

const app = express();

nunjucks.configure(join(__dirname, "templates"), {
  autoescape: true,
  express: app,
  watch: true,
});

app.use(express.json());
app.use(cookieParser());
app.use(
  compression({
    level: 5,
  })
);

app.use(
  session({
    secret: config.cookieSecret,
    name: "token",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      signed: true,
      maxAge: 150000,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      dbName: "sessions",
      collectionName: "phonebook_sessions",
      stringify: false,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", isAuthorized, (req, res) => {
  res.render("user.nunjucks", { user: req.user });
});

app.get("/login", (req, res) => {
  res.render("login.nunjucks");
});

app.use("/api", require("./api"));

app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    const [field, error] = err.details.entries().next().value;
    return res.status(406).json({ message: error.message, field });
  }
  let mongoCode;
  if (err.code > 550) {
    mongoCode = err.code;
    err.code = 500;
  }

  if (err.code === 401) {
    return res.redirect("/login");
  }

  res
    .status(err.code || 400)
    .json({ message: err.message, ...(mongoCode ? { mongoCode } : {}) });
});

app.listen(PORT, () => {
  console.log(
    `Web app start http://localhost:${PORT}. ENV: ${process.env.NODE_ENV}`
  );
});
