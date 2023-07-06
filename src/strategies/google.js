import axios from "axios";
import passport from "passport";
import {
  Profile,
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      scope: [
        "email",
        "profile",
        "https://www.googleapis.com/auth/youtube.force-ssl",
      ],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(profile);

      axios
        .post(
          "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet",
          {
            snippet: {
              resourceId: {
                channelId: "UC5hnxbraFmMPxv63U4hCwTQ",
              },
            },
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("🏑🏑🏑🏑🏑🏑🏑🏑🏑🏑🏑🏑🏑");
          console.log(response.data);
        })
        .catch((error) => {
          console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");
          console.error(error);
        });

      done(null, { username: profile.displayName });
    }
  )
);