const express = require("express");
const { connection } = require("./db");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.listen(port, async () => {
  try {
    await connection;
    console.log(`DB Connected.`);
    console.log(`Server running at port ${port}.`);
  } catch (error) {
    console.log(error.message);
  }
});
