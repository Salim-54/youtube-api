import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import session from "express-session";
import passport from "passport";

config();
import "./database";
import "dotenv/config";
import "./strategies/google";

import AppError from "./utils/appError";
import express from "express";

import authRoutes from "./routes/auth.route";
import googleRoutes from "./routes/google.routes";
import subscribeRoutes from "./routes/subscribe.routes";

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

server.use("/api/auth", googleRoutes);

// server.use('/api/v1/prescriptions', prescriptionsRoutes);
// server.use('/api/v1/medicines', medicinesRoutes);
server.use("/auth", authRoutes);
server.use("/subscribe", subscribeRoutes);

// server.use('/api/v1/transaction', transactionsRoutes);
// server.use('/api/v1/callback', opayUrl);

server.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

server.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

export default server;