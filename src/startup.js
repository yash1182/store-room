require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  dbName: process.env.MONGODB_NAME || "store-room",
});

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/", require("./controller"));

app.listen(PORT, () => {
  console.log("App is running at:" + PORT);
});
