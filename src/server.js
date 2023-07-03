import { config } from "dotenv";
import express from "express";
import "./database";
import passport from "passport";
import session from "express-session";

import app from "./app";

config();

const server = express();

const port = process.env.PORT || 3000;

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// let access_token = "";

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_REDIRECT_URL,
//       scope: [
//         "email",
//         "profile",
//         "https://www.googleapis.com/auth/youtube",
//         "https://www.googleapis.com/auth/youtube.force-ssl",
//       ],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       console.log(accessToken);
//       console.log(profile);
//       done(null, { username: profile.displayName });
//     }
//   )
// );

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
