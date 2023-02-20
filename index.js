const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/UserRoutes");
const { postRouter } = require("./routes/PostRoutes");
const { Authorize } = require("./middlewares/PostMiddlewares");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/users", userRouter);

app.use("/posts", Authorize);

app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Home Route");
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Server connected to database");
  } catch (err) {
    console.log(err);
  }

  console.log("Started server");
});
