const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");

app.use(cors());

app.use(express.json());
dotenv.config();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

mongoose
  .connect(
    process.env.NODE_ENV === "production"
      ? process.env.DATABASE
      : "mongodb://0.0.0.0:27017/blog-acmahaja-com"
  )
  .then(() => {
    console.log(`🌿[Database]: Connected to database`);
  })
  .catch((error) => {
    console.log(`🖥️[Server]: Failed to connect to database`);
    console.log(error.message);
  });

const port = process.env.PORT || 3001;

app.get("/api", (req, res) => {
  res.json({ message: "🖥️[server]: Hello from MernTemplate server!" });
});

app.get("/", (req, res) => {
  res.send("🖥️ Hello From MernTemplate Server");
});

app.listen(port, () => {
  console.log(`🖥️ [Server]: Listening on ${port}`);
});
