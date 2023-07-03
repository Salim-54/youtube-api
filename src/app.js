import cors from "cors";
import { config } from "dotenv";
import { Router } from "express";

import session from "express-session";
const router = Router();

import express from "express";
import passport from "passport";

import {
  Profile,
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";

import morgan from "morgan";
import "./database";
import "dotenv/config";

import AppError from "./utils/appError";

import authRoutes from "./routes/auth.route";
import subscribeRoutes from "./routes/subscribe.routes";
import googleRoutes from "./routes/google.routes";
import { subscribe } from "./controllers/subscribe.controller";

config();

const server = express();

server.use(cors());
server.use(morgan("dev"));

server.get("/", (req, res) => {
    res
      .status(200)
      .json({ success: true, message: "You successfully on youtube's APIs" });
});

server.use(express.json());

server.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

server.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

server.use(passport.initialize());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

let access_token = "";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      scope: [
        "email",
        "profile",
        "https://www.googleapis.com/auth/youtube",
        "https://www.googleapis.com/auth/youtube.force-ssl",
      ],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(profile);
      done(null, { username: profile.displayName });
    }
  )
);

server.use("/api/auth", googleRoutes);

// server.use('/api/v1/prescriptions', prescriptionsRoutes);
// server.use('/api/v1/medicines', medicinesRoutes);
server.use("/auth", authRoutes);
server.use("/subscribe", subscribeRoutes);

// server.use('/api/v1/transaction', transactionsRoutes);
// server.use('/api/v1/callback', opayUrl);

server.get("/subscribe", subscribe);

server.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

server.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});




export default server;