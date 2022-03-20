const express = require("express");
const cors = require("cors");
const RateLimitter = require("./middleware/rateLimiting");

const app = express();
app.use(cors());

app.use(express.json());

// gia na boro na stelno apo to react edoles isos dne xriazome me afto na kano install to cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

// to have simple route to know the app is upp ard runnins
app.get("/healthcheck", (req, res) => {
  return res.send("app is running");
});

const redis_demo_router = express.Router();

// a dummy url end point to try my app
// i allow 10 requests per 20 seconds
redis_demo_router.get(
  "/redis_demo",
  RateLimitter({ secondsWindow: 10, allowedHits: 20 }),
  (req, res) => {
    return res.json({ response: "Ok" });
  }
);

app.use(redis_demo_router);

module.exports = app;
