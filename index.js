const express = require("express");
const { connection } = require("./db");
const { employeeRouter } = require("./Routes/employee.routes");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/employee", employeeRouter);

app.get("/", async (req, res) => {
  try {
    res.send(
      `<h1 style="text-align: center; font-weight: 500">Welcome to Employee Dashboard.</h1>`
    );
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.listen(port, async () => {
  try {
    await connection;
    console.log(`DB Connected.`);
    console.log(`Server running at port ${port}.`);
  } catch (error) {
    console.log(error.message);
  }
});
